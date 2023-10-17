import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import VideoThumbnail from '../components/VideoThumnail';
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [projects, setProjects] = useState([]);
  const [sortOption, setSortOption] = useState("timeAdded");
  const [cookies] = useCookies(["access_token"]);
  const [savedProjects, setSavedProjects] = useState([]);
  const userID = useGetUserID();
  const navigate = useNavigate();

  // Define the fetchData and fetchSavedProjects functions outside of the useEffect
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/projects");
      setProjects(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSavedProjects = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/projects/savedProjects/ids/${userID}`
      );
      setSavedProjects(response.data.savedProjects);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Call the fetchData and fetchSavedProjects functions here
    fetchData();
    fetchSavedProjects();
  }, []);



  const saveProject = async (projectID) => {
    try {
      const response = await axios.put("http://localhost:3001/projects", {
        projectID,
        userID,
      });
      setSavedProjects(response.data.savedProjects);
    } catch (e) {
      console.log(e);
    }
  };

  const isProjectSaved = (id) => savedProjects.includes(id);

  const sortedProjects = [...projects].sort((a, b) => {
    switch (sortOption) {
      case "duration":
        return a.estimatedDuration - b.estimatedDuration;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  if (sortOption === "timeAdded") {
    sortedProjects.reverse();
  }

  return (
    <div>
      <h1>Projects</h1>
      <div className="sort-options">
        <button className="sort-button" onClick={() => setSortOption("timeAdded")}>Sort by Time Added</button>
        <button className="sort-button" onClick={() => setSortOption("duration")}>Sort by Duration</button>
        <button className="sort-button" onClick={() => setSortOption("name")}>Sort by Name</button>
      </div>
      <ul>
        {sortedProjects.map((project) => (
          <li key={project._id}>
            <div>
              <h2 className="project-name">{project.name}</h2>
              <button className="favorite-button"
                onClick={() => saveProject(project._id)}
                disabled={isProjectSaved(project._id)}
              >
                {isProjectSaved(project._id) ? "Saved" : "Save"}
              </button>
             
              <p className="skills-description">Duration: {project.estimatedDuration} hours</p>
              <p className="skills-description">Skills: {project.skills.join(', ')}</p>
            </div>
            <div className="image-container">
              <VideoThumbnail videoLink={project.videoLink} />
            </div>
            <div className="description">
              <p className="skills-description">{project.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};