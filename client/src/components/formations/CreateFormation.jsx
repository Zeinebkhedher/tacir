import React, { useState } from "react";
import axios from "axios";

const CreateFormation = () => {
  const [formationData, setFormationData] = useState({
    Name: "",
    formateur: {
      FirstName: "",
      LastName: "",
      informations: "",
    },
    Date: "",
    description: "",
    startHour: "",
    FinishHour: "",
    status: "Upcoming", // Default value
    region: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("formateur.")) {
      const key = name.split(".")[1];
      setFormationData({
        ...formationData,
        formateur: { ...formationData.formateur, [key]: value },
      });
    } else {
      setFormationData({ ...formationData, [name]: value });
    }
  };

  const calculateStatus = (dateString) => {
    const today = new Date();
    const formationDate = new Date(dateString);
    return formationDate < today ? "Past" : "Upcoming";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStatus = calculateStatus(formationData.Date);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/formations/", // Adjust URL if needed
        {
          ...formationData,
          status: updatedStatus,
          formateur: [formationData.formateur], // Ensure formateur is an array
        }
      );
      setSuccessMessage("Formation created successfully.");
      setErrorMessage("");
      console.log("Formation created:", response.data);
      // Reset form data after successful creation
      setFormationData({
        Name: "",
        formateur: {
          FirstName: "",
          LastName: "",
          informations: "",
        },
        Date: "",
        description: "",
        startHour: "",
        FinishHour: "",
        status: "Upcoming",
        region: "",
      });
    } catch (error) {
      setSuccessMessage("");
      setErrorMessage("Failed to create formation. Please try again.");
      console.error("Error creating formation:", error.message);
    }
  };

  return (
    <div className="content">
      <h2>Create Formation</h2>
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Formation Name:
          <input
            type="text"
            name="Name"
            value={formationData.Name}
            onChange={handleChange}
            placeholder="Formation Name"
            required
          />
        </label>
        <label>
          Formateur First Name:
          <input
            type="text"
            name="formateur.FirstName"
            value={formationData.formateur.FirstName}
            onChange={handleChange}
            placeholder="Formateur First Name"
            required
          />
        </label>
        <label>
          Formateur Last Name:
          <input
            type="text"
            name="formateur.LastName"
            value={formationData.formateur.LastName}
            onChange={handleChange}
            placeholder="Formateur Last Name"
            required
          />
        </label>
        <label>
          Informations:
          <input
            type="text"
            name="formateur.informations"
            value={formationData.formateur.informations}
            onChange={handleChange}
            placeholder="Informations"
            required
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            name="Date"
            value={formationData.Date}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            value={formationData.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </label>
        <label>
          Start Hour:
          <input
            type="text"
            name="startHour"
            value={formationData.startHour}
            onChange={handleChange}
            placeholder="Start Hour"
            required
          />
        </label>
        <label>
          Finish Hour:
          <input
            type="text"
            name="FinishHour"
            value={formationData.FinishHour}
            onChange={handleChange}
            placeholder="Finish Hour"
            required
          />
        </label>
        <label>
          Region:
          <select
            name="region"
            value={formationData.region}
            onChange={handleChange}
            required
          >
            <option value="">Select Region</option>
            <option value="TUNIS">Tunis</option>
            <option value="KEF">Kef</option>
          </select>
        </label>
        <button type="submit">Create Formation</button>
      </form>
    </div>
  );
};

export default CreateFormation;
