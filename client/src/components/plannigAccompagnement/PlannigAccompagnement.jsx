import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const PlanningAccompagnement = () => {
  const [events, setEvents] = useState([]);
  const API_URL = 'http://localhost:8000/api';

  useEffect(() => {
    fetchAcceptedCreathons();
    fetchReunions();
  }, []);

  const fetchAcceptedCreathons = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.membreId;

      const response = await axios.get(
        `${API_URL}/candidatureCreathon/acceptedCreathons`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Créathons acceptés :', response.data);

      const formattedEvents = response.data.map((creathon) => ({
        title: creathon.titre,
        start: formatDate(creathon.dateDebut),
        end: formatDate(creathon.dateFin),
        backgroundColor: generateRandomColor(),
        textColor: '#fff',
      }));

      setEvents((prevEvents) => [...prevEvents, ...formattedEvents]);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des créathons acceptés :',
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchReunions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token non trouvé dans le stockage local');
      }

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.membreId;
      if (!userId) {
        throw new Error('ID de membre non trouvé dans le token décodé');
      }

      const response = await axios.get(
        `${API_URL}/reunions/porteurProjet`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: userId,
          },
        }
      );

      console.log('Réunions :', response.data);

      const formattedEvents = response.data.map((reunion) => ({
        title: reunion.titre,
        start: formatDate(reunion.date),
        end: formatDate(reunion.date),
        backgroundColor: generateRandomColor(),
        textColor: '#fff',
      }));

      setEvents((prevEvents) => [...prevEvents, ...formattedEvents]);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des réunions :',
        error.response ? error.response.data : error.message
      );
    }
  };

  const formatDate = (date) => {
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return format(date, "yyyy-MM-dd'T'HH:mm:ss"); // Format ISO avec heure
  };

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.random();
    const lightness = Math.random() * 0.8 + 0.2;
    return `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
  };

  return (
    <div style={{ marginTop: '40%', width: '190%' }}>
      <DialogTitle style={{ fontSize: '25px' }}>Planning d'accompagnement</DialogTitle>
      <FullCalendar
        events={events}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        className="my-calendar"
        eventClick={(info) => {
          if (info.event.extendedProps.link) {
            window.open(info.event.extendedProps.link, '_blank');
          }
        }}
      />
    </div>
  );
};

export default PlanningAccompagnement;
