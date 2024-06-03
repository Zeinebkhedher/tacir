import { CircularProgress, Container, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const BesoinsList = () => {
  const [besoins, setBesoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBesoins = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/besoins/besoinsListe');
        setBesoins(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBesoins();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erreur: {error}</Typography>;
  }

  // Définition des colonnes avec utilisation de la fonction de formatage de date
  const columns = [
    { field: 'porteurProjet.nom', headerName: 'Nom du porteur', width: 200 },
    { field: 'porteurProjet.email', headerName: 'Email du porteur', width: 200 },
    { field: 'type', headerName: 'Type de besoin', width: 200 },
    { field: 'description', headerName: 'Description', width: 400 },
    { field: 'createdAt', headerName: 'Date de création', width: 200, valueGetter: (params) => params.row.createdAt ? new Date(params.row.createdAt).toLocaleDateString() : 'N/A' },
  ];

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom style={{marginLeft:"12%"}}>
        Liste des besoins par porteur de projet
      </Typography>
      {besoins.length > 0 ? (
        <div style={{ height: 400, width: '100%' , marginLeft:"12%"}}>
          <DataGrid
            rows={besoins}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5, 10, 20]}
            getRowId={(row) => row._id}
          />
        </div>
      ) : (
        <Typography variant="body1">Aucun besoin trouvé.</Typography>
      )}
    </Container>
  );
};

export default BesoinsList;
