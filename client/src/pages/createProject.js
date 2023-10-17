import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const Create = () => {
  const [cookies, _] = useCookies(["access_token"]);
  const userID = useGetUserID();
  const [project, setProject] = useState({
    name: "",
    description: "",
    skills: [],
    videoLink: "", // Added videoLink field
    estimatedDuration: 1,
    userOwner: userID,
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  };

  const handleSkillChange = (event) => {
    const { value } = event.target;
    const skills = [...project.skills];
    if (skills.includes(value)) {
      // Remove the skill if it's already selected
      skills.splice(skills.indexOf(value), 1);
    } else {
      skills.push(value);
    }
    setProject({ ...project, skills });
  };

  const handleAddSkill = () => {
    const skills = [...project.skills, ""];
    setProject({ ...project, skills });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const projectData = { ...project, name: String(project.name) };
    try {
      if (projectData.estimatedDuration <=0) {
        alert("Duration must be greater than 0.");
        return;
      }

      await axios.post("http://localhost:3001/projects", projectData, {
        headers: { authorization: cookies.access_token },
      });
      alert("Project created!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };


  // Define options for the skill checkboxes
  const skillOptions = [
    "Python",
    "Java",
    "C++",
    "JavaScript",
    "HTML,CSS",
    "Frontend Development (Angular/React/Vue)",
    "Backend developement (Django/Node/Express)",
    "Database Management (SQL/No SQL)",
    "Cloud Computing (AWS, Azure, Google Cloud)",
    "AI and Machine Learning",
    "Version Control (etc. Git)",
    "API writing and testing",
    "Linux/Unix deployment"
  ];

  // Rest of the component
  return (
    <div className="create-project">
      <h2>Create New Project</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={project.name} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" value={project.description} onChange={handleChange}></textarea>
        </div>

        <div className="form-group">
          <label>Skills</label>
          {skillOptions.map((option) => (
            <label key={option}>
              <input
                type="checkbox"
                name="skills"
                value={option}
                checked={project.skills.includes(option)}
                onChange={handleSkillChange}
              />
              {option}
            </label>
          ))}
        </div>

        <div className="form-group">
          <label htmlFor="videoLink">YouTube Video Link</label>
          <input
            type="text"
            id="videoLink"
            name="videoLink"
            value={project.videoLink}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (hours)</label>
          <input
            type="number"
            id="duration"
            name="estimatedDuration"
            value={project.estimatedDuration}
            onChange={handleChange}
            min="1"
          />
        </div>

        <button type="submit" className="create-button">
          Create Project
        </button>
      </form>
    </div>
  );
};