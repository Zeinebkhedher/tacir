import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useState } from "react";
import "./candidatureCreathon.css";

const CandidaturesCreathon = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [acceptConfirmationOpen, setAcceptConfirmationOpen] = useState(false);
  const [candidatureIdToUpdate, setCandidatureIdToUpdate] = useState(null);
  const [selectedCandidature, setSelectedCandidature] = useState(null);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);
  const [showConfirmed, setShowConfirmed] = useState(false);
  const [confirmedCandidatures, setConfirmedCandidatures] = useState([]);
  const [rejectedCandidatures, setRejectedCandidatures] = useState([]);
  const [acceptedCandidatures, setAcceptedCandidatures] = useState([]);

 /* useEffect(() => {
    fetchAllCandidatures();
  }, [fetchAllCandidatures]);*/

  const fetchAllCandidatures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/candidatureCreathon/"
      );
      if (response.status === 200) {
        const dataWithDetails = await addCreathonDetails(response.data);
        setCandidatures(dataWithDetails);
      }
    } catch (error) {
      console.error("Error fetching candidatures:", error.message);
    }
  };

  const addCreathonDetails = async (candidatures) => {
    return Promise.all(
      candidatures.map(async (candidature) => {
        try {
          const creathonResponse = await axios.get(
            `http://localhost:8000/api/creathons/details/${candidature.creathon}`
          );
          if (creathonResponse.status === 200) {
            return {
              ...candidature,
              id: candidature._id,
              creathonTitle: creathonResponse.data.titre,
              dateDebut: creathonResponse.data.dateDebut,
              dateFin: creathonResponse.data.dateFin,
              lieu: creathonResponse.data.lieu,
            };
          } else {
            throw new Error("Error fetching creathon details");
          }
        } catch (error) {
          console.error("Error fetching creathon details:", error.message);
          return null;
        }
      })
    ).then((data) => data.filter((candidature) => candidature !== null));
  };

  const fetchConfirmedCandidatures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/candidatureCreathon/confirmed"
      );
      if (response.status === 200) {
        const dataWithDetails = await addCreathonDetails(response.data);
        setConfirmedCandidatures(dataWithDetails);
      }
    } catch (error) {
      console.error("Error fetching confirmed candidatures:", error.message);
    }
  };

  const fetchRejectedCandidatures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/candidatureCreathon/rejected"
      );
      if (response.status === 200) {
        const dataWithDetails = await addCreathonDetails(response.data);
        setRejectedCandidatures(dataWithDetails);
      }
    } catch (error) {
      console.error("Error fetching rejected candidatures:", error.message);
    }
  };
  const handleRejectConfirm = async () => {
    try {
      // Envoi d'une demande pour envoyer l'email de refus au backend
      const emailResponse = await axios.patch(
        `http://localhost:8000/api/candidatureCreathon/sendRejectionEmail/${candidatureIdToUpdate}`
      );
      if (emailResponse.status === 200) {
        console.log("Email de refus envoyé avec succès");
        setConfirmationOpen(false);
      } else {
        console.error("Erreur lors de l'envoi de l'email de refus");
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'envoi de l'email de refus :",
        error.message
      );
    }
  };

  const fetchAcceptedCandidatures = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/candidatureCreathon/accepted"
      );
      if (response.status === 200) {
        const dataWithDetails = await addCreathonDetails(response.data);
        setAcceptedCandidatures(dataWithDetails);
      }
    } catch (error) {
      console.error("Error fetching accepted candidatures:", error.message);
    }
  };

  const handleAcceptClick = (candidature) => {
    setCandidatureIdToUpdate(candidature.id);
    setSelectedCandidature(candidature);
    setAcceptConfirmationOpen(true);
  };

  const handleAcceptConfirm = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/candidatureCreathon/acceptatCandidature/${candidatureIdToUpdate}`,
        { confirm: true }
      );
      if (response.status === 200) {
        const updatedCandidatures = candidatures.map((candidature) => {
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

  const handleRejectClick = (id) => {
    setCandidatureIdToUpdate(id);
    setConfirmationOpen(true);
  };

  /*const handleShowAccepted = () => {
    fetchAcceptedCandidatures();
    setShowAccepted(true);
    setShowRejected(false);
    setShowConfirmed(false);
  };*/

  const handleShowRejected = () => {
    fetchRejectedCandidatures();
    setShowAccepted(false);
    setShowRejected(true);
    setShowConfirmed(false);
  };

  const handleShowAll = () => {
    fetchAllCandidatures();
    setShowAccepted(false);
    setShowRejected(false);
    setShowConfirmed(false);
  };

  const handleShowConfirmed = () => {
    fetchConfirmedCandidatures();
    setShowAccepted(false);
    setShowRejected(false);
    setShowConfirmed(true);
  };

  const columns = [
    { field: "nom", headerName: "Nom", width: 70 },
    { field: "prenom", headerName: "Prénom", width: 70 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "titre", headerName: "Titre", width: 80 },
    { field: "descriptif", headerName: "Descriptif", width: 80 },
    { field: "ideeProjet", headerName: "Idée Projet", width: 80 },
    { field: "lien", headerName: "Lien", width: 60 },
    { field: "membres", headerName: "Membres", width: 100 },
    { field: "confirm", headerName: "Confirmation", width: 50 },
    { field: "creathonTitle", headerName: "Titre Créathon", width: 150 }, // Ajout du titre du Créathon
    { field: "dateDebut", headerName: "Date Début", width: 100 }, // Ajout de la date de début du Créathon
    { field: "dateFin", headerName: "Date Fin", width: 100 }, // Ajout de la date de fin du Créathon
    { field: "lieu", headerName: "Lieu", width: 70 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "90%",
          }}
        >
          {params.row.confirm ? (
            <Button
              onClick={() => handleRejectClick(params.row.id)}
              variant="contained"
              style={{
                backgroundColor: "red",
                color: "white",
                width: "65px",
                fontSize: "10px",
              }}
            >
              Refuser
            </Button>
          ) : (
            <>
              <Button
                onClick={() => handleAcceptClick(params.row)}
                variant="contained"
                style={{
                  backgroundColor: "green",
                  color: "white",
                  width: "65px",
                  fontSize: "10px",
                }}
              >
                Accepter
              </Button>
              <Button
                onClick={() => handleRejectClick(params.row.id)}
                variant="contained"
                style={{
                  backgroundColor: "red",
                  color: "white",
                  width: "65px",
                  fontSize: "10px",
                }}
              >
                Refuser
              </Button>
            </>
          )}
        </div>
      ),
    },
  ];

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
    setAcceptConfirmationOpen(false);
  };

  return (
    <>
      <div style={{ marginLeft: "180px", fontSize: "32px" }}>
        Liste des créathons
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px" }}
      >
        <Button
          onClick={handleShowAll}
          variant="contained"
          style={{ marginRight: "10px" }}
        >
          Afficher Tout
        </Button>
        <Button
          onClick={handleShowConfirmed}
          variant="contained"
          style={{ marginRight: "10px", backgroundColor: "green" }}
        >
          Afficher Confirmés
        </Button>
        <Button
          onClick={handleShowRejected}
          variant="contained"
          style={{ backgroundColor: "red" }}
        >
          Afficher Rejetés
        </Button>
      </div>
      <div
        style={{
          height: 400,
          width: "90%",
          marginLeft: "15%",
          marginTop: "5%",
        }}
      >
        <DataGrid
          rows={
            showConfirmed
              ? confirmedCandidatures
              : showAccepted
              ? acceptedCandidatures
              : showRejected
              ? rejectedCandidatures
              : candidatures
          }
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id} // Specify the unique id property for each row
        />
        <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Êtes-vous sûr de vouloir refuser cette candidature ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose} color="primary">
              Non
            </Button>
            <Button onClick={handleRejectConfirm} color="secondary">
              Oui
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={acceptConfirmationOpen} onClose={handleConfirmationClose}>
          <DialogTitle>Détails du Créathon</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {selectedCandidature && (
                <>
                  <p>
                    <strong>Nom:</strong> {selectedCandidature.nom}
                  </p>
                  <p>
                    <strong>Prénom:</strong> {selectedCandidature.prenom}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedCandidature.email}
                  </p>
                  <p>
                    <strong>Titre:</strong> {selectedCandidature.titre}
                  </p>
                  <p>
                    <strong>Descriptif:</strong>{" "}
                    {selectedCandidature.descriptif}
                  </p>
                  <p>
                    <strong>Idée Projet:</strong>{" "}
                    {selectedCandidature.ideeProjet}
                  </p>
                  <p>
                    <strong>Lien:</strong> {selectedCandidature.lien}
                  </p>
                  <p>
                    <strong>Membres:</strong> {selectedCandidature.membres}
                  </p>
                </>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmationClose} color="primary">
              Annuler
            </Button>
            <Button
              onClick={handleAcceptConfirm}
              variant="contained"
              style={{
                backgroundColor: "green",
                color: "white",
                width: "100px",
              }}
            >
              Accepter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default CandidaturesCreathon;
