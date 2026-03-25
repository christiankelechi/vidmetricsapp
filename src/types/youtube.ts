export interface YouTubeVideo {
  id: string;
  title: string;
  thumbnail: string;
  views: number;
  uploadedAt: string; // Relative like "2 days ago" or ISO string
  duration: number; // in seconds
  url: string;
  isRecent?: boolean;
}

export interface ChannelInfo {
  id: string;
  name: string;
  icon: string;
  subscribers: string;
  url: string;
}

export interface AnalysisResult {
  channel: ChannelInfo;
  videos: YouTubeVideo[];
  summary: {
    totalVideos: number;
    avgViews: number;
    bestVideo: YouTubeVideo | null;
    totalViews: number;
    monthlyViews: number;
  };
}
