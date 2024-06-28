import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./sinscrireFormation.css";

function SinscrireFormation() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { formationId } = useParams();

  console.log("Formation ID:", formationId);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const participantData = { fullName, email };
    console.log(participantData);

    try {
      // Make a POST request to your backend API to update the formation
      const response = await fetch(
        `http://localhost:8000/api/formations/${formationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add participant to the formation");
      }

      // Reset form fields
      setFullName("");
      setEmail("");
      setSuccessMessage("Participant added successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage("Failed to add participant to the formation");
      setSuccessMessage("");
    }
  };

  return (
    <div className="containerInscription">
      <h2>Inscription à la Formation</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Nom complet:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Adresse Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email"
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
}

export default SinscrireFormation;
