const Project = require("../models/projetTacirModel");
const EvaluateProject = require("../models/EvaluateProjectModel");
const Membres = require("../models/membreTacirModel");

// Controller function to create a new project
const createProject = async (req, res) => {
  try {
    const { Dateprojet, titre, description, region, type, comments, members } =
      req.body;

    // Get the ID of the authenticated user from the request
    const ownerId = req.auth.membreId;

    // Check if the user already has a project
    const existingProject = await Project.findOne({ owner: ownerId });
    if (existingProject) {
      return res.status(400).json({ message: "You already have a project" });
    }

    // Create a new project instance with the owner set to the ID of the authenticated user
    const newProject = new Project({
      owner: ownerId,
      Dateprojet,
      titre,
      description,
      region,
      type,
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

// Controller to add an evaluation for a project
const addEvaluation = async (req, res) => {
  try {
    const { projectName: projectNameField, comment } = req.body;
    const evaluatorId = req.auth.membreId;

    // Find the project by name to get its ID
    const project = await Project.findOne({ titre: projectNameField });
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const owner = await Membres.findOne();
    if (!owner) {
      return res.status(404).json({ error: "owner not found" });
    }
    const evaluation = new EvaluateProject({
      projectName: projectNameField,
      projectId: project._id,
      evaluatorId,
      comment,
      owner,
    });

    await evaluation.save();

    res.status(201).json({ message: "Evaluation added successfully" });
  } catch (error) {
    console.error("Error adding evaluation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getEvaluationById = async (req, res) => {
  try {
    const { evaluationId } = req.params;

    // Find the evaluation by ID
    const evaluation = await EvaluateProject.findOne({ _id: evaluationId })
      .populate("projectId")
      .populate("evaluatorId")
      .populate("owner")
      .exec();

    if (!evaluation) {
      return res.status(404).json({ error: "Evaluation not found" });
    }

    res.status(200).json(evaluation);
  } catch (error) {
    console.error("Error getting evaluation:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getAllEvaluations = async (req, res) => {
  try {
    // Query the database to fetch all evaluations
    const evaluations = await EvaluateProject.find()
      .populate("owner")
      .populate("projectId")

      .populate("evaluatorId");

    res.status(200).json(evaluations); // Return the evaluations in the response
  } catch (error) {
    console.error("Error fetching evaluations:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProjectByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const project = await Project.findOne({ owner: userId }).populate("owner");

    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error fetching project:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInovProjects = async (req, res) => {
  try {
    let query = { type: "INOV" };

    // Check if region query parameter is provided
    if (req.query.region) {
      query.region = req.query.region;
    }

    const inovProjects = await Project.find(query).populate("owner");
    res.status(200).json(inovProjects);
  } catch (error) {
    console.error("Error fetching INOV projects:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCreaProjects = async (req, res) => {
  try {
    let query = { type: "CREA" };

    // Check if region query parameter is provided
    if (req.query.region) {
      query.region = req.query.region;
    }

    const creaProjects = await Project.find(query).populate("owner");
    res.status(200).json(creaProjects);
  } catch (error) {
    console.error("Error fetching CREA projects:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  createProject,
  getAllProjects,
  addEvaluation,
  getEvaluationById,
  getAllEvaluations,
  getProjectByUserId,
  getInovProjects,
  getCreaProjects,
};
