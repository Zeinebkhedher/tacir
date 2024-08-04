const jwt = require("jsonwebtoken");
const Membre = require("../models/membreTacirModel");
const CandidatsVerif = require("../models/candidatMailVerifModel");
const sendEmail = require("../utils/sendEmail");
const DateRange = require("../models/dateRangeModel");
const generatePassword = require("generate-password");
const bcrypt = require("bcrypt");

// Pagination function
function paginatedResults(model, page, limit) {
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  let paginatedResults = {};

  if (endIndex < model.length) {
    paginatedResults.next = {
      page: page + 1,
      limit: limit,
    };
  }

  if (startIndex > 0) {
    paginatedResults.previous = {
      page: page - 1,
      limit: limit,
    };
  }

  paginatedResults.results = model.slice(startIndex, endIndex);
  return paginatedResults;
}

// Fetch all members (candidates are now part of the members)
const getAllCandidats = async (req, res) => {
  try {
    const candidats = await Membre.find({ role: "candidat" });
    res.status(200).json(candidats);
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCandidat = await Membre.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCandidat) {
      return res.status(404).json({ message: "Candidate not found" });
    }

    res.status(200).json({
      message: "Candidate status updated successfully",
      candidat: updatedCandidat,
    });
  } catch (error) {
    console.error("Error updating candidate status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Fetch members with filters and pagination
const fetchMembres = async (req, res) => {
  try {
    let membres = await Membre.find();
    let filteredMembres = [...membres];
    const { page, limit, ...filters } = req.query;
    if (Object.keys(filters).length > 0) {
      filteredMembres = filteredMembres.filter((membre) => {
        return Object.entries(filters).every(([key, value]) => {
          return (
            membre[key].toString().toLowerCase() === value.toString().toLowerCase()
          );
        });
      });
    }
    if (req.query.page && req.query.limit) {
      res
        .status(200)
        .json(
          paginatedResults(filteredMembres, parseInt(page), parseInt(limit))
        );
    } else res.status(200).json(filteredMembres);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Add candidate email for verification
const addEmailCandidat = async (req, res) => {
  try {
    let candidat = await CandidatsVerif.findOne({ email: req.body.email });
    if (candidat) {
      return res
        .status(409)
        .send({ message: "Member with given email already exists!" });
    }

    candidat = await new CandidatsVerif({ ...req.body }).save();

    const token = jwt.sign(
      { candidatId: candidat._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const url = `${process.env.FRONTEND_URL}/candidats/${candidat.id}/verify/${token}`;
    await sendEmail(candidat.email, "Verify Email", url);

    res.status(201).send({ message: "An Email sent to your account, please verify" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

// Verify candidate email
const getToken = async (req, res) => {
  try {
    const { id, token } = req.params;

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const candidat = await CandidatsVerif.findOne({ _id: id });
    if (!candidat) {
      console.log("Candidat not found");
      return res.status(400).send({ message: "Invalid link" });
    }

    await CandidatsVerif.updateOne(
      { _id: candidat._id },
      { $set: { verified: true } }
    );

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      res.status(400).send({ message: "Token has expired" });
    } else {
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
};

// Manage date range (only one entry in DB)
const dateFormRange = async (req, res, next) => {
  try {
    const newDateRange = new DateRange({
      dateDebut: new Date(req.body.dateDebut),
      dateFin: new Date(req.body.dateFin),
    });

    const existingDateRange = await DateRange.findOne();

    if (existingDateRange) {
      return res
        .status(400)
        .json({ error: "Date range already exists in the database" });
    }

    const resDateRange = await newDateRange.save();
    res.status(201).json(resDateRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update date range
const updateDateRange = async (req, res) => {
  try {
    const updatedDateRange = {
      dateDebut: new Date(req.body.dateDebut),
      dateFin: new Date(req.body.dateFin),
    };

    const existingDateRange = await DateRange.findOne();

    if (!existingDateRange) {
      return res
        .status(404)
        .json({ error: "Date range not found in the database" });
    }

    existingDateRange.dateDebut = updatedDateRange.dateDebut;
    existingDateRange.dateFin = updatedDateRange.dateFin;

    const savedDateRange = await existingDateRange.save();

    res.status(200).json(savedDateRange);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

// Submit form (candidate becomes a member)
const rempFormulaire = async (req, res) => {
  try {
    const { id } = req.params;

    const candidat = await CandidatsVerif.findOne({ _id: id });

    if (!candidat) {
      return res.status(400).send({ message: "Candidat non trouvé" });
    }

    if (!candidat.verified) {
      return res.status(401).send({ message: "Email non vérifié" });
    }

    const {
      nom,
      prenom,
      email,
      CIN,
      telephone,
      sexe,
      region,
      dateNaissance,
      situationPerso,
      titre,
      descriptif,
      ideeProjet,
      lien,
      porteur,
      membres,
      aventure,
      motivation,
    } = req.body;

    // Créer un nouveau membre avec les données fournies
    const newMembre = await new Membre({
      nom,
      prenom,
      email: candidat.email,
      CIN,
      telephone,
      sexe,
      region,
      dateNaissance,
      situationPerso,
      titre,
      descriptif,
      ideeProjet,
      lien,
      porteur,
      membres,
      aventure,
      motivation,
      role: 'candidat', // Assigner le rôle de 'candidat' si nécessaire
      status: 'en attente', // Statut par défaut
      confirm: false, // Par défaut
    }).save();

    res.status(201).send({
      message: "Le membre a été créé avec succès",
      data: newMembre,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
};
const getAllMembres = async (req, res) => {
  try {
    const membres = await Candidats.find();
    res.status(200).json(membres);
  } catch (error) {
    console.error("Error fetching members:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  fetchMembres,
  addEmailCandidat,
  getToken,
  dateFormRange,
  updateDateRange,
  rempFormulaire,
  getAllMembres,
  updateStatus,
  getAllCandidats
};
