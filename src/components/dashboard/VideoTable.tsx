import { YouTubeVideo } from "@/types/youtube";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { formatCompactNumber } from "@/lib/utils";
import { Flame, TrendingUp, Minus, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function VideoTable({ videos }: { videos: YouTubeVideo[] }) {
  // Sort videos by views descending initially
  const sortedVideos = [...videos].sort((a, b) => b.views - a.views);

  const getTrendIcon = (views: number, avgViews: number) => {
    if (views > avgViews * 1.5) return <Flame className="h-4 w-4 text-red-500" />;
    if (views > avgViews) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (views < avgViews * 0.5) return <TrendingDown className="h-4 w-4 text-slate-500" />;
    return <Minus className="h-4 w-4 text-slate-400" />;
  };

  const avgViews = videos.reduce((acc, v) => acc + v.views, 0) / videos.length;

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
      <Table>
        <TableHeader className="bg-white/5">
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="w-[100px] text-slate-400">Video</TableHead>
            <TableHead className="text-slate-400">Title</TableHead>
            <TableHead className="text-right text-slate-400">Views</TableHead>
            <TableHead className="text-center text-slate-400">Trend</TableHead>
            <TableHead className="text-right text-slate-400">Uploaded</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedVideos.map((video) => (
            <TableRow key={video.id} className="border-white/5 hover:bg-white/5 transition-colors group">
              <TableCell className="w-[100px]">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="rounded-lg object-cover w-full aspect-video border border-white/10"
                />
              </TableCell>
              <TableCell className="font-medium max-w-md">
                <div className="flex flex-col">
                  <a 
                    href={video.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-red-500 transition-colors line-clamp-1"
                  >
                    {video.title}
                  </a>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{video.uploadedAt}</span>
                    {video.isRecent && (
                      <Badge variant="outline" className="text-[10px] h-4 px-1 bg-blue-500/10 text-blue-400 border-blue-500/20">
                        NEW
                      </Badge>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono">
                {formatCompactNumber(video.views)}
              </TableCell>
              <TableCell className="text-center">
                <div className="flex justify-center">
                  {getTrendIcon(video.views, avgViews)}
                </div>
              </TableCell>
              <TableCell className="text-right text-slate-500 text-sm italic">
                {video.uploadedAt}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
