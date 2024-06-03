import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import { DialogTitle } from '@mui/material';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const PlanningAccompagnement = () => {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [candidatures, setCandidatures] = useState([]);
  const [selectedCandidatureId, setSelectedCandidatureId] = useState('');
  const [acceptedCreathons, setAcceptedCreathons] = useState([]);
  const API_URL = 'http://localhost:8000/api/planning';

  useEffect(() => {
    fetchAcceptedCreathons();
  }, []);

  const fetchAcceptedCreathons = async () => {
    try {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.membreId;

      const response = await axios.get(
        `http://localhost:8000/api/candidatureCreathon/acceptedCreathons`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Créathons acceptés :', response.data);

      response.data.forEach((creathon) => {
        console.log('Date de début :', creathon.dateDebut);
        console.log('Date de fin :', creathon.dateFin);
      });

      const formattedEvents = response.data.map((creathon) => ({
        title: creathon.titre,
        start: formatDate(creathon.dateDebut),
        end: formatDate(creathon.dateFin),
        backgroundColor: generateRandomColor(), // Add random color
        textColor: '#fff', // White text by default
      }));

      setEvents(formattedEvents);
      setAcceptedCreathons(response.data);
    } catch (error) {
      console.error(
        'Erreur lors de la récupération des créathons acceptés :',
        error.message
      );
    }
  };

  const formatDate = (date) => {
    // Ensure date is a valid Date object
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return format(date, 'yyyy-MM-dd');
  };

  const dayCellClass = (date) => {
    const isAcceptedCreathonDate = acceptedCreathons.some((creathon) => {
      const creathonStartDate = parseISO(creathon.dateDebut);
      const creathonEndDate = parseISO(creathon.dateFin);
      const cellDate = new Date(date);

      if (
        isNaN(creathonStartDate.getTime()) ||
        isNaN(creathonEndDate.getTime()) ||
        isNaN(cellDate.getTime())
      ) {
        console.error('Date invalide');
        return false;
      }

      return cellDate >= creathonStartDate && cellDate <= creathonEndDate;
    });

    return isAcceptedCreathonDate ? 'accepted-creathon-date' : '';
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
        events={events} // Ensure the updated events are passed
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        editable={true}
        dayCellClassNames={dayCellClass}
        // Consider adding a CSS class to the FullCalendar container
        className="my-calendar" // Optional for easier styling
      />
    </div>
  );
};

export default PlanningAccompagnement;
