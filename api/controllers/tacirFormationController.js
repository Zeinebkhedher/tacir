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

    // Find the member in the porteur projet model using their email
    const porteurProjet = await PorteurProjet.findOne({ email });
    if (!porteurProjet) {
      return res
        .status(404)
        .json({ status: "fail", message: "Porteur projet not found" });
    }

    // Add the member's ID to the participants array in the formation model
    formation.participants.push(porteurProjet._id);

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

// Get all formations
exports.getAllFormations = async (req, res) => {
  try {
    // Fetch all formations from the database
    let formations = await Formation.find();

    // Check the date of each formation
    formations.forEach(async (formation) => {
      if (new Date(formation.Date) < new Date()) {
        // Update the status to "Past"
        formation.status = "Past";
        // Save the updated formation to the database
        await formation.save();
      }
    });

    // Send the formations in the response
    formations = await Formation.find(); // Re-fetch formations to include the updated ones
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
