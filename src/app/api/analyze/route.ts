import { NextResponse } from "next/server";
import { analyzeIdea } from "@/lib/idea-analyzer";
import {
  fetchTopStories,
  mapStoryToOpportunity,
} from "@/services/hackernews.service";

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();
    if (!idea || typeof idea !== "string")
      return NextResponse.json({ error: "Missing idea" }, { status: 400 });

    const stories = await fetchTopStories(40);
    const context = stories.map(mapStoryToOpportunity);
    const analysis = analyzeIdea(idea, context);
    return NextResponse.json({ analysis });
  } catch (err) {
    console.error("API /analyze error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
