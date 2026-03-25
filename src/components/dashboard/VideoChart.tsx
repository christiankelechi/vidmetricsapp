"use client";

import { useState, useEffect } from "react";
import { AnalysisResult } from "@/types/youtube";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import { formatCompactNumber } from "@/lib/utils";

export function VideoChart({ data }: { data: AnalysisResult }) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Take top 10 videos by views for the chart
  const chartData = [...data.videos]
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  if (!mounted) return <div className="h-[400px] w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 animate-pulse" />;

  return (
    <div className="h-[400px] w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
      <h3 className="text-lg font-semibold mb-6 text-slate-200">Top 10 Videos by View Count</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
          <XAxis 
            dataKey="title" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            interval={0}
            angle={-25}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={formatCompactNumber}
          />
          <Tooltip 
            cursor={{ fill: '#ffffff05' }}
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: '1px solid #ffffff10',
              borderRadius: '12px',
              color: '#f8fafc'
            }}
            itemStyle={{ color: '#ef4444' }}
            labelStyle={{ marginBottom: '4px', fontWeight: '600' }}
            formatter={(value: any) => [formatCompactNumber(Number(value)), "Views"]}
          />
          <Bar 
            dataKey="views" 
            radius={[6, 6, 0, 0]}
            barSize={40}
          >
            {chartData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={index === 0 ? "#ef4444" : "#ef444480"} 
                className="hover:fill-red-500 transition-colors"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
