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
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchAllEvents();
  }, []);

  const fetchAllEvents = async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch creathons
      const responseCreathons = await axios.get('http://localhost:8000/api/creathons/creathonsListe', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch formations
      const responseFormations = await axios.get('http://localhost:8000/api/formations/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Fetch mentorats
      const responseMentorats = await axios.get('http://localhost:8000/api/mentorats/', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const responseReunions = await axios.get('http://localhost:8000/api/reunions/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Debugging output
      console.log("Creathons Response:", responseCreathons.data);
      console.log("Formations Response:", responseFormations.data);
      console.log("Mentorats Response:", responseMentorats.data);
      console.log("Reunions Response:", responseReunions.data);

      // Format creathons
      const formattedCreathons = responseCreathons.data.creathons.map((creathon) => ({
        title: creathon.titre,
        start: format(new Date(creathon.dateDebut), 'yyyy-MM-dd'),
        end: format(new Date(creathon.dateFin), 'yyyy-MM-dd'),
        backgroundColor: creathon.status === 'en cours' ? 'hsl(220, 70%, 60%)' : 'hsl(100, 70%, 60%)',
        textColor: '#fff',
      }));

      // Format formations
      const formationsArray = Array.isArray(responseFormations.data) ? responseFormations.data : responseFormations.data.data;
      const formattedFormations = formationsArray.map((formation) => ({
        title: formation.Name, // Ensure this field exists in your data
        start: format(new Date(formation.Date), 'yyyy-MM-dd'),
        end: format(new Date(formation.Date), 'yyyy-MM-dd'),
        backgroundColor: 'hsl(40, 70%, 60%)',
        textColor: '#000',
      }));

      // Format mentorats
      const mentoratsArray = Array.isArray(responseMentorats.data) ? responseMentorats.data : responseMentorats.data.data;
      const formattedMentorats = mentoratsArray.map((mentorat) => ({
        title: mentorat.titre,
        start: format(new Date(mentorat.dateDebut), 'yyyy-MM-dd'),
        end: format(new Date(mentorat.dateFin), 'yyyy-MM-dd'),
        backgroundColor: 'hsl(300, 70%, 60%)',
        textColor: '#fff',
      }));

       // Format reunions
       const formattedReunions = responseReunions.data.map((reunion) => ({
        title: reunion.titre,
        start: format(new Date(reunion.date), 'yyyy-MM-dd'),
        end: format(new Date(reunion.date), 'yyyy-MM-dd'),
        backgroundColor: 'hsl(120, 70%, 60%)', // Change color as needed
        textColor: '#fff',
      }));

      // Combine events
      setEvents([...formattedCreathons, ...formattedFormations, ...formattedMentorats, ...formattedReunions]);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements:', error.response ? error.response.data : error.message);
      setError('Erreur lors de la récupération des événements'); // Set error message
    }
  };

  return (
    <div style={{ marginTop: '160%', width: '360%' , marginLeft:"-90%"}}>
      <DialogTitle style={{ fontSize: '25px' }}>Calendrier</DialogTitle>
      {error && <div className="error">{error}</div>} {/* Display error if present */}
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
