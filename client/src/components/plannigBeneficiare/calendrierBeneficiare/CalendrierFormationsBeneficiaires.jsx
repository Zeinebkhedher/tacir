import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';

const CalendrierFormationsBeneficiaires = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null); // Add error state

  useEffect(() => {
    fetchFormationsWithAcceptedBeneficiaries();
  }, []);

  const fetchFormationsWithAcceptedBeneficiaries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:8000/api/formations-with-accepted-beneficiaries', {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Debugging output
      console.log("Formations Response:", response.data);

      const formattedEvents = response.data.data.map((formation) => ({
        title: formation.Name,
        start: format(new Date(formation.Date), 'yyyy-MM-dd'),
        end: format(new Date(formation.Date), 'yyyy-MM-dd'),
        backgroundColor: 'hsl(120, 70%, 60%)',
        textColor: '#fff',
      }));

      setEvents(formattedEvents);
    } catch (error) {
      console.error('Erreur lors de la récupération des formations avec bénéficiaires acceptés:', error.response ? error.response.data : error.message);
      setError('Erreur lors de la récupération des formations avec bénéficiaires acceptés'); // Set error message
    }
  };

  return (
    <div style={{ marginTop: '10%', width: '100%' }}>
     
      {error && <div className="error-message">{error}</div>} {/* Display error if present */}
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

export default CalendrierFormationsBeneficiaires;
