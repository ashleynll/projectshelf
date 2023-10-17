import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // This loads the environment variables from the .env file into process.env

function VideoComponent() {
  // Use process.env.REACT_APP_YOUTUBE_API_KEY to access your API key
  const apiKey = process.env.REACT_APP_YOUTUBE_API_KEY;

  const [videoInfo, setVideoInfo] = useState(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');

  useEffect(() => {
    // Extract the video ID from the video URL
    const urlRegex = /(?:youtu\.be\/|youtube\.com\/(watch\?v=|embed\/|v\/|user\/\S+|playlist\?list=|)([^#\&\?]*))/;
    const match = videoUrl.match(urlRegex);
    if (match && match[2].length === 11) {
      setVideoId(match[2]);
    } else {
      setVideoId('');
    }
  }, [videoUrl]);

  useEffect(() => {
    async function fetchData() {
      if (videoId) {
        try {
          const response = await fetchVideoInfo(videoId);
          setVideoInfo(response);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchData();
  }, [videoId]);

  async function fetchVideoInfo(videoId) {
    // Use the apiKey variable to access your API key
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`);
    return response.data.items[0];
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter YouTube Video URL"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      {videoInfo && (
        <div>
          <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
            <img
              src={videoInfo.snippet.thumbnails.medium.url}
              alt={videoInfo.snippet.title}
            />
          </a>
          <p>{videoInfo.snippet.title}</p>
        </div>
      )}
    </div>
  );
}

export default VideoComponent;
