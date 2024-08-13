import React, { useState, useEffect } from "react";
import axios from "axios";
import "./deposerRendu.css";
import Rendus from "./Rendus";

const DeposerRendu = () => {
  const [selectedRenduId, setSelectedRenduId] = useState("");
  const [rendus, setRendus] = useState([]);
  const [file, setFile] = useState(null);
  const [selectedRendu, setSelectedRendu] = useState(null);

  useEffect(() => {
    const fetchRendus = async () => {
      try {
        // Fetch rendus for the logged-in user
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8000/api/rendus/forUser", 
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRendus(response.data);
      } catch (error) {
        console.error("Error fetching rendus:", error);
      }
    };
    fetchRendus();
  }, []);

  useEffect(() => {
    if (selectedRenduId) {
      const selected = rendus.find((rendu) => rendu._id === selectedRenduId);
      setSelectedRendu(selected);
    }
  }, [selectedRenduId, rendus]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedRenduId) {
        alert("Please select a rendu first");
        return;
      }

      if (!file) {
        alert("Please choose a file to upload");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      await axios.post(
        `http://localhost:8000/api/rendus/rendu/${selectedRenduId}/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file");
    }
  };

  const isUploadDisabled =
    selectedRendu && new Date(selectedRendu.expirationDate) < new Date();

  return (
    <>
      <div className="contenuRendu">
        <Rendus />
      </div>
      <div className="content">
        <h2>Upload File for Rendu</h2>
        <select
          value={selectedRenduId}
          onChange={(e) => setSelectedRenduId(e.target.value)}
        >
          <option value="">Select a Rendu</option>
          {rendus.map((rendu) => {
            const isExpired = new Date(rendu.expirationDate) < new Date();
            return (
              <option
                key={rendu._id}
                value={rendu._id}
                style={{
                  backgroundColor: isExpired ? "#d3d3d3" : "transparent",
                }}
              >
                {rendu.titre}
              </option>
            );
          })}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload} disabled={isUploadDisabled}>
          Upload File
        </button>
        {isUploadDisabled && (
          <p className="error">
            This rendu has expired. You cannot upload files.
          </p>
        )}
      </div>
    </>
  );
};

export default DeposerRendu;
