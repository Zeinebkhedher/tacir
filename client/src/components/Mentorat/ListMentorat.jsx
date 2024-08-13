import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "./listMentorat.css"
import { useNavigate } from 'react-router-dom';

const ListMentorat = () => {
  const [mentorats, setMentorats] = useState([]);
  const [region, setRegion] = useState("TUNIS");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mentorats/byRegion",
          {
            params: { region },
          }
        );
        setMentorats(response.data.data);
      } catch (error) {
        console.error("Error fetching mentorats:", error);
        setError(
          "Failed to fetch mentorats. Please check the server and try again."
        );
      }
    };

    fetchMentorats();
  }, [region]);

  const handleViewOutputs = (mentoratId) => {
    if (mentoratId) {
      console.log("ID du créathon:", mentoratId);
      navigate(`/dashboard/coordinateurComposante/mentorats/${mentoratId}/mentoratOutputs`);
    } else {
      console.error('ID du créathon manquant');
    }    console.log(`View outputs for mentorat ID: ${mentoratId}`);
  };

  const columns = [
    { field: "titre", headerName: "Titre", width: 200 },
    { field: "dateDebut", headerName: "Date Debut", width: 150 },
    { field: "dateFin", headerName: "Date Fin", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewOutputs(params.row.id)}
        >
          View Outputs
        </Button>
      ),
    },
  ];

  const rows = mentorats.map((mentorat, index) => ({
    id: mentorat._id,
    titre: mentorat.titre,
    dateDebut: new Date(mentorat.dateDebut).toLocaleDateString(),
    dateFin: new Date(mentorat.dateFin).toLocaleDateString(),
    description: mentorat.description,
  }));

  return (
    <div className="mentorat">
      <h2>List of Mentorat</h2>
      <div>
        <label htmlFor="region">Select Region:</label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="TUNIS">Tunis</option>
          <option value="KEF">Kef</option>
        </select>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {mentorats.length === 0 ? (
        <p>No mentorats found for the selected region.</p>
      ) : (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} />
        </div>
      )}
    </div>
  );
};

export default ListMentorat;
