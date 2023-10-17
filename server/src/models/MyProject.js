import mongoose from "mongoose";

const MyProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    skills: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true,
    },
 
    estimatedDuration: {
        type: Number,
        required: true,
    },
    userOwner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },

    videoLink:{
        type: String,
        required:true,
    }
});

export const MyProjectModel = mongoose.model("MyProjects", MyProjectSchema);
