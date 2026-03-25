import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { AnalysisResult } from "@/types/youtube";

export function ExportButton({ data }: { data: AnalysisResult }) {
  const exportToCSV = () => {
    const headers = ["Title", "Views", "Uploaded", "URL"];
    const rows = data.videos.map(v => [
      `"${v.title.replace(/"/g, '""')}"`,
      v.views,
      v.uploadedAt,
      v.url
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(e => e.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${data.channel.name.replace(/\s+/g, '_')}_vidmetrics.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      variant="outline" 
      onClick={exportToCSV}
      className="border-white/10 hover:bg-white/5 gap-2"
    >
      <Download className="h-4 w-4" />
      Export Analysis
    </Button>
  );
}
