import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListeRendu.css";

const ListeRendu = () => {
  const [rendus, setRendus] = useState([]);
  const [region, setRegion] = useState("TUNIS"); // Default region
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRendus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/rendus/byRegion",
          {
            params: { region },
          }
        );
        setRendus(response.data.data);
      } catch (error) {
        console.error("Error fetching rendus:", error);
        setError(
          "Failed to fetch rendus. Please check the server and try again."
        );
      }
    };
    fetchRendus();
  }, [region]); // Fetch data when region changes

  const downloadFile = async (filePath, filename) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/rendus/files/${encodeURIComponent(
          filePath
        )}`,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className="content">
      <h2>Rendus</h2>
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
      <div className="rendu-container">
        {rendus.length === 0 ? (
          <p>No rendus found for the selected region.</p>
        ) : (
          rendus.map((rendu, index) => (
            <div
              key={rendu._id}
              className={`rendu-card ${index % 2 === 0 ? "even" : "odd"}`}
            >
              <h3>{rendu.titre}</h3>
              <p className="description">Description: {rendu.description}</p>
              <p className="expiration">
                Expiration Date: {formatDate(rendu.expirationDate)}
              </p>
              <h4>Files:</h4>
              <ul>
                {rendu.files.map((file, index) => (
                  <li key={index}>
                    <button
                      onClick={() => downloadFile(file.path, file.filename)}
                    >
                      Download {file.filename}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ListeRendu;
