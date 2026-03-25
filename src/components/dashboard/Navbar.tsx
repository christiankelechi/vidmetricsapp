"use client";

import Link from "next/link";
import { BarChart2 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="border-b border-white/10 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-red-600 p-1.5 rounded-lg group-hover:scale-110 transition-transform">
            <BarChart2 className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">VidMetrics</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <Link href="/" className="hover:text-white transition-colors">Analyzer</Link>
          <button className="hover:text-white transition-colors cursor-not-allowed opacity-50">Compare</button>
          <button className="hover:text-white transition-colors cursor-not-allowed opacity-50">Pricing</button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs py-1 px-2 rounded bg-red-500/10 text-red-500 border border-red-500/20 font-mono">MVP v1.0</span>
        </div>
      </div>
    </nav>
  );
}
