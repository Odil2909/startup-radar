import { NextResponse } from "next/server";
import { fetchTopNews } from "@/services/hackernews.service";

export async function GET() {
  try {
    const data = await fetchTopNews(20);
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Failed to fetch Hacker News stories" },
      { status: 500 },
    );
  }
}
