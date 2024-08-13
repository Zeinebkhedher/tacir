const Creathon = require("../models/creathonModel");
//const Mentorat = require("../models/mentoratModel");
const Output = require("../models/outputModel");
const upload = require("../middlewares/multerConfig");
const jwt = require('jsonwebtoken');

// Ajouter un fichier
const addOutput = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(500).json({ message: "Error uploading file", error: err.message });
    }

    try {
      // Extract porteurId from JWT token
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, "RANDOM_TOKEN"); // Replace 'your_jwt_secret' with your actual JWT secret
      const porteurId = decodedToken.membreId;

      const { dateDepot, creathonId, mentoratId } = req.body;
      let relatedEvent;

      if (creathonId) {
        relatedEvent = await Creathon.findById(creathonId);
      } else if (mentoratId) {
        relatedEvent = await Mentorat.findById(mentoratId);
      }

      if (!relatedEvent) {
        return res.status(400).json({ error: 'Invalid creathon or mentorat ID' });
      }

      const depositDate = new Date(dateDepot);
      if (depositDate < relatedEvent.dateDebut || depositDate > relatedEvent.dateFin) {
        return res.status(400).json({ error: 'Cannot submit output outside of the valid date range.' });
      }

      const newOutput = new Output({
        file: req.file ? req.file.path : undefined,
        dateDepot,
        creathonId: creathonId || null,
        mentoratId: mentoratId || null,
        porteurId // Add the porteurId to the new Output
      });

      const savedOutput = await newOutput.save();
      res.status(201).json(savedOutput);
    } catch (error) {
      console.error("Error saving output:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

// Supprimer un fichier
const deleteOutput = async (req, res) => {
  try {
    const { outputId } = req.params;

    const deletedOutput = await Output.findByIdAndDelete(outputId);

    if (!deletedOutput) {
      return res.status(404).json({ message: "Output not found" });
    }

    res.status(200).json({ message: "Output deleted successfully" });
  } catch (error) {
    console.error("Error deleting output:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Mettre à jour une sortie
const updateOutput = async (req, res) => {
  try {
    const { outputId } = req.params;
    const { dateDepot } = req.body;

    const updatedOutput = await Output.findByIdAndUpdate(
      outputId,
      { dateDepot },
      { new: true }
    );

    if (!updatedOutput) {
      return res.status(404).json({ message: "Output not found" });
    }

    res.status(200).json(updatedOutput);
  } catch (error) {
    console.error("Error updating output:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Récupérer tous les fichiers
const getAllOutputs = async (req, res) => {
  try {
    const outputs = await Output.find();
    res.status(200).json(outputs);
  } catch (error) {
    console.error("Error fetching outputs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Télécharger un fichier
const downloadFile = (req, res) => {
  try {
    const { filePath } = req.params;
    const decodedFilePath = decodeURIComponent(filePath);
    const fullFilePath = path.join(__dirname, "../uploads/outputs", decodedFilePath);

    if (fs.existsSync(fullFilePath)) {
      res.download(fullFilePath, (err) => {
        if (err) {
          console.error("Error downloading file:", err);
          res.status(500).json({ message: "Error downloading file" });
        }
      });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error in downloadFile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const getOutputsByCreathonId = async (req, res) => {
  try {
    const { creathonId } = req.params;
    console.log('ID du Creathon reçu:', creathonId); // Log the received Creathon ID

    if (!creathonId) {
      return res.status(400).json({ message: 'ID du creathon manquant' });
    }

    // Fetch the creathon details
    const creathon = await Creathon.findById(creathonId);
    if (!creathon) {
      return res.status(404).json({ message: 'Creathon non trouvé' });
    }
    
    const creathonTitle = creathon.titre;

    // Fetch the outputs for the given creathonId
    const outputs = await Output.find({ creathonId });

    if (!outputs || outputs.length === 0) {
      return res.status(404).json({ message: 'Aucun output trouvé pour ce creathon' });
    }

    // Include the creathon title in each output
    res.json(outputs.map(output => ({
      ...output._doc,
      creathonTitle
    })));
  } catch (error) {
    console.error('Erreur lors de la récupération des outputs par ID de creathon:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


const getOutputById = async (req, res) => {
  try {
    const { id } = req.params; // Récupère l'ID depuis les paramètres de la requête
    const output = await Output.findById(id); // Trouve l'output avec cet ID

    if (!output) {
      return res.status(404).json({ message: 'Output non trouvé' });
    }

    res.json(output); // Renvoie l'output trouvé
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'output par ID:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
const addComment = async (req, res) => {
  try {
    const { outputId, comment } = req.body;

    if (!outputId || !comment) {
      return res.status(400).json({ message: "Champ manquant" });
    }

    const output = await Output.findById(outputId);
    if (!output) {
      return res.status(404).json({ message: "Sortie non trouvée" });
    }

    output.commentaires.push({
      coordonateurId: req.auth.membreId,
      texte: comment,
    });

    const updatedOutput = await output.save();
    res.status(200).json(updatedOutput);
  } catch (error) {
    console.error('Erreur lors de l\'ajout du commentaire:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};

// controllers/outputController.js
const getCommentsById = async (req, res) => {
  try {
    const output = await Output.findById(req.params.id).populate('commentaires.coordonateurId'); // Utilisez populate pour récupérer les détails du coordinateur
    if (!output) {
      return res.status(404).json({ message: "Sortie non trouvée" });
    }
    res.status(200).json(output.commentaires);
  } catch (error) {
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};


const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { texte } = req.body;

    console.log('ID du commentaire:', commentId);
    console.log('Texte du commentaire:', texte);  // Assurez-vous que ceci affiche une valeur correcte

    if (!texte) {
      return res.status(400).json({ message: "Le texte du commentaire est requis" });
    }

    const output = await Output.findOne({ 'commentaires._id': commentId });
    if (!output) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    const comment = output.commentaires.id(commentId);
    if (comment) {
      comment.texte = texte;
      await output.save();
      res.status(200).json({ message: 'Commentaire mis à jour avec succès' });
    } else {
      res.status(404).json({ message: 'Commentaire non trouvé' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du commentaire:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};


const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    console.log(`Tentative de suppression du commentaire avec l'ID : ${commentId}`);

    const output = await Output.findOne({ 'commentaires._id': commentId });
    if (!output) {
      console.error(`Commentaire avec l'ID : ${commentId} non trouvé`);
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    // Utilisation de la méthode filter pour supprimer le commentaire
    output.commentaires = output.commentaires.filter(commentaire => commentaire._id.toString() !== commentId);
    await output.save();

    res.status(200).json({ message: 'Commentaire supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression du commentaire:', error);
    res.status(500).json({ message: 'Erreur interne du serveur', error: error.message });
  }
};



module.exports = {
  addOutput,
  deleteOutput,
  updateOutput,
  getAllOutputs,
  downloadFile,
  getOutputById,
  getOutputsByCreathonId,
  addComment,
  getCommentsById,
  updateComment,
  deleteComment
};
