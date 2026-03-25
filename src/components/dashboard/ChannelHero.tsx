import { AnalysisResult } from "@/types/youtube";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink, Users, Video, Eye } from "lucide-react";

export function ChannelHero({ data }: { data: AnalysisResult }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-8 md:p-12 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        <div className="relative">
          <div className="absolute -inset-2 bg-red-500/20 blur-2xl rounded-full" />
          <img 
            src={data.channel.icon} 
            alt={data.channel.name}
            className="relative h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-white/10 object-cover"
          />
        </div>
        
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">{data.channel.name}</h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-400">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-red-500" />
              <span>{data.channel.subscribers} Subscribers</span>
            </div>
            <div className="flex items-center gap-2">
              <Video className="h-4 w-4 text-red-500" />
              <span>{data.summary.totalVideos} Recent Videos</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-red-500" />
              <span>{(data.summary.totalViews / 1000000).toFixed(1)}M Views (Recent)</span>
            </div>
          </div>
        </div>

        <a 
          href={data.channel.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-white/10 bg-transparent hover:bg-white/5 h-10 px-4 py-2 gap-2"
        >
          View Channel <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
