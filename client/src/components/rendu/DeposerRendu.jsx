import React, { useState, useEffect } from "react";
import axios from "axios";
import "./deposerRendu.css";
import Rendus from "./Rendus";

const DeposerRendu = () => {
  const [selectedRenduId, setSelectedRenduId] = useState("");
  const [rendus, setRendus] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchRendus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/rendus/rendus"
        );
        setRendus(response.data);
      } catch (error) {
        console.error("Error fetching rendus:", error);
      }
    };
    fetchRendus();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      if (!selectedRenduId) {
        alert("Please select a rendu first");
        return;
      }

      const formData = new FormData();
      formData.append("program", file);

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
          {rendus.map((rendu) => (
            <option key={rendu._id} value={rendu._id}>
              {rendu.titre}
            </option>
          ))}
        </select>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload File</button>
      </div>
    </>
  );
};

export default DeposerRendu;
