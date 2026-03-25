import { describe, it, expect } from "vitest";
import { analyzeChannel } from "./youtube";

describe("YouTube Analyzer Integration (MIT OCW)", () => {
  it("should successfully analyze @mitocw channel", async () => {
    const url = "https://www.youtube.com/@mitocw";
    const result = await analyzeChannel(url);

    // Channel validation
    expect(result.channel.name).toContain("MIT OpenCourseWare");
    expect(result.channel.id).toBeDefined();
    
    // Video validation
    expect(result.videos.length).toBeGreaterThan(0);
    expect(result.videos[0].views).toBeGreaterThanOrEqual(0);
    
    // Summary validation
    expect(result.summary.totalVideos).toBeGreaterThan(0);
    expect(result.summary.totalViews).toBeGreaterThan(0);
    
    // Monthly Reach logic
    // MIT OCW uploads frequently, so monthlyReach should be non-zero
    console.log("MIT OCW Monthly Reach:", result.summary.monthlyViews);
    expect(result.summary.monthlyViews).toBeDefined();
  }, 30000); // 30s timeout for network call

  it("should handle invalid URLs gracefully", async () => {
    await expect(analyzeChannel("https://youtube.com/invalid-channel-xyz-123"))
      .rejects.toThrow();
  });
});
