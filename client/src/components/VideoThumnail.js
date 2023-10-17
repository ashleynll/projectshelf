import React, { useState } from "react";
import YouTube from "react-youtube";

const VideoThumbnail = ({ videoLink }) => {
  const [videoId, setVideoId] = useState(extractVideoId(videoLink));

  // Function to extract video ID from the YouTube video link
  function extractVideoId(link) {
    const videoIdMatch = link.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?feature=player_embedded&v=|watch\?v=))(.*?)(\?|&|$)/);
    return (videoIdMatch && videoIdMatch[1]) || "";
  }

  return (
    <div>
      {videoId && <YouTube videoId={videoId} opts={{ width: "320", height: "180" }} />}
    </div>
  );
};

export default VideoThumbnail;
