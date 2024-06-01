const Creathon = require("../models/creathonModel");

const updateCreathonStatusMiddleware = async (req, res, next) => {
  try {
    const currentDate = new Date();
    await Creathon.updateMany(
      { dateFin: { $lt: currentDate }, status: { $ne: "fini" } },
      { $set: { status: "fini" } }
    );
    next();
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut des Creathons:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour des statuts" });
  }
};

module.exports = updateCreathonStatusMiddleware;
