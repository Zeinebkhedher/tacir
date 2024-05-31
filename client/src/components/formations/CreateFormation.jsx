import React, { useState } from "react";
import "./createFormation.css"
function CreateFormation() {
  const [formData, setFormData] = useState({
    Name: "",
    formateur: {
      FirstName: "",
      LastName: "",
      informations: "",
    },
    Date: "",
    startHour: "",
    FinishHour: "",
  });
 const [successMessage, setSuccessMessage] = useState("");
 const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("formateur.")) {
      const formateurKey = name.split(".")[1];
      setFormData({
        ...formData,
        formateur: {
          ...formData.formateur,
          [formateurKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/formations/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          setSuccessMessage("Formation créée avec succès !");
          setErrorMessage("");
          // Optionally, you can reset the form here
          setFormData({
            Name: "",
            formateur: {
              FirstName: "",
              LastName: "",
              informations: "",
            },
            Date: "",
            startHour: "",
            FinishHour: "",
          });
        } else {
          setSuccessMessage("");
          setErrorMessage("Erreur lors de la création de la formation.");
        }
      })
      .catch((error) => {
        console.error("Error creating formation:", error);
        setSuccessMessage("");
        setErrorMessage(
          "Une erreur s'est produite lors de la création de la formation."
        );
      });
  };

  return (
    <div className="container">
      <h2>Créer une formation</h2>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <label>
          Nom:
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
          />
        </label>
        <label>
          Prénom du formateur:
          <input
            type="text"
            name="formateur.FirstName"
            value={formData.formateur.FirstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Nom du formateur:
          <input
            type="text"
            name="formateur.LastName"
            value={formData.formateur.LastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Informations du formateur:
          <textarea
            name="formateur.informations"
            value={formData.formateur.informations}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Date:
          <input
            type="date"
            name="Date"
            value={formData.Date}
            onChange={handleChange}
          />
        </label>
        <label>
          Heure de début:
          <input
            type="text"
            name="startHour"
            value={formData.startHour}
            onChange={handleChange}
          />
        </label>
        <label>
          Heure de fin:
          <input
            type="text"
            name="FinishHour"
            value={formData.FinishHour}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Créer</button>
      </form>
    </div>
  );
}

export default CreateFormation;
