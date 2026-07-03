import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://www.youtube.com/feeds/videos.xml?channel_id=UCLouv7WBcq6ahZCnpDUzfOA",
      { next: { revalidate: 3600 } } // cache for 1 hour
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch YouTube RSS feed");
    }
    
    const xmlText = await response.text();

    const entries: any[] = [];
    // Match each <entry> block
    const entryMatches = xmlText.match(/<entry>[\s\S]*?<\/entry>/g) || [];

    for (const entryXml of entryMatches) {
      const videoId = entryXml.match(/<yt:videoId>([^<]*)<\/yt:videoId>/)?.[1] || "";
      const title = entryXml.match(/<title>([^<]*)<\/title>/)?.[1] || "";
      const description = entryXml.match(/<media:description>([^<]*)<\/media:description>/)?.[1] || "";
      const published = entryXml.match(/<published>([^<]*)<\/published>/)?.[1] || "";

      if (!videoId) continue;

      const date = new Date(published).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      // Simple tag extractor from description or default tags
      const tags = ["Solana", "Web3", "Blockchain"];
      if (title.toLowerCase().includes("casper")) tags.push("Casper");
      if (title.toLowerCase().includes("uniswap")) tags.push("Uniswap");
      if (title.toLowerCase().includes("opsrover")) tags.push("OpsRover");
      if (title.toLowerCase().includes("gaming") || title.toLowerCase().includes("x402")) tags.push("Gaming");

      entries.push({
        id: `yt-${videoId}`,
        platform: "youtube",
        title: title.replace(/&amp;/g, "&"),
        description: description ? description.split("\n")[0].slice(0, 160) + "..." : "Walkthrough and demonstration video.",
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        date,
        duration: "Video",
        views: "Watch on YouTube",
        likes: "Active",
        tags: Array.from(new Set(tags)).slice(0, 4)
      });
    }

    return NextResponse.json(entries);
  } catch (error) {
    console.error("Error fetching YouTube feed:", error);
    return NextResponse.json([]);
  }
}
