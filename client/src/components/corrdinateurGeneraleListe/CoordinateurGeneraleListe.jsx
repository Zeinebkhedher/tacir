import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
//import "./candidatureList.css";

const CoordinateurGeneraleListe = () => {
  const [allCandidatures, setAllCandidatures] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedCandidature, setSelectedCandidature] = useState(null);

  const fetchCandidatures = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/membres/getAllMembers?role=coordinateurGeneral");
      console.log(res.data); // Log pour vérifier la structure de la réponse
      if (res.data && res.data.model) {
        setAllCandidatures(res.data.model);
      } else {
        setError("Données invalides reçues de l'API");
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des candidatures", error);
      setError(error.response?.data?.error || "Erreur de serveur");
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const handleViewProfile = (candidature) => {
    setSelectedCandidature(candidature);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCandidature(null);
  };

  const userColumns = [
    { field: "nom", headerName: "Nom", width: 100 },
    { field: "prenom", headerName: "Prenom", width: 100 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "sexe", headerName: "Sexe", width: 80 },
    { field: "CIN", headerName: "CIN", width: 100 },
    { field: "telephone", headerName: "Téléphone", width: 100 },
    { field: "nationalite", headerName: "Nationalite", width: 100 },
    { field: "region", headerName: "Région", width: 100 },
    { field: "dateNaissance", headerName: "DateN", width: 100 },
    { field: "situationPerso", headerName: "SituationPerso", width: 100 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="cellActiondash" style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="small"
              onClick={() => handleViewProfile(params.row)}
            >
              View
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ marginLeft: "180px", fontSize: "32px" }}>Liste de porteur de projet</div>
      <div style={{ height: 400, width: '100%', marginLeft: '10%', marginTop: "5%" }}>
        {error && <div className="error">{error}</div>}
        <DataGrid
          style={{ background: "white" }}
          className="datagrid"
          rows={allCandidatures}
          getRowId={(row) => row._id}
          columns={userColumns.concat(actionColumn)}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection={false}
          disableSelectionOnClick
        />
      </div>
      {selectedCandidature && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="candidature-dialog-title">
          <DialogTitle id="candidature-dialog-title">Détails de la Candidature</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div><strong>ID:</strong> {selectedCandidature._id}</div>
              <div><strong>Nom:</strong> {selectedCandidature.nom}</div>
              <div><strong>Prénom:</strong> {selectedCandidature.prenom}</div>
              <div><strong>Email:</strong> {selectedCandidature.email}</div>
              <div><strong>Sexe:</strong> {selectedCandidature.sexe}</div>
              <div><strong>CIN:</strong> {selectedCandidature.cin}</div>
              <div><strong>Téléphone:</strong> {selectedCandidature.telephone}</div>
              <div><strong>Nationalité:</strong> {selectedCandidature.nationalite}</div>
              <div><strong>Date de naissance:</strong> {selectedCandidature.dateNaissance}</div>
              <div><strong>Situation personnelle:</strong> {selectedCandidature.situtionPerso}</div>
              <div><strong>Région:</strong> {selectedCandidature.region}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Fermer
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default CoordinateurGeneraleListe;
