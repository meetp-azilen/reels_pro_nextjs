"use client";

import VideoDetails from "@/app/components/VideoDetails";
import { apiClient } from "@/lib/api-client";
import { IVideo } from "@/models/video.model";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Parameters {
  [key: string]: string;
  id: string;
}

export default function VideoUploadPage() {
  const params = useParams<Parameters>();
  const videoId = params.id;

  const [video, setVideo] = useState<IVideo>();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        console.log("Fetching video with ID:", videoId);
        const data = await apiClient.getVideo(videoId);
        setVideo(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    console.log("Video ID from params:", videoId);
    fetchVideos();
  }, []);

  return (
    // RootLayout provides the main container. This div constrains the
    // form's width and centers it on the page.
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Video Details</h1>
      <p>Product ID: {videoId}</p>
      {video && <VideoDetails video={video} />}
    </div>
  );
}
