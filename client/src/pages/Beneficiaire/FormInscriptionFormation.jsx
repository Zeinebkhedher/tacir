import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./form.css";

const InscriptionForm = () => {
  const { formationId } = useParams();
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [prenom, setPrenom] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  console.log("Formation ID:", formationId); // Check the formationId

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const beneficiaireData = { nom, prenom, email };

      const response = await fetch(
        `http://localhost:8000/api/formations/beneficiaire/${formationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(beneficiaireData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add beneficiaire");
      }

      setSuccessMessage("Beneficiaire added successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(
        error.message || "Failed to add beneficiaire. Please try again later."
      );
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Inscription formation</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom complet:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="prenom">Prenom complet:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Adresse Email:</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default InscriptionForm;
