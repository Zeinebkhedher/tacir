// controllers/besoinController.js

const Besoin = require('../models/Besoin');

const createBesoin = async (req, res) => {
  try {
    const { type, description } = req.body;
    const nouveauBesoin = new Besoin({ type, description });
    await nouveauBesoin.save();
    res.status(201).json(nouveauBesoin);
  } catch (error) {
    console.error("Erreur lors de la création du besoin :", error.message);
    res.status(500).json({ error: "Erreur lors de la création du besoin" });
  }
};

const getAllBesoins = async (req, res) => {
  try {
    const besoins = await Besoin.find();
    res.json(besoins);
  } catch (error) {
    console.error("Erreur lors de la récupération des besoins :", error.message);
    res.status(500).json({ error: "Erreur lors de la récupération des besoins" });
  }
};

const deleteBesoin = async (req, res) => {
    try {
      const { type, index } = req.params;
      let besoins;
      if (type === 'Ressources matérielles') {
        besoins = await Besoin.find({ type: 'Ressources matérielles' });
      } else if (type === 'Besoins de formation') {
        besoins = await Besoin.find({ type: 'Besoins de formation' });
      }
  
      if (!besoins) {
        return res.status(404).json({ error: 'Besoins non trouvés' });
      }
  
      // Supprimer le besoin à l'index spécifié
      besoins.splice(index, 1);
  
      // Enregistrer les modifications dans la base de données
      await Promise.all(besoins.map(async (besoin) => await besoin.save()));
  
      res.status(200).json({ message: 'Besoin supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du besoin :', error.message);
      res.status(500).json({ error: 'Erreur lors de la suppression du besoin' });
    }
  };
module.exports = {
    createBesoin,
    getAllBesoins,
    deleteBesoin

}