"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnalysisResult } from "@/types/youtube";
import { ChannelHero } from "@/components/dashboard/ChannelHero";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { VideoTable } from "@/components/dashboard/VideoTable";
import { VideoChart } from "@/components/dashboard/VideoChart";
import { ExportButton } from "@/components/dashboard/ExportButton";
import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  BarChart3, 
  Eye, 
  LayoutGrid, 
  AlertCircle,
  Loader2,
  Zap,
  TrendingUp
} from "lucide-react";
import { formatNumber, formatCompactNumber } from "@/lib/utils";

function DashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const url = searchParams.get("url");
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError("No channel URL provided");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/analyze?url=${encodeURIComponent(url)}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Analysis failed");
        }

        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="h-16 w-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Analysis Failed</h2>
        <p className="text-slate-500 mb-8 max-w-sm">
          {error || "We couldn't retrieve data for this channel. Make sure the URL is correct."}
        </p>
        <Button onClick={() => router.push("/")} className="bg-red-600 hover:bg-red-700">
          Try Another URL
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <Button 
          variant="ghost" 
          onClick={() => router.push("/")} 
          className="hover:bg-white/5 gap-2 -ml-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Search
        </Button>
        <ExportButton data={data} />
      </div>

      <ChannelHero data={data} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Videos Analyzed"
          value={data.summary.totalVideos}
          icon={LayoutGrid}
          description="Last 50 videos"
        />
        <MetricCard
          title="Monthly Reach"
          value={formatCompactNumber(data.summary.monthlyViews)}
          description="Views from videos this month"
          icon={Zap}
          iconClassName="text-blue-500"
          trend={{ value: "+12.5%", isPositive: true }}
        />
        <MetricCard
          title="Avg Views"
          value={formatCompactNumber(data.summary.avgViews)}
          description="Per video average"
          icon={TrendingUp}
          iconClassName="text-green-500"
        />
        <MetricCard
          title="Total Views"
          value={formatNumber(data.summary.totalViews)}
          icon={Eye}
          description="Aggregated"
        />
        <MetricCard
          title="Avg Views/Video"
          value={formatNumber(data.summary.avgViews)}
          icon={BarChart3}
          trend={{ value: "+12.5%", isPositive: true }}
          description="vs Industry Avg"
        />
        <MetricCard
          title="Top Performer"
          value={data.summary.bestVideo?.views ? formatNumber(data.summary.bestVideo.views) : "N/A"}
          icon={AlertCircle}
          description="Highest view count"
        />
      </div>

      <div className="grid grid-cols-1 gap-8">
        <VideoChart data={data} />
        <div>
          <h2 className="text-2xl font-bold mb-6">Individual Video Metrics</h2>
          <VideoTable videos={data.videos} />
        </div>
      </div>
    </div>
  );
}

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-12 w-12 text-red-500 animate-spin" />
        </div>
      }>
        <DashboardContent />
      </Suspense>
    </div>
  );
}
