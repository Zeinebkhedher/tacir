import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from "react";

const CreathonListeAccepte = () => {
  const [acceptedCandidatures, setAcceptedCandidatures] = useState([]);
  const [syntheseDialogOpen, setSyntheseDialogOpen] = useState(false);
  const [currentCandidature, setCurrentCandidature] = useState(null);
  const [synthese, setSynthese] = useState("");

  useEffect(() => {
    fetchAcceptedCandidatures();
  }, []);

  const fetchAcceptedCandidatures = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/candidatureCreathon/acceptedCandidaturesCreathonListe");

      if (response.status === 200) {
        setAcceptedCandidatures(response.data.acceptedCandidatures);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des candidatures acceptées :", error.message);
    }
  };

  const handleSyntheseClick = (candidature) => {
    setCurrentCandidature(candidature);
    setSynthese("");
    setSyntheseDialogOpen(true);
  };

  const handleSyntheseSave = async () => {
    if (!currentCandidature) return;

    try {
      const response = await axios.patch(`http://localhost:8000/api/candidatureCreathon/synthese/${currentCandidature._id}`, { synthesis: synthese });
      if (response.status === 201) {
        setSyntheseDialogOpen(false);
        fetchAcceptedCandidatures(); // Rafraîchir la liste des candidatures pour inclure la nouvelle synthèse
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la synthèse :", error.message);
    }
  };

  const columns = [
    { field: 'nom', headerName: 'Nom', width: 70 },
    { field: 'prenom', headerName: 'Prénom', width: 70 },
    { field: 'email', headerName: 'Email', width: 100 },
    { field: 'titre', headerName: 'Titre', width: 100 },
    {
        field: 'creathonTitle',
        headerName: 'Titre Créathon',
        width: 150,
        //valueGetter: (params) => (params.row && params.row.creathon && params.row.creathon.titre) || '',
    },
    {
        field: 'dateDebut',
        headerName: 'Date Début',
        width: 100,
        //valueGetter: (params) => (params.row && params.row.creathon && params.row.creathon.dateDebut) ? new Date(params.row.creathon.dateDebut).toLocaleDateString() : '',
    },
    {
        field: 'dateFin',
        headerName: 'Date Fin',
        width: 100,
        //valueGetter: (params) => (params.row && params.row.creathon && params.row.creathon.dateFin) ? new Date(params.row.creathon.dateFin).toLocaleDateString() : '',
    },
    {
        field: 'lieu',
        headerName: 'Lieu',
        width: 100,
        //valueGetter: (params) => (params.row && params.row.creathon && params.row.creathon.lieu) || '',
    },
      
    {
      field: 'synthese',
      headerName: 'Synthèse',
      width: 150,
      renderCell: (params) => (
        <Button onClick={() => handleSyntheseClick(params.row)} variant="contained">Synthèse</Button>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
      <DialogTitle id="candidature-dialog-title">Liste candidats acceptés au créathon</DialogTitle>
      <DataGrid
        rows={acceptedCandidatures}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        getRowId={(row) => row._id}
      />
      <Dialog open={syntheseDialogOpen} onClose={() => setSyntheseDialogOpen(false)}>
        <DialogTitle>Rédiger une Synthèse</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Rédigez une synthèse pour {currentCandidature?.prenom} {currentCandidature?.nom}.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Synthèse"
            type="text"
            fullWidth
            variant="outlined"
            value={synthese}
            onChange={(e) => setSynthese(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSyntheseDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSyntheseSave} color="primary">
            Sauvegarder
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreathonListeAccepte;
