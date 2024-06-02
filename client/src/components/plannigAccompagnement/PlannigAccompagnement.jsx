import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    TextField
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PlanningAccompagnement = () => {
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
    const [candidatures, setCandidatures] = useState([]);
    const [selectedCandidatureId, setSelectedCandidatureId] = useState('');
    const API_URL = 'http://localhost:8000/api/planning'; // Remplacez ceci par l'URL de votre backend

    useEffect(() => {
        fetchEvents();
        fetchCandidatures();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`${API_URL}/events`);
            setEvents(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des événements :', error.message);
        }
    };

    const fetchCandidatures = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/candidatures'); // Remplacez ceci par l'URL de votre endpoint candidatures
            setCandidatures(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des candidatures :', error.message);
        }
    };

    const handleDateSelect = (selectInfo) => {
        setNewEvent({ ...newEvent, start: selectInfo.startStr, end: selectInfo.endStr });
        setOpen(true);
    };

    const handleEventClick = (clickInfo) => {
        if (window.confirm(`Voulez-vous vraiment supprimer l'événement '${clickInfo.event.title}' ?`)) {
            clickInfo.event.remove();
            deleteEvent(clickInfo.event.id);
        }
    };

    const deleteEvent = async (eventId) => {
        try {
            await axios.delete(`${API_URL}/events/${eventId}`);
            fetchEvents(); // Rafraîchir les événements après suppression
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'événement :', error.message);
        }
    };

    const handleSave = async () => {
        try {
            await axios.post(`${API_URL}/events`, { ...newEvent, candidatureId: selectedCandidatureId });
            setOpen(false);
            fetchEvents(); // Rafraîchir les événements après ajout
            setNewEvent({ title: '', start: '', end: '' });
            setSelectedCandidatureId('');
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'événement :', error.message);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setNewEvent({ title: '', start: '', end: '' });
        setSelectedCandidatureId('');
    };

    return (
        <div style={{ marginBottom: "10%", width: '90%', margin: 'auto' }}>
            <DialogTitle style={{ fontSize: "35px" }}>Planning d'accompagnement</DialogTitle>
            <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                    Ajouter une activité
                </Button>
            </Box>
            <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                selectable={true}
                editable={true}
                events={events}
                select={handleDateSelect}
                eventClick={handleEventClick}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Ajouter une activité</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Titre de l'activité"
                        type="text"
                        fullWidth
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    />
                    <TextField
                        margin="dense"
                        label="Date de début"
                        type="datetime-local"
                        fullWidth
                        value={newEvent.start}
                        onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Date de fin"
                        type="datetime-local"
                        fullWidth
                        value={newEvent.end}
                        onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Select
                        value={selectedCandidatureId}
                        onChange={(e) => setSelectedCandidatureId(e.target.value)}
                        fullWidth
                        displayEmpty
                    >
                        <MenuItem value="" disabled>
                            Sélectionnez une candidature
                        </MenuItem>
                        {candidatures.map((candidature) => (
                            <MenuItem key={candidature._id} value={candidature._id}>
                                {candidature.name} {/* Remplacez 'name' par l'attribut que vous voulez afficher */}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PlanningAccompagnement;
