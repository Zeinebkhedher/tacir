const candidatCreathonModel = require("../models/candidatCreathon");
const sendEmail = require('../utils/sendEmail');
const creathonModel = require("../models/creathonModel")
const Synthese = require('../models/syntheseModel');

const createCandidatCreathon = async (req, res) => {
  try {
    // Vérifiez si le porteur de projet est authentifié
    if (!req.auth || !req.auth.membreId) {
      return res.status(403).json({ error: "Invalid token" });
    }

    // Récupérer l'identifiant du porteur de projet connecté
    const porteurProjetId = req.auth.membreId;

    // Création d'un candidat Creathon avec les données de la requête
    const candidatCreathon = new candidatCreathonModel({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      titre: req.body.titre,
      descriptif: req.body.descriptif,
      ideeProjet: req.body.ideeProjet,
      lien: req.body.lien,
      membres: [porteurProjetId], // Utilisez l'identifiant du porteur de projet connecté
      status: req.body.status,
      confirm: req.body.confirm || false,
      creathon: req.body.creathon,
    });

    // Enregistrement du candidat Creathon dans la base de données
    const response = await candidatCreathon.save();

    res.status(201).json({
      message: "Candidat Creathon créé avec succès",
      candidatCreathon: response,
    });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Erreur lors de la création du candidat Creathon:", error.message);
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

const sendRejectionEmail  = async (req, res) => {
  const { id } = req.params;

  try {
    // Supprimer la candidature rejetée de la base de données
    const deletedCandidature = await candidatCreathonModel.findByIdAndDelete(id);

    if (!deletedCandidature) {
      return res.status(404).json({ error: "Candidature non trouvée" });
    }

    // Envoyer un e-mail de refus à l'utilisateur
    const { email, prenom, nom, titre } = deletedCandidature;
    const subject = "Refus de candidature pour le Créathon";
    const message = `
      Bonjour ${prenom} ${nom}, <br>

      Votre candidature pour le Créathon "${titre}" a été refusée. Nous vous remercions pour votre intérêt et espérons vous revoir lors de futurs événements. <br>

      Cordialement, <br>
      Votre équipe du Créathon <br>
    `;
    await sendEmail(email, subject, message);

    // Répondre avec un message de succès
    res.status(200).json({ message: "Candidature refusée avec succès" });
  } catch (error) {
    console.error("Erreur lors du refus de la candidature :", error.message);
    res.status(500).json({ error: "Erreur lors du refus de la candidature" });
  }
};

const getConfirmedCandidats = async (req, res) => {
  try {
    // Récupération de tous les candidats confirmés
    const confirmedCandidats = await candidatCreathonModel.find({ confirm: true });

    // Récupération des détails du créathon pour chaque candidat confirmé
    const candidatsAvecDetails = await Promise.all(
      confirmedCandidats.map(async (candidat) => {
        const creathonDetails = await creathonModel.findById(candidat.creathon);

        return {
          ...candidat.toObject(),
          creathonDetails: creathonDetails ? creathonDetails.toObject() : null
        };
      })
    );

    res.status(200).json(candidatsAvecDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRejectedCandidatures = async (req, res) => {
  try {
    const rejectedCandidatures = await candidatCreathonModel.find({ confirm: false });
    res.status(200).json(rejectedCandidatures);
  } catch (error) {
    console.error("Error fetching rejected candidatures:", error.message);
    res.status(500).json({ message: "Erreur lors de la récupération des candidatures rejetées." });
  }
};
const   getAcceptedCandidaturesCreathon = async (req, res) => {

  try {
    const acceptedCandidatures = await candidatCreathonModel.find({ confirm: true }).populate('creathon');

    if (!acceptedCandidatures) {
      return res.status(404).json({ error: "Aucune candidature acceptée trouvée" });
    }

    res.status(200).json({ acceptedCandidatures });
  } catch (error) {
    console.error("Erreur lors de la récupération des candidatures acceptées :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des candidatures acceptées" });
  }
};

const addSynthese = async (req, res) => {
  const { id } = req.params; // Extraire l'ID du candidat Creathon des paramètres de la requête
  const { synthesis } = req.body; // Extraire la synthèse du corps de la requête

  try {
    // Rechercher le candidat Creathon dans la base de données
    const candidat = await candidatCreathonModel.findById(id);

    // Vérifier si le candidat existe
    if (!candidat) {
      return res.status(404).json({ error: "Candidat non trouvé" });
    }

    // Créer une nouvelle synthèse avec les données fournies
    const newSynthese = new Synthese({
      synthesis,
      date: new Date(),
      candidatCreathon: id // Associer la synthèse au candidat Creathon par son ID
    });

    // Enregistrer la nouvelle synthèse dans la base de données
    await newSynthese.save();

    // Ajouter l'ID de la nouvelle synthèse à la liste des synthèses du candidat Creathon
    candidat.syntheses.push(newSynthese._id);

    // Enregistrer les modifications apportées au candidat Creathon
    await candidat.save();

    // Répondre avec la nouvelle synthèse ajoutée
    res.status(201).json(newSynthese);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la synthèse :", error.message);
    res.status(500).json({ error: "Erreur lors de l'ajout de la synthèse" });
  }
};

const getAcceptedCreathonsByPorteurProjet = async (req, res) => {
  try {
    const userId = req.auth.membreId;
console.log('user id', userId);
    // Recherchez les candidats Creathons acceptés par le porteur de projet avec l'ID `userId`
    const candidats = await candidatCreathonModel.find({ membres: userId, confirm: true }).populate('creathon');
console.log('candidat', candidats);
    // Obtenez les Creathons associés à ces candidats
    const creathons = candidats.map(candidat => candidat.creathon);

    res.json(creathons);
  } catch (error) {
    console.error('Erreur lors de la récupération des Creathons acceptés par le porteur de projet :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des Creathons acceptés par le porteur de projet' });
  }
};





module.exports = {
  createCandidatCreathon,
  getCandidatCreathon,
  deleteCandidatCreathon,
  getCandidatCreathonById,
  updateCandidature, 
  acceptCandidature,
  getConfirmedCandidats,
  getRejectedCandidatures,
  sendRejectionEmail , 
  getAcceptedCandidaturesCreathon, 
  addSynthese, 
  getAcceptedCreathonsByPorteurProjet
};
