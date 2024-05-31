import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from "react";
import "./creathonList.css";

const CreathonList = () => {
  const [creathons, setCreathons] = useState([]);
  const [filteredCreathons, setFilteredCreathons] = useState([]);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [creathonIdToUpdate, setCreathonIdToUpdate] = useState(null);
  const [creathonTitleToUpdate, setCreathonTitleToUpdate] = useState(null);

  useEffect(() => {
    const fetchCreathons = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/creathons/creathonsListe");
        if (!response.ok) {
          throw new Error("Échec de la récupération des créathons");
        }
        const data = await response.json();

        // Traitement des données ici
        const formattedCreathons = data.creathons.map(creathon => ({
          id: creathon._id,
          status: creathon.status,
          dateDebut: formatDate(creathon.dateDebut),
          dateFin: formatDate(creathon.dateFin),
          lieu: creathon.lieu,
          affiche: creathon.affiche,
          titre: creathon.titre,
          rowClass: getRowClass(creathon.dateDebut, creathon.dateFin, creathon.status)
        }));

        setCreathons(formattedCreathons);
        setFilteredCreathons(formattedCreathons);
      } catch (error) {
        console.error("Erreur lors de la récupération des créathons :", error.message);
      }
    };

    fetchCreathons();
  }, []);

  // Fonction pour formater la date
  function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('fr-FR', options);
  }

  // Fonction pour déterminer la classe CSS du row
  function getRowClass(dateDebut, dateFin, status) {
    const now = new Date();
    const debut = new Date(dateDebut);
    const fin = new Date(dateFin);

    if ((debut < now && fin < now) || status === "fini") {
      return "row-disabled";
    } else if (debut < now) {
      return "row-active";
    } else {
      return "";
    }
  }

  const handleAnnuler = (id) => {
    setCreathonIdToUpdate(id);
    setConfirmationOpen(true);
  };

  const handleFini = (id, titre) => {
    setCreathonIdToUpdate(id);
    setCreathonTitleToUpdate(titre);
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleConfirmationYes = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/creathons/${creathonIdToUpdate}/updateStatus`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newStatus: "fini" }),
      });
      if (!response.ok) {
        throw new Error("Failed to mark Creathon as finished");
      }
      const updatedCreathons = creathons.map((creathon) => {
        if (creathon.id === creathonIdToUpdate) {
          return { ...creathon, status: "fini" };
        }
        return creathon;
      });
      setCreathons(updatedCreathons);
      setFilteredCreathons(updatedCreathons);
    } catch (error) {
      console.error("Error marking Creathon as finished:", error.message);
    } finally {
      setConfirmationOpen(false);
    }
  };

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredCreathons(creathons);
    } else {
      const filtered = creathons.filter((creathon) => creathon.status === status);
      setFilteredCreathons(filtered);
    }
  };

  const columns = [
    { field: 'status', headerName: 'Statut', width: 100 },
    { field: 'dateDebut', headerName: 'Date Début', width: 150 },
    { field: 'dateFin', headerName: 'Date Fin', width: 150 },
    { field: 'lieu', headerName: 'Lieu', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => (
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          {params.row && params.row.status !== 'fini' && (
            <>
              <Button onClick={() => handleFini(params.row.id, params.row.titre)} variant="contained" style={{ backgroundColor: 'green', color: 'white', width: '100px' }}>Fini</Button>
              <Button onClick={() => handleAnnuler(params.row.id)} variant="contained" style={{ backgroundColor: 'red', color: 'white', width: '100px' }}>Annuler</Button>
            </>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="containerFormation">
      <h2>All Creathons</h2>
      <div className="filter-buttons">
        <Button onClick={() => handleFilter("all")}>Tous</Button>
        <Button onClick={() => handleFilter("en cours")}>En Cours</Button>
        <Button onClick={() => handleFilter("fini")}>Fini</Button>
      </div>
      <div style={{ height: 400, width: '150%' }}>
        <DataGrid
          rows={filteredCreathons}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          getRowId={(row) => row.id} // Specify the unique id property for each row
          getRowClassName={(params) => params.row.rowClass}
        />
      </div>
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>Êtes-vous sûr de vouloir marquer le Creathon "{creathonTitleToUpdate}" comme "Fini" ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose} style={{ backgroundColor: "red", borderRadius: "23px" }}>Annuler</Button>
          <Button onClick={handleConfirmationYes} autoFocus style={{ borderRadius: "23px", backgroundColor: "green" }}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CreathonList;
