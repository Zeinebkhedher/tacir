import { Card, CardContent, CircularProgress, Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Historique.css';

const Historique = () => {
  const [creathons, setCreathons] = useState([]);
  const [mentorat, setMentorat] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token'); // Assurez-vous que le token est stocké dans le localStorage
        if (!token) {
          throw new Error('Token non trouvé');
        }

        const creathonResponse = await axios.get('http://localhost:8000/api/candidatureCreathon/acceptedCreathons', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const mentoratResponse = await axios.get('http://localhost:8000/api/mentorats/userMentorats', {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Creathon data:", creathonResponse.data);
        console.log("Mentorat data:", mentoratResponse.data);

        setCreathons(creathonResponse.data);
        setMentorat(mentoratResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <div className="historique-porteur-container">
      <Typography variant="h4" className="typography-title" gutterBottom>
        Historique du Porteur de Projet
      </Typography>

      <Grid container spacing={3}>
        {/* Section Creathons Acceptés */}
        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent className="card-content">
              <Typography variant="h6" className="typography-subtitle">
                Creathons Acceptés
              </Typography>
              <List>
                {creathons.length > 0 ? (
                  creathons.map((creathon) => (
                    <ListItem key={creathon._id} className="list-item">
                      <ListItemText
                        primary={creathon.titre}
                        secondary={`Dates : ${new Date(creathon.dateDebut).toLocaleDateString()} - ${new Date(creathon.dateFin).toLocaleDateString()}`}
                        className="list-item-text"
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem className="list-item">
                    <ListItemText primary="Aucun creathon accepté" className="list-item-text" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Section Mentorat Acceptés */}
        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardContent className="card-content">
              <Typography variant="h6" className="typography-subtitle">
                Mentorat Acceptés
              </Typography>
              <List>
                {mentorat.length > 0 ? (
                  mentorat.map((mentoratItem) => (
                    <ListItem key={mentoratItem._id} className="list-item">
                      <ListItemText
                        primary={mentoratItem.titre}
                        secondary={`Dates : ${new Date(mentoratItem.dateDebut).toLocaleDateString()} - ${new Date(mentoratItem.dateFin).toLocaleDateString()}`}
                        className="list-item-text"
                      />
                    </ListItem>
                  ))
                ) : (
                  <ListItem className="list-item">
                    <ListItemText primary="Aucun mentorat accepté" className="list-item-text" />
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Historique;
