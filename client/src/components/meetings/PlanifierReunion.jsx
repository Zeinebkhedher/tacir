import React from "react";
import "./planifierReunion.css";
import { useState } from "react";
import axios from "axios";

const PlanifierReunion = () => {
  const [titre, setTitre] = useState("");
  const [date, setDate] = useState("");
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const [link, setLink] = useState("");
  const [destinataires, setDestinataires] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reunionData = {
      titre,
      date,
      heureDebut,
      heureFin,
      link,
      destinataires: destinataires.split(",").map((email) => email.trim()),
    };

    try {
      /*const response = await axios.post(
        "http://localhost:8000/api/reunions/add",
        reunionData
      );*/
      setSuccess("Reunion created successfully!");
      setError(null);
      // Clear form fields after submission
      setTitre("");
      setDate("");
      setHeureDebut("");
      setHeureFin("");
      setLink("");
      setDestinataires("");
    } catch (error) {
      setError("Error creating reunion. Please try again.");
      setSuccess("");
    }
  };

  return (
    <div className="ReunionContainer">
      <h2>Planifier une Réunion</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titre">Titre:</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="heureDebut">Heure de Début:</label>
          <input
            type="time"
            id="heureDebut"
            value={heureDebut}
            onChange={(e) => setHeureDebut(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="heureFin">Heure de Fin:</label>
          <input
            type="time"
            id="heureFin"
            value={heureFin}
            onChange={(e) => setHeureFin(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="link">Lien:</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="destinataires">
            Destinataires (emails, séparés par des virgules):
          </label>
          <input
            type="text"
            id="destinataires"
            value={destinataires}
            onChange={(e) => setDestinataires(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter Réunion</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default PlanifierReunion;

