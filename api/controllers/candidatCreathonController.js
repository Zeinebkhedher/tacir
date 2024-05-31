const candidatCreathonModel = require("../models/candidatCreathon");

const createCandidatCreathon = async (req, res) => {
  try {
    // Création d'un candidat Creathon avec les données de la requête
    const candidatCreathon = new candidatCreathonModel({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      titre: req.body.titre,
      descriptif: req.body.descriptif,
      ideeProjet: req.body.ideeProjet,
      lien: req.body.lien,
      membres: req.body.membres,
      status: req.body.status,
      confirm: req.body.confirm || false, // Par défaut à false si non fourni
    });

    // Enregistrement du candidat Creathon dans la base de données
    const response = await candidatCreathon.save();

    res.status(201).json({
      message: "Candidat Creathon créé avec succès",
      candidatCreathon: response,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCandidatCreathon = async (req, res) => {
  try {
    // Récupération de tous les candidats Creathon depuis la base de données
    const candidatsCreathon = await candidatCreathonModel.find();

    res.status(200).json(candidatsCreathon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCandidatCreathon = async (req, res) => {
  try {
    // Suppression du candidat Creathon avec l'ID fourni
    await candidatCreathonModel.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Candidat Creathon supprimé avec succès" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const getCandidatCreathonById = async (req, res) => {
  try {
    // Récupération du candidat Creathon avec l'ID fourni depuis la base de données
    const candidatCreathon = await candidatCreathonModel.findById(req.params.id);

    if (!candidatCreathon) {
      return res.status(404).json({ message: "Candidat Creathon non trouvé" });
    }

    res.status(200).json({ 
      message: "Candidat Creathon récupéré avec succès", 
      data: candidatCreathon 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


module.exports = {
  createCandidatCreathon,
  getCandidatCreathon,
  deleteCandidatCreathon,
  getCandidatCreathonById
};
