const Planning = require('../models/Planning');
const CandidatCreathon = require('../models/candidatCreathon'); // Correction du nom de l'import

const getAllEvents = async (req, res) => {
    try {
        // Récupérer l'ID de l'utilisateur connecté à partir du token JWT
        const userId = req.userId;

        // Récupérer les candidatures Creathon associées à l'utilisateur connecté
        const candidatures = await CandidatCreathon.find({ candidatId: userId });

        // Récupérer les IDs des candidatures Creathon
        const candidatureIds = candidatures.map(candidature => candidature._id);

        // Récupérer les événements associés aux candidatures Creathon de l'utilisateur connecté
        const events = await Planning.find({ candidatsCreathon: { $in: candidatureIds } });

        res.json(events);
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, start, end, candidatsCreathonId } = req.body;
        console.log('Requête reçue:', req.body); // Log de la requête
        const candidat = await CandidatCreathon.findById(candidatsCreathonId); // Utilisation d'un autre nom de variable

        if (!candidat) {
            console.log('candidatsCreathon non trouvée'); // Log pour vérification
            return res.status(404).json({ error: 'candidatsCreathon non trouvée' });
        }

        const newEvent = new Planning({ title, start, end, candidatsCreathon: candidatsCreathonId });
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Erreur lors de la création de l\'événement :', error.message);
        res.status(500).json({ error: 'Erreur lors de la création de l\'événement' });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        await Planning.findByIdAndDelete(eventId);
        res.status(204).send();
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'événement :', error.message);
        res.status(500).json({ error: 'Erreur lors de la suppression de l\'événement' });
    }
};

module.exports = {
    getAllEvents,
    createEvent,
    deleteEvent
};
    