import express from "express";
import { verifyToken } from "./users.js";
import { MyProjectModel } from "../models/MyProject.js"; // Updated import
import { userModel } from "../models/Users.js";
import mongoose from "mongoose";

const router = express.Router();

// Handle the GET route to return all projects
router.get("/", async (req, res) => {
    try {
        const response = await MyProjectModel.find({});
        res.status(200).json(response);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Handle the POST route to create a new project
router.post("/", verifyToken, async (req, res) => {
    const project = new MyProjectModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        skills: req.body.skills, // Updated variable
        description: req.body.description, // Updated variable
        estimatedDuration: req.body.estimatedDuration, // Updated variable
        userOwner: req.body.userOwner,
        videoLink: req.body.videoLink,
    });
    try {
        const response = await project.save();
        res.status(201).json({
            createdProject: {
                name: response.name,
                skills: response.skills, // Updated variable
                description: response.description, // Updated variable
                estimatedDuration: response.estimatedDuration, // Updated variable
                _id: response._id,
                videoLink:req.body.videoLink,
            },
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

// Get a project by ID
router.get("/:projectID", async (req, res) => {
    try {
        const result = await MyProjectModel.findById(req.params.projectID); // Updated model
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Handle the PUT route to save a project to a user's list
router.put("/", async (req, res) => {
    const project = await MyProjectModel.findById(req.body.projectID); // Updated model
    const user = await userModel.findById(req.body.userID);
    try {
        user.savedProjects.push(project); // Updated variable
        await user.save();
        res.json({ savedProjects: user.savedProjects }); // Updated variable
    } catch (e) {
        res.status(500).json(e);
    }
});

// Get saved projects by user ID
router.get("/savedProjects/ids/:userID", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userID);
        res.status(201).json({ savedProjects: user.savedProjects }); // Updated variable
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get saved projects 
router.get("/savedProjects/:userID", async (req, res) => {
    try {
        const user = await userModel.findById(req.params.userID);
        const savedProjects = await MyProjectModel.find({
            _id: { $in: user.savedProjects }, // Updated variable
        });
        res.status(201).json({ savedProjects });
    } catch (err) {
        res.json(err);
    }
});


  


  

export { router as projectRouter }; 
