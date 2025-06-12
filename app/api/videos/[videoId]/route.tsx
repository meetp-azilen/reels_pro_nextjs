import { dbConnect } from "@/lib/db";
import Video from "@/models/video.model";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"; // Import mongoose to validate ObjectId

export async function GET(
  request: NextRequest,
  { params }: { params: { videoId: string } }
) {
  try {
    await dbConnect();
    const videoId = params.videoId;

    // Optional: Validate if videoId is a valid MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return NextResponse.json({ error: "Invalid video ID format" }, { status: 400 });
    }

    const video = await Video.findById(videoId).lean();

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    return NextResponse.json(video, { status: 200 });

  } catch (error) {
    console.error("Error fetching video by ID:", error);
    return NextResponse.json({ error: "Failed to fetch video" }, { status: 500 });
  }
}