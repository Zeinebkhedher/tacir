import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import './candidatureCreathon.css';

const CandidaturesCreathon = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [acceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);
  const [candidatureIdToUpdate, setCandidatureIdToUpdate] = useState(null);
  const [selectedCandidature, setSelectedCandidature] = useState(null);

  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/candidatureCreathon/");
        if (response.status === 200) {
          const dataWithIds = response.data.map((candidature) => ({
            ...candidature,
            id: candidature._id // Use the actual _id from the database
          }));
          setCandidatures(dataWithIds);
        }
      } catch (error) {
        console.error("Error fetching candidatures:", error.message);
      }
    };

    fetchCandidatures();
  }, []);

  const handleAcceptClick = (candidature) => {
    setCandidatureIdToUpdate(candidature._id);
    setSelectedCandidature(candidature);
    setAcceptConfirmationOpen(true);
  };

  const handleRejectClick = (id) => {
    setCandidatureIdToUpdate(id);
    setConfirmationOpen(true);
  };

  const handleAcceptConfirm = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/api/candidatureCreathon/${candidatureIdToUpdate}`, { confirm: true });
      if (response.status === 200) {
        const updatedCandidatures = candidatures.map(candidature => {
          if (candidature._id === candidatureIdToUpdate) {
            return { ...candidature, confirm: true };
          }
          return candidature;
        });
        setCandidatures(updatedCandidatures);
        setAcceptConfirmationOpen(false);
      }
    } catch (error) {
      console.error("Error accepting candidature:", error.message);
    }
  };

  const handleRejectConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/candidatureCreathon/${candidatureIdToUpdate}`);
      if (response.status === 200) {
        const updatedCandidatures = candidatures.filter(candidature => candidature._id !== candidatureIdToUpdate);
        setCandidatures(updatedCandidatures);
        setConfirmationOpen(false);
      }
    } catch (error) {
      console.error("Error rejecting candidature:", error.message);
    }
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setAcceptConfirmationOpen(false);
  };

  const columns = [
    { field: 'nom', headerName: 'Nom', width: 100 },
    { field: 'prenom', headerName: 'Prénom', width: 100 },
    { field: 'email', headerName: 'Email', width: 100 },
    { field: 'titre', headerName: 'Titre', width: 100 },
    { field: 'descriptif', headerName: 'Descriptif', width: 100 },
    { field: 'ideeProjet', headerName: 'Idée Projet', width: 100 },
    { field: 'lien', headerName: 'Lien', width: 100 },
    { field: 'membres', headerName: 'Membres', width: 100 },
    { field: 'confirm', headerName: 'Confirmation', width: 100 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          {params.row.confirm ? (
            <Button onClick={() => handleRejectClick(params.row.id)} variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }}>Refuser</Button>
          ) : (
            <>
              <Button onClick={() => handleAcceptClick(params.row)} variant="contained" style={{ backgroundColor: 'green', color: 'white', width: '100px' }}>Accepter</Button>
              <Button onClick={() => handleRejectClick(params.row.id)} variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }}>Refuser</Button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <div style={{ marginLeft: "180px", fontSize: "32px" }}>Liste des créathons</div>
      <div style={{ height: 400, width: '100%', marginLeft: '10%', marginTop: "5%" }}>
        <DataGrid
          rows={candidatures}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id} // Specify the unique id property for each row
        />
        <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>Êtes-vous sûr de vouloir refuser cette candidature ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose} color="primary">Non</Button>
            <Button onClick={handleRejectConfirm} color="secondary">Oui</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={acceptConfirmationOpen} onClose={handleConfirmationClose}>
          <DialogTitle>Détails du Créathon</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedCandidature && (
                <>
                  <p><strong>Nom:</strong> {selectedCandidature.nom}</p>
                  <p><strong>Prénom:</strong> {selectedCandidature.prenom}</p>
                  <p><strong>Email:</strong> {selectedCandidature.email}</p>
                  <p><strong>Titre:</strong> {selectedCandidature.titre}</p>
                  <p><strong>Descriptif:</strong> {selectedCandidature.descriptif}</p>
                  <p><strong>Idée Projet:</strong> {selectedCandidature.ideeProjet}</p>
                  <p><strong>Lien:</strong> {selectedCandidature.lien}</p>
                  <p><strong>Membres:</strong> {selectedCandidature.membres}</p>
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose} color="primary">Annuler</Button>
            <Button onClick={handleAcceptConfirm} color="secondary">Confirmer</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CandidaturesCreathon;
