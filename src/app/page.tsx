"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    // Navigate to analyze page with URL as query param
    router.push(`/analyze?url=${encodeURIComponent(url)}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-slate-950 text-white selection:bg-red-500/30">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          Next-Gen YouTube Intelligence
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
          Spy on your <span className="text-red-500">competitors.</span><br />
          Ship better content.
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-12">
          Stop guessing. Analyze any YouTube channel in seconds. Get views, engagement trends, and content insights to dominate your niche.
        </p>

        <form 
          onSubmit={handleAnalyze} 
          className="w-full max-w-2xl flex flex-col md:flex-row gap-3 p-2 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
            <Input 
              type="text" 
              placeholder="Paste channel URL (e.g. youtube.com/@mrbeast)" 
              className="w-full h-12 pl-12 bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={loading}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-[0_0_20px_rgba(220,38,38,0.3)] transition-all active:scale-95"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Now"}
          </Button>
        </form>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl text-left">
          <div className="space-y-2">
            <div className="h-1 w-8 bg-red-600 rounded-full" />
            <h3 className="font-semibold">Keyless Fast</h3>
            <p className="text-sm text-slate-500">No official API delays. Real-time insights delivered instantly.</p>
          </div>
          <div className="space-y-2">
            <div className="h-1 w-8 bg-red-600 rounded-full" />
            <h3 className="font-semibold">Deep Metris</h3>
            <p className="text-sm text-slate-500">Visual charts and performance KPIs for every single video.</p>
          </div>
          <div className="space-y-2">
            <div className="h-1 w-8 bg-red-600 rounded-full" />
            <h3 className="font-semibold">Trend Detection</h3>
            <p className="text-sm text-slate-500">Spot which videos are "crushing it" this month with smart indicators.</p>
          </div>
        </div>
      </main>

      <footer className="mt-24 text-slate-600 text-sm lowercase tracking-widest relative z-10">
        &copy; 2026 VidMetrics · Powered by Vibe Coding
      </footer>
    </div>
  );
}
