






const Synthese = require('../models/syntheseModel');

// Enregistrer une synthèse
const saveSynthese = async (req, res) => {
  try {
    const { day, synthesis } = req.body;
    const newSynthese = new Synthese({
      day,
      synthesis,
      date: new Date(),
    });
    await newSynthese.save();
    res.status(201).json({ message: "Synthèse enregistrée avec succès" });
  } catch (error) {
    console.error("Error saving synthese:", error.message);
    res.status(500).json({ error: "Erreur lors de l'enregistrement de la synthèse" });
  }
};

// Récupérer toutes les synthèses
const getAllSyntheses = async (req, res) => {
  try {
    const syntheses = await Synthese.find().sort({ date: -1 });
    res.status(200).json(syntheses);
  } catch (error) {
    console.error("Error fetching syntheses:", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des synthèses" });
  }
};

module.exports = {
  saveSynthese,
  getAllSyntheses,
};
