const Formation = require("../models/formationModel"); // Assuming your model file is in the same directory

exports.createFormation = async (req, res) => {
  try {
    const formation = await Formation.create(req.body);
    res.status(201).json({ status: "success", data: formation });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};



const PorteurProjet = require("../models/membreTacirModel"); // Assuming you have a model for Porteur Projet

exports.addParticipantToFormation = async (req, res) => {
  const { id } = req.params;
  const { fullName, email } = req.body;

  try {
    // Find the formation by its ID
    const formation = await Formation.findById(id);
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Add the participant as an object to the participants array
    formation.participants.push({ Name: fullName, email });

    // Save the updated formation document
    await formation.save();

    res.status(200).json({ status: "success", data: formation });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to add participant to the formation",
    });
  }
};

exports.addBeneficiaire = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, numTel, motivation, adressePostale } = req.body;

  try {
    // Validate request body
    if (
      !nom ||
      !prenom ||
      !email ||
      !numTel ||
      !motivation ||
      !adressePostale
    ) {
      return res.status(400).json({
        status: "fail",
        message: "All fields are required",
      });
    }

    // Find the formation by its ID
    const formation = await Formation.findById(id);
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Check if email already exists in beneficiaire array
    const beneficiaireExists = formation.beneficiaire.some(
      (b) => b.email === email
    );
    if (beneficiaireExists) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists in beneficiaire",
      });
    }

    // Add the beneficiaire to the beneficiaire array
    formation.beneficiaire.push({
      nom,
      prenom,
      email,
      numTel,
      motivation,
      adressePostale,
    });

    // Save the updated formation document
    const updatedFormation = await formation.save();

    res.status(200).json({ status: "success", data: updatedFormation });
  } catch (error) {
    console.error("Error:", error.message);

    if (error.name === "ValidationError") {
      res.status(400).json({
        status: "error",
        message: "Validation error: " + error.message,
      });
    } else if (error.name === "MongoError" && error.code === 11000) {
      res.status(400).json({
        status: "error",
        message: "Duplicate field error: " + JSON.stringify(error.keyValue),
      });
    } else {
      res.status(500).json({
        status: "error",
        message: "Failed to add beneficiaire to the formation",
      });
    }
  }
};
exports.getBeneficiairesByFormation = async (req, res) => {
  const { id } = req.params;

  try {
    // Find formation by ID and populate the beneficiaries
    const formation = await Formation.findById(id).select("beneficiaire");

    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Send beneficiaries data
    res.status(200).json({ status: "success", data: formation.beneficiaire });
  } catch (error) {
    console.error("Error fetching beneficiaries:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch beneficiaries" });
  }
};
// Get all formations
exports.getAllFormations = async (req, res) => {
  try {
    const { region } = req.query; // Extract region from query parameters

    // Construct filter object
    let filter = {};
    if (region) {
      filter.region = region; // Filter by region if provided
    }

    // Fetch formations from the database based on the filter
    let formations = await Formation.find(filter);

    // Check the date of each formation and update the status
    formations.forEach(async (formation) => {
      if (new Date(formation.Date) < new Date()) {
        formation.status = "Past";
        await formation.save(); // Save the updated formation to the database
      }
    });

    // Re-fetch formations to include the updated ones
    formations = await Formation.find(filter);
    res.status(200).json({ status: "success", data: formations });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};


// Get a single formation by ID
exports.getFormationById = async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }
    res.status(200).json({ status: "success", data: formation });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// Update a formation
exports.updateFormation = async (req, res) => {
  try {
    const formation = await Formation.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }
    res.status(200).json({ status: "success", data: formation });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};

// Delete a formation
exports.deleteFormation = async (req, res) => {
  try {
    await Formation.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: "success", data: null });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

exports.getParticipantsByFormationId = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the formation by its ID
    const formation = await Formation.findById(id).populate("participants");

    if (!formation) {
      return res
        .status(404)
        .json({ status: "fail", message: "Formation not found" });
    }

    // Return the participants of the formation
    res.status(200).json({ status: "success", data: formation.participants });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch participants for the formation",
    });
  }
};
exports.getFormationsWithAcceptedBeneficiaires = async (req, res) => {
  try {
    const formations = await Formation.find({
      "beneficiaire.status": "accepted",
    });

    res.status(200).json({ status: "success", data: formations });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Failed to fetch formations with accepted beneficiaries" });
  }
};