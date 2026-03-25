import YouTube from "youtube-sr";
import { AnalysisResult, YouTubeVideo } from "@/types/youtube";

export async function analyzeChannel(channelUrl: string): Promise<AnalysisResult> {
  try {
    // 1. Resolve channel ID from URL or Handle
    // searchOne("channel") is the most robust way to find a channel's unique ID
    const channel = await YouTube.searchOne(channelUrl, "channel");

    if (!channel || !channel.id) {
      throw new Error("Could not find a YouTube channel matching that URL.");
    }

    // 2. Fetch recent videos via specialized search
    // We use the channel's URL or handle as a search query to get videos WITH view counts.
    // YouTube's search is more reliable for real-time stats than the playlist API.
    const videos = await YouTube.search(channelUrl, {
      type: "video",
      limit: 50
    });

    if (!videos || videos.length === 0) {
      throw new Error("Could not retrieve videos for this channel.");
    }

    // Filter results to ensure they actually belong to the resolved channel
    const filteredVideos = videos.filter(v => v.channel?.id === channel.id);

    // If filtering is too aggressive (e.g. ID mismatch), fall back to the search results
    const finalVideos = filteredVideos.length > 0 ? filteredVideos : videos;

    // 3. Stats & "This Month" Logic
    const now = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(now.getDate() - 30);

    const mappedVideos: YouTubeVideo[] = finalVideos.map((v) => {
      // YouTube search results often return views as strings (e.g. "12656") or formatted text
      // We force cast to String then parse digits to ensure accurate math
      const rawViews = String(v.views || "0").replace(/[^0-9]/g, "");
      const viewCount = parseInt(rawViews) || 0;
      
      // Rough date parsing for youtube-sr's "uploadedAt" strings (e.g. "2 weeks ago")
      // In a production app, we'd use a more robust parser or the formal date.
      const isRecent = v.uploadedAt?.toLowerCase().includes("day") ||
        v.uploadedAt?.toLowerCase().includes("week") ||
        v.uploadedAt?.toLowerCase().includes("hour");

      return {
        id: v.id || "",
        title: v.title || "Unknown Title",
        thumbnail: v.thumbnail?.url || "",
        views: viewCount,
        uploadedAt: v.uploadedAt || "Unknown date",
        duration: v.duration || 0,
        url: `${process.env.NEXT_PUBLIC_YOUTUBE_URL_WATCH || "https://www.youtube.com/watch?v="}${v.id}`,
        isRecent: isRecent, // Added for "This Month" identification
      };
    });

    const totalViews = mappedVideos.reduce((acc, v) => acc + v.views, 0);
    const monthlyViews = mappedVideos
      .filter(v => v.isRecent)
      .reduce((acc, v) => acc + v.views, 0);

    const avgViews = mappedVideos.length > 0 ? totalViews / mappedVideos.length : 0;
    const bestVideo = mappedVideos.length > 0
      ? [...mappedVideos].sort((a, b) => b.views - a.views)[0]
      : null;

    return {
      channel: {
        id: channel.id || "",
        name: channel.name || "Unknown Channel",
        icon: channel.icon?.url || "",
        subscribers: channel.subscribers || "0",
        url: channelUrl,
      },
      videos: mappedVideos,
      summary: {
        totalVideos: mappedVideos.length,
        avgViews: Math.round(avgViews),
        bestVideo,
        totalViews,
        monthlyViews, // New metric for "This Month"
      },
    };
  } catch (error) {
    console.error("Error analyzing channel:", error);
    throw error;
  }
}
