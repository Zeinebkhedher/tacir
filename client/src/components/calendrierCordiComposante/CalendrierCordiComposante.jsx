import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const CalendrierCordiComposante = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const token = localStorage.getItem('token');

      // Récupérer les creathons
      const responseCreathons = await axios.get('http://localhost:8000/api/creathons/creathonsListe', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Récupérer les formations
      const responseFormations = await axios.get('http://localhost:8000/api/formations/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Debugging output
      console.log("Creathons Response:", responseCreathons.data);
      console.log("Formations Response:", responseFormations.data);

      // Formater les creathons
      const formattedCreathons = responseCreathons.data.creathons.map((creathon) => ({
        title: creathon.titre,
        start: format(new Date(creathon.dateDebut), 'yyyy-MM-dd'),
        end: format(new Date(creathon.dateFin), 'yyyy-MM-dd'),
        backgroundColor: creathon.status === 'en cours' ? 'hsl(220, 70%, 60%)' : 'hsl(100, 70%, 60%)',
        textColor: '#fff',
      }));

      // Vérifier si les formations sont un tableau avant d'utiliser .map()
      const formationsArray = Array.isArray(responseFormations.data) ? responseFormations.data : responseFormations.data.data;

      const formattedFormations = formationsArray.map((formation) => ({
        title: formation.Name, // Assurez-vous que les champs correspondent à votre modèle
        start: format(new Date(formation.Date), 'yyyy-MM-dd'),
        end: format(new Date(formation.Date), 'yyyy-MM-dd'),
        backgroundColor: 'hsl(40, 70%, 60%)',
        textColor: '#000',
      }));

      // Combiner les événements
      setEvents([...formattedCreathons, ...formattedFormations]);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div style={{ marginTop: '40%', width: '190%' }}>
      <DialogTitle style={{ fontSize: '25px' }}>Calendrier</DialogTitle>
      <FullCalendar
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        className="my-calendar"
      />
    </div>
  );
};

export default CalendrierCordiComposante;
