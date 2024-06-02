const Planning = require('../models/Planning');
const candidatCreathon = require('../models/candidatCreathon'); // Correction du nom de l'import

const getAllEvents = async (req, res) => {
    try {
        const events = await Planning.find().populate('candidatsCreathon');
        res.json(events);
    } catch (error) {
        console.error('Erreur lors de la récupération des événements :', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des événements' });
    }
};

const createEvent = async (req, res) => {
    try {
        const { title, start, end, candidatsCreathonId } = req.body;
        const candidatCreathon = await candidatCreathon.findById(candidatsCreathonId); // Correction du nom de la variable

        if (!candidatCreathon) {
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
