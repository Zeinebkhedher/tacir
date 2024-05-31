import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./mentorList.css";

const MentorList = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  const fetchMentorMembers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/membres/getAllMembers", {
        params: {
          role: "Mentor",
        },
      });
      setAllCandidates(res.data.model);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  useEffect(() => {
    fetchMentorMembers();
  }, []);

  const handleViewProfile = (mentor) => {
    setSelectedMentor(mentor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedMentor(null);
  };

  const userColumns = [
    
    { field: "nom", headerName: "Nom", width: 100 },
    { field: "prenom", headerName: "Prenom", width: 100 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "sexe", headerName: "Sexe", width: 80 },
    { field: "CIN", headerName: "CIN", width: 100 },
    { field: "telephone", headerName: "Tlph", width: 100 },
    { field: "nationalite", headerName: "Nationalite", width: 100 },
    { field: "dateNaissance", headerName: "DateN", width: 100 },
    { field: "situationPerso", headerName: "SituationPerso", width: 100 },
    { field: "confirm", headerName: "Confirm", type: "boolean", width: 100 },
  ];
  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellActiondash" style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              backgroundColor="green"
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
     <div style={{ marginLeft: "180px", fontSize: "32px" }}>Liste des Mentors</div>
      <div style={{ height: 400, width: '100%', marginLeft: '10%', marginTop: "5%" }}>
        {error && <div className="error">{error}</div>}
        <DataGrid
         style={{ background: "white" }}
         className="datagrid"
         rows={allCandidates}
         getRowId={(row) => row._id}
         columns={userColumns.concat(actionColumn)}
         pageSize={10}
         rowsPerPageOptions={[10]}
         checkboxSelection={false}
         disableSelectionOnClick
        />
      </div>
      {selectedMentor && (
        <Dialog open={open} onClose={handleClose} aria-labelledby="mentor-dialog-title">
          <DialogTitle id="mentor-dialog-title">Mentor Details</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <div><strong>ID:</strong> {selectedMentor._id}</div>
              <div><strong>Nom:</strong> {selectedMentor.nom}</div>
              <div><strong>Prénom:</strong> {selectedMentor.prenom}</div>
              <div><strong>Email:</strong> {selectedMentor.email}</div>
              <div><strong>Sexe:</strong> {selectedMentor.sexe}</div>
              <div><strong>CIN:</strong> {selectedMentor.CIN}</div>
              <div><strong>Téléphone:</strong> {selectedMentor.telephone}</div>
              <div><strong>Nationalité:</strong> {selectedMentor.nationalite}</div>
              <div><strong>Date de Naissance:</strong> {selectedMentor.dateNaissance}</div>
              <div><strong>Situation Personnelle:</strong> {selectedMentor.situationPerso}</div>
              <div><strong>Confirmé:</strong> {selectedMentor.confirm ? "Yes" : "No"}</div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default MentorList;
