import { NextRequest, NextResponse } from "next/server";
import { analyzeChannel } from "@/lib/youtube";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const data = await analyzeChannel(url);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to analyze channel" },
      { status: 500 }
    );
  }
}
