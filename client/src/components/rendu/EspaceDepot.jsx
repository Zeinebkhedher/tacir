import React, { useState } from "react";
import axios from "axios";
import "./EspaceRendu.css";
const EspaceDepot = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/rendus/rendu",
        {
          titre,
          description,
          expirationDate,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      alert("Space created successfully!");
    } catch (error) {
      console.error("Error creating space:", error);
      alert("Failed to create space");
    }
  };

  return (
    <div className="content">
      <h2>Create Space for Project Uploads</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Titre:</label>
          <input
            type="text"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Expiration Date:</label>
          <input
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Space</button>
      </form>
    </div>
  );
};

export default EspaceDepot;
