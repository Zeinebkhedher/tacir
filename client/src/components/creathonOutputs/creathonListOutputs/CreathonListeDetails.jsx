import { Button, Grid } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreathonListeDetails = () => {
  const [creathons, setCreathons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCreathons = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/creathons/creathonsListe');
        console.log('Données reçues:', response.data);

        // Assurez-vous que les données ont la structure attendue
        if (response.data && Array.isArray(response.data.creathons)) {
          setCreathons(response.data.creathons);
        } else {
          console.error('Données reçues ne sont pas au format attendu:', response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des créathons:', error);
      }
    };

    fetchCreathons();
  }, []);

  const handleViewOutputs = (creathonId) => {
    if (creathonId) {
      console.log("ID du créathon:", creathonId);
      navigate(`/dashboard/coordinateurComposante/creathons/${creathonId}/outputs`);
    } else {
      console.error('ID du créathon manquant');
    }
  };

  const columns = [
    { field: 'titre', headerName: 'Titre', width: 200 },
    { field: 'dateDebut', headerName: 'Date de début', width: 150 },
    { field: 'dateFin', headerName: 'Date de fin', width: 150 },
    { field: 'lieu', headerName: 'Lieu', width: 150 },
    {
      field: 'action',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => handleViewOutputs(params.row.id)}>
          Voir Outputs
        </Button>
      ),
    },
  ];

  const rows = creathons.map(creathon => ({
    id: creathon._id,
    titre: creathon.titre,
    dateDebut: creathon.dateDebut,
    dateFin: creathon.dateFin,
    lieu: creathon.lieu,
  }));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default CreathonListeDetails;
