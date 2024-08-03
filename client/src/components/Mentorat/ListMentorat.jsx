import React, { useState, useEffect } from "react";
import axios from "axios";
import "./listMentorat.css"
const ListMentorat = () => {
  const [mentorats, setMentorats] = useState([]);
  const [region, setRegion] = useState("TUNIS");
  const [error, setError] = useState(null);

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
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Date Debut</th>
              <th>Date Fin</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {mentorats.map((mentorat) => (
              <tr key={mentorat._id}>
                <td>{mentorat.titre}</td>
                <td>{new Date(mentorat.dateDebut).toLocaleDateString()}</td>
                <td>{new Date(mentorat.dateFin).toLocaleDateString()}</td>
                <td>{mentorat.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListMentorat;
