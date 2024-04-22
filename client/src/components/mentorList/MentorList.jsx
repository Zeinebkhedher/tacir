import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "@mui/material";
import "./mentorList.css";
import axios from "axios";

const MentorList = () => {
  const [allCandidates, setAllCandidates] = useState([]);
  const [error, setError] = useState(null);
  
  const PF = "http://localhost:5000/images/";

  const fetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/profile/getUser/66219a974863d986de0e65c9");
      console.log(response.data);
    } catch (error) {
      console.error("Une erreur s'est produite lors de la récupération de l'utilisateur :", error);
    }
  };
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

  const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "nom", headerName: "Nom", width: 100 },
    { field: "prenom", headerName: "Prenom", width: 100 },
    { field: "email", headerName: "Email", width: 100 },
    { field: "sexe", headerName: "Sexe", width: 80 },
    { field: "CIN", headerName: "CIN", width: 100 },
    
    { field: "telephone", headerName: "Tlph", width: 100 },
    { field: "nationalite", headerName: "Nationalite", width: 100 },
    { field: "dateNaissance", headerName: "DateN", width: 100 },
    { field: "situationPerso", headerName: "SituationPerso", width: 50 },
    { field: "confirm", headerName: "Confirm", type: "boolean", width: 50 },
  ];

  const actionColumn = [
    {
      field: "action",
      headerName: "Actions",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="cellActiondash" style={{ display: "flex" }}>
            <Link
              to={`/dashboard/profile/${params.row._id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButtondash" onClick={() => handleViewProfile(params.row._id)}>View</div>

            </Link>
          </div>
        );
      },
    },
  ];

  const handleViewProfile = (id) => {
    console.log(id);
  };

    return (
      <div style={{display:"flex", marginTop:"25%"}}>
         
      <div
        style={{
          marginLeft: "10px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          position: "absolute",
          top: "-50vh",
          right: "-77vh",
        }}
      >
        <div style={{ marginBottom: "50px" }}>Liste des mentors</div>

          <DataGrid
    style={{ background: "white"}}
    className="datagrid"
    rows={allCandidates}
    getRowId={(row) => row._id} // Utilisez la prop getRowId pour spécifier l'identifiant unique de chaque ligne
    columns={userColumns.concat(actionColumn)}
    pageSize={10}
    rowsPerPageOptions={[10]}
    checkboxSelection={false}
    disableSelection={true}
    disableRowSelectionOnClick
  />

        </div>
      </div>
    );
};

export default MentorList;
