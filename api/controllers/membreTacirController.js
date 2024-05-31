const Membre = require("../models/membreTacirModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const generatePassword = require("generate-password");
const {
  sendNotificationMiddleware,
} = require("../middlewares/sendNotificationMiddleware");
const sendEmail = require("../utils/sendEmail");

const modifierTessiture = async (req, res) => {
  try {
    const membre = await Membre.findOne({ _id: req.params.id });
    if (!membre) {
      return res.status(404).json({ message: "Membre non trouvé" });
    }
    // Your modification logic here

    res.status(200).json({ message: "Modification réussie", membre });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const register = async (req, res) => {
  try {
    const passAleatoire = generatePassword.generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbols: true,
    });
    const hashedPassword = await bcrypt.hash(passAleatoire, 10);
    const membre = new Membre({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      region: req.body.region,
      password: hashedPassword,
      sexe: null,
      dateNaissance: null,
      nationalite: null,
      CIN: null,
      situationPerso: null,
      telephone: null,
      historiqueStatut: null,
      role: req.body.role,
    });
    console.log(membre);
    if (
      membre.nom === "" ||
      membre.prenom === "" ||
      membre.email === "" ||
      membre.role === ""
    ) {
      return res
        .status(400)
        .json({ message: "Vous devez remplir tous les champs" });
    }

    const response = await membre.save();
    const corpsEmail = `Bonjour ${membre.prenom} ${membre.nom},<br>
    Pour accéder à votre compte,voici vos coordonnées.<br>
    Email: ${membre.email} <br>
    Mot de passe: ${passAleatoire} <br> 
    Cordialement`;
    await sendEmail(membre.email, "Informations d'inscriptions", corpsEmail);
    const newMembre = response.toObject();
    delete newMembre.password;

    res.status(201).json({
      message: "Membre cré avec succés ",
      membre: newMembre,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const login = async (req, res) => {
  try {
    const membre = await Membre.findOne({ email: req.body.email });

    if (!membre) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrects" });
    }
    const valid = await bcrypt.compare(req.body.password, membre.password);
    if (!valid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrects" });
    }

    const token = jwt.sign(
      { membreId: membre._id, role: membre.role, email: membre.email },
      "RANDOM_TOKEN",
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMemberById = async (req, res) => {
  try {
    const membre = await Membre.findOne({ _id: req.params.id });
    if (!membre) {
      return res.status(404).json({ message: "Membre non trouvé" });
    }
    membre.password = undefined;
    res.status(200).json({
      message: "Membre trouvé",
      model: membre,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMembers = async (req, res) => {
  try {
    let membres;
    if (req.query.role) {
      membres = await Membre.find({ role: req.query.role });
    } else {
      membres = await Membre.find();
    }
    membres.forEach((membre) => {
      membre.password = undefined;
    });
    res.status(200).json({
      message: "Données extraites avec succès",
      model: membres,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    const membre = await Membre.findByIdAndDelete({ _id: req.params.id });
    if (!membre) {
      return res.status(404).json({ message: "Membre non trouvé" });
    }
    res.status(200).json({
      message: "Membre supprimé avec succès",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateMember = async (req, res) => {
  try {
    const membre = await Membre.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    if (!membre) {
      return res.status(404).json({ message: "Membre non trouvé" });
    }
    membre.password = undefined;
    res.status(200).json({
      message: "Membre modifié avec succès",
      model: membre,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllMentors = async (req, res) => {
  try {
    const mentors = await Membre.find({ role: "Mentor" }, "-password");
    res.status(200).json({
      message: "Mentors retrieved successfully",
      mentors,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve mentors" });
  }
};

const getAllPorteurDeProjet = async (req, res) => {
  try {
    const porteurs = await Membre.find({ role: "PorteurProjet" }, "-password");
    res.status(200).json({
      message: "Porteur de projet retrieved successfully",
      porteurs,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve porteur de projet" });
  }
};

module.exports = {
  modifierTessiture,
  register,
  login,
  getMemberById,
  getAllMembers,
  getAllMentors,
  getAllPorteurDeProjet,
  deleteMember,
  updateMember,
};
