const candidatCreathonModel = require("../models/candidatCreathon");
const sendEmail = require('../utils/sendEmail');
const creathonModel = require("../models/creathonModel")
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
      confirm: req.body.confirm || false, 
      creathon: req.body.creathon,// Par défaut à false si non fourni
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

    // Récupération des détails du créathon pour chaque candidat Creathon
    const candidatsAvecDetails = await Promise.all(
      candidatsCreathon.map(async (candidat) => {
        // Récupérer les détails du créathon lié à ce candidat
        const creathonDetails = await creathonModel.findById(candidat.creathon);

        // Retourner le candidat avec les détails du créathon lié
        return {
          ...candidat.toObject(),
          creathonDetails: creathonDetails.toObject() // Si vous utilisez Mongoose, toObject() peut être nécessaire pour convertir l'objet en un objet JavaScript standard
        };
      })
    );

    res.status(200).json(candidatsAvecDetails);
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

    // Récupération des détails du créathon lié au candidat
    const creathonDetails = await creathonModel.findById(candidatCreathon.creathon);

    if (!creathonDetails) {
      return res.status(404).json({ message: "Détails du créathon non trouvés" });
    }

    res.status(200).json({ 
      message: "Candidat Creathon récupéré avec succès", 
      data: { 
        candidatCreathon,
        creathonDetails
      } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const updateCandidature = async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const candidature = await candidatCreathonModel.findByIdAndUpdate(id, update, { new: true });
    if (!candidature) {
      return res.status(404).send({ message: 'Candidature not found' });
    }
    res.status(200).send(candidature);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const acceptCandidature = async (req, res) => {
  const { id } = req.params;

  try {
    // Mettre à jour la candidature pour la marquer comme confirmée
    const updatedCandidature = await candidatCreathonModel.findByIdAndUpdate(
      id,
      { confirm: true },
      { new: true }
    );

    if (!updatedCandidature) {
      return res.status(404).json({ error: "Candidature non trouvée" });
    }
    
    // Récupérer les détails du Créathon lié à la candidature mise à jour
    const creathonDetails = await creathonModel.findById(updatedCandidature.creathon);

    if (!creathonDetails) {
      return res.status(404).json({ error: "Détails du Créathon non trouvés" });
    }

    // Envoyer un e-mail de confirmation à l'utilisateur
    const { email, prenom, nom, titre } = updatedCandidature;
    const { dateDebut, dateFin, lieu } = creathonDetails;
    const subject = "Confirmation de candidature pour le Créathon";
    const message = `
      Bonjour ${prenom} ${nom}, <br>

      Votre candidature pour le Créathon "${titre}" a été acceptée avec succès. Voici les détails du Créathon : <br>

      - Titre du Créathon : ${titre} <br>
      - Date de début : ${dateDebut} <br>
      - Date de fin : ${dateFin} <br>
      - Lieu : ${lieu} <br>

      Cordialement, <br>
      Votre équipe du Créathon <br>
    `;
    await sendEmail(email, subject, message);

    // Répondre avec un message de succès
    res.status(200).json({ message: "Candidature acceptée avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'acceptation de la candidature :", error.message);
    res.status(500).json({ error: "Erreur lors de l'acceptation de la candidature" });
  }
}


module.exports = {
  createCandidatCreathon,
  getCandidatCreathon,
  deleteCandidatCreathon,
  getCandidatCreathonById,
  updateCandidature, 
  acceptCandidature
};
