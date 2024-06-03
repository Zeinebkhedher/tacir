import { Card, CardContent, Grid, Typography } from '@mui/material';
import axios from 'axios';
import { format } from 'date-fns'; // Importez la fonction format de date-fns
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const AcceptedCreathonsListByPorteurProjet = () => {
  const [creathons, setCreathons] = useState([]);
  const [porteurProjetId, setPorteurProjetId] = useState(null);

  useEffect(() => {
    const fetchAcceptedCreathons = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.membreId;
        setPorteurProjetId(userId);

        const response = await axios.get("http://localhost:8000/api/candidatureCreathon/acceptedCreathons", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCreathons(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des créathons acceptés :', error.message);
      }
    };

    fetchAcceptedCreathons();
  }, []);
  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd');
  };
  return (
    <div>
    <Typography variant="h4" gutterBottom>
      Liste des Créathons Acceptés
    </Typography>
    <Grid container spacing={12}>
      {creathons.length > 0 ? (
        creathons.map((creathon) => (
          <Grid item xs={12} sm={6} md={4} key={creathon._id}>
            <Card style={{ width: '180%', borderRadius: '10px', backgroundColor: '#f0f0f0' }}>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom style={{ color: 'blue' }}>
                  {creathon.titre}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                
                  Du {formatDate(creathon.dateDebut)}<br></br> au <br></br>{formatDate(creathon.dateFin)}   
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Typography>Aucun Créathon accepté trouvé.</Typography>
      )}
    </Grid>
  </div>
  );
};

export default AcceptedCreathonsListByPorteurProjet;
