const cron = require("node-cron");
const Creathon = require("../models/creathonModel");

const updateCreathonStatus = async () => {
  try {
    const currentDate = new Date();
    await Creathon.updateMany(
      { dateFin: { $lt: currentDate }, status: { $ne: "fini" } },
      { $set: { status: "fini" } }
    );
    console.log("Statut des Creathons mis à jour");
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut des Creathons:", error);
  }
};

// Planifie la tâche pour qu'elle s'exécute tous les jours à minuit
cron.schedule("0 0 * * *", updateCreathonStatus);

module.exports = updateCreathonStatus;
