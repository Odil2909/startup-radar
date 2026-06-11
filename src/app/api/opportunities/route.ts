import { NextResponse } from "next/server";
import {
  fetchTopStories,
  mapStoryToOpportunity,
} from "@/services/hackernews.service";

export async function GET() {
  try {
    const stories = await fetchTopStories(60);
    const opportunities = stories.map(mapStoryToOpportunity);
    return NextResponse.json({ opportunities });
  } catch (err) {
    console.error("API /opportunities error", err);
    return NextResponse.json({ opportunities: [] }, { status: 500 });
  }
}
