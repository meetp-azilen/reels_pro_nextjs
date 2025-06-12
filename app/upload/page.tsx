"use client";

import VideoUploadForm from "../components/VideoUploadForm";

export default function VideoUploadPage() {
  return (
    // RootLayout provides the main container. This div constrains the
    // form's width and centers it on the page.
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
      <VideoUploadForm />
    </div>
  );
}