const Mentorat = require("../models/mentoratModel");
const OutputMentorat = require("../models/outputMentoratModel");
const upload = require("../middlewares/multerConfig");
const jwt = require('jsonwebtoken');

// Ajouter un fichier
const addOutputMentorat = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "Error uploading file", error: err.message });
    }

    try {
      // Extract porteurId from JWT token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN"); // Replace 'RANDOM_TOKEN' with your actual JWT secret
      const porteurId = decodedToken.membreId;

      const { dateDepot, mentoratId } = req.body;
      const relatedMentorat = await Mentorat.findById(mentoratId);

      if (!relatedMentorat) {
        return res.status(400).json({ error: 'Invalid mentorat ID' });
      }

      const depositDate = new Date(dateDepot);
      if (depositDate < relatedMentorat.dateDebut || depositDate > relatedMentorat.dateFin) {
        return res.status(400).json({ error: 'Cannot submit output outside of the valid date range.' });
      }

      const newOutputMentorat = new OutputMentorat({
        file: req.file ? req.file.path : undefined,
        dateDepot,
        mentoratId,
        porteurId // Add the porteurId to the new OutputMentorat
      });

      const savedOutputMentorat = await newOutputMentorat.save();
      res.status(201).json(savedOutputMentorat);
    } catch (error) {
      console.error("Error saving outputMentorat:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// Supprimer un fichier
const deleteOutputMentorat = async (req, res) => {
  try {
    const { outputId } = req.params;

    const deletedOutputMentorat = await OutputMentorat.findByIdAndDelete(outputId);

    if (!deletedOutputMentorat) {
      return res.status(404).json({ message: "OutputMentorat not found" });
    }

    res.status(200).json({ message: "OutputMentorat deleted successfully" });
  } catch (error) {
    console.error("Error deleting outputMentorat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mettre à jour une sortie
const updateOutputMentorat = async (req, res) => {
  try {
    const { outputId } = req.params;
    const { dateDepot } = req.body;

    const updatedOutputMentorat = await OutputMentorat.findByIdAndUpdate(
      outputId,
      { dateDepot },
      { new: true }
    );

    if (!updatedOutputMentorat) {
      return res.status(404).json({ message: "OutputMentorat not found" });
    }

    res.status(200).json(updatedOutputMentorat);
  } catch (error) {
    console.error("Error updating outputMentorat:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer tous les fichiers
const getAllOutputMentorats = async (req, res) => {
  try {
    const outputMentorats = await OutputMentorat.find();
    res.status(200).json(outputMentorats);
  } catch (error) {
    console.error("Error fetching outputMentorats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// Récupérer un fichier par ID
const getOutputMentoratById = async (req, res) => {
  try {
    const { id } = req.params; 
    const outputMentorat = await OutputMentorat.findById(id);

    if (!outputMentorat) {
      return res.status(404).json({ message: 'OutputMentorat non trouvé' });
    }

    res.json(outputMentorat);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'outputMentorat par ID:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Ajouter un commentaire
const addCommentToOutputMentorat = async (req, res) => {
  try {
    const { outputMentoratId, comment } = req.body;

    if (!outputMentoratId || !comment) {
      return res.status(400).json({ message: "Champ manquant" });
    }

    const outputMentorat = await OutputMentorat.findById(outputMentoratId);
    if (!outputMentorat) {
      return res.status(404).json({ message: "OutputMentorat non trouvé" });
    }

    outputMentorat.commentaires.push({
      coordonateurId: req.auth.membreId,
      texte: comment,
    });

    const updatedOutputMentorat = await outputMentorat.save();
    res.status(200).json(updatedOutputMentorat);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Récupérer les commentaires par ID d'outputMentorat
const getCommentsByOutputMentoratId = async (req, res) => {
  try {
    const outputMentorat = await OutputMentorat.findById(req.params.id).populate('commentaires.coordonateurId'); // Utilisez populate pour récupérer les détails du coordinateur
    if (!outputMentorat) {
      return res.status(404).json({ message: "OutputMentorat non trouvé" });
    }
    res.status(200).json(outputMentorat.commentaires);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Mettre à jour un commentaire
const updateCommentInOutputMentorat = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { texte } = req.body;

    if (!texte) {
      return res.status(400).json({ message: "Le texte du commentaire est requis" });
    }

    const outputMentorat = await OutputMentorat.findOne({ 'commentaires._id': commentId });
    if (!outputMentorat) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    const comment = outputMentorat.commentaires.id(commentId);
    if (comment) {
      comment.texte = texte;
      await outputMentorat.save();
      res.status(200).json({ message: 'Commentaire mis à jour avec succès' });
    } else {
      res.status(404).json({ message: "Commentaire non trouvé" });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// Supprimer un commentaire
const deleteCommentInOutputMentorat = async (req, res) => {
  try {
    const { commentId } = req.params;

    const outputMentorat = await OutputMentorat.findOne({ 'commentaires._id': commentId });
    if (!outputMentorat) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    outputMentorat.commentaires.id(commentId).remove();
    await outputMentorat.save();

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};
// Récupérer les fichiers par mentoratId
const getOutputMentoratsByMentoratId = async (req, res) => {
    try {
      const { mentoratId } = req.params;
  
      if (!mentoratId) {
        return res.status(400).json({ message: 'ID du mentorat manquant' });
      }
  
      const mentorat = await Mentorat.findById(mentoratId);
      console.log("mentorat",mentorat);
      if (!mentorat) {
        return res.status(404).json({ message: 'Mentorat non trouvé' });
      }
  
      const mentoratTitle = mentorat.titre;
      console.log('mentoratTitle',mentoratTitle);
            const outputMentorats = await OutputMentorat.find({ mentoratId });
  
      if (!outputMentorats || outputMentorats.length === 0) {
        return res.status(404).json({ message: 'Aucun output trouvé pour ce mentorat' });
      }
  
      res.json({
        mentoratTitle: mentoratTitle,
        outputs: outputMentorats
      });
    } catch (error) {
      console.error("Error fetching outputMentorats:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };


  const getCommentsById = async (req, res) => {
    try {
      console.log('Fetching comments for output ID:', req.params.id); // Ajouter ce log pour vérifier l'ID
      const output = await OutputMentorat.findById(req.params.id).populate('commentaires.coordonateurId');
      if (!output) {
        console.log('Output not found for ID:', req.params.id); // Ajouter ce log pour vérifier l'ID
        return res.status(404).json({ message: "Sortie non trouvée" });
      }
      console.log('Fetched comments:', output.commentaires); // Ajouter ce log pour vérifier les commentaires
      res.status(200).json(output.commentaires);
    } catch (error) {
      console.error('Error fetching comments:', error); // Ajouter ce log pour vérifier l'erreur
      res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
    }
  };
  
  
  module.exports = {
    addOutputMentorat,
    deleteOutputMentorat,
    updateOutputMentorat,
    getAllOutputMentorats,
    getOutputMentoratById,
    addCommentToOutputMentorat,
    getCommentsByOutputMentoratId,
    updateCommentInOutputMentorat,
    deleteCommentInOutputMentorat,
    getOutputMentoratsByMentoratId,
    getCommentsById
  };
  
