import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  iconClassName?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
}

export function MetricCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  iconClassName = "text-red-500",
  trend 
}: MetricCardProps) {
  return (
    <Card className="bg-white/5 border-white/10 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Icon size={48} />
      </div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <Icon className={`h-4 w-4 ${iconClassName}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-slate-500 mt-1">
          {trend && (
            <span className={trend.isPositive ? "text-green-500" : "text-red-500"}>
              {trend.value}
            </span>
          )}{" "}
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
