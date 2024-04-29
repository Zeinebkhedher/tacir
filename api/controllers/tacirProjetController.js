const Project = require("../models/projetTacirModel");

// Controller function to create a new project
const createProject = async (req, res) => {
  try {
    const {
      candidats,
      Dateprojet,
      titre,
      description,
      region,
      comments,
      members,
    } = req.body;

    // Create a new project instance
    const newProject = new Project({
      candidats,
      Dateprojet,
      titre,
      description,
      region,
      comments,
      members,
    });

    // Save the project to the database
    const createdProject = await newProject.save();

    res.status(201).json(createdProject); // Return the created project in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProjects = async (req, res) => {
  try {
    // Query the database to fetch all projects
    const projects = await Project.find();

    res.status(200).json(projects); // Return the projects in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createProject, getAllProjects };

