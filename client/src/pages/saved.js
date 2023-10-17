import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const Saved = () => {
  const [savedProjects, setSavedProjects] = useState([]);
  const userID = useGetUserID();
  const [loading, setLoading] = useState(true);

  // Function to extract the video ID from a YouTube URL
  const getVideoIdFromLink = (videoLink) => {
    const url = new URL(videoLink);
    return url.searchParams.get("v");
  };

  useEffect(() => {
    const getSavedProjects = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/projects/savedProjects/${userID}`);
        setSavedProjects(response.data.savedProjects);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getSavedProjects();
  }, [userID]);
  

  return (
    <div>
      <h1>Your Saved Projects</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {savedProjects && savedProjects.length > 0 ? (
            savedProjects.map((project) => (
              <li key={project._id}>
                {savedProjects.hasOwnProperty(project._id) && <h1>ALREADY FAVORITED</h1>}
                <div>
                  <h2 className="project-name">{project.name}</h2>
                </div>
                <div className="description">
                  <p className="skills-description">{project.description}</p>
                </div>
             
                <img src={`https://img.youtube.com/vi/${getVideoIdFromLink(project.videoLink)}/0.jpg`} alt={project.name} />
                <p className="skills-description">Duration: {project.estimatedDuration} hours</p>
              </li>
            ))
          ) : (
            <p>Nothing Saved Yet</p>
          )}
        </ul>
      )}
    </div>
  );
};