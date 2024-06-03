const Besoin = require('../models/Besoin');
const Membre = require('../models/membreTacirModel');
const jwt = require('jsonwebtoken');

const createBesoin = async (req, res) => {
  try {
    const { type, description } = req.body;
    const porteurProjetId = req.auth.membreId;

    // Vérifier l'existence du porteur de projet et son rôle
    const porteurProjet = await Membre.findById(porteurProjetId);
    if (!porteurProjet || porteurProjet.role !== 'PorteurProjet') {
      return res.status(400).json({ message: 'Porteur de projet invalide' });
    }

    const besoin = new Besoin({
      type,
      description,
      porteurProjet: porteurProjet._id
    });

    await besoin.save();
    res.status(201).json(besoin);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du besoin', error: error.message });
  }
};

const getAllBesoins = async (req, res) => {
  try {
    const porteurProjetId = req.auth.membreId;

    const besoins = await Besoin.find({ porteurProjet: porteurProjetId }).populate('porteurProjet', 'nom email role');
    res.status(200).json(besoirs);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des besoins', error: error.message });
  }
};

const deleteBesoin = async (req, res) => {
  try {
    const { type, index } = req.params;
    const besoin = await Besoin.findOneAndDelete({ type: type, _id: index });

    if (!besoin) {
      return res.status(404).json({ message: 'Besoin non trouvé' });
    }

    res.status(200).json({ message: 'Besoin supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression du besoin', error: error.message });
  }
};
const getBesoinsByPorteur = async (req, res) => {
    try {
      const porteurProjetId = req.params.id;
      const besoins = await Besoin.find({ porteurProjet: porteurProjetId }).populate('porteurProjet', 'nom email');
      res.status(200).json(besoins);
    } catch (error) {
      console.error('Erreur lors de la récupération des besoins par porteur de projet:', error);
      res.status(500).json({ message: 'Erreur lors de la récupération des besoins par porteur de projet', error: error.message });
    }
  };
module.exports = {
  createBesoin,
  getAllBesoins,
  deleteBesoin,
  
};
