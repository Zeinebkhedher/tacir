import React, { useState } from "react";
import axios from "axios"; // Assuming you're using axios for HTTP requests

const CreateFormation = () => {
  const [formationData, setFormationData] = useState({
    Name: "",
    FirstName: "",
    LastName: "",
    informations: "",
    Date: "",
    description: "",
    startHour: "",
    FinishHour: "",
    status: "Upcoming", // Assuming default status is "Upcoming"
    region: "TUNIS", // Assuming default region is "TUNIS"
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormationData({ ...formationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/formations/",
        formationData
      ); // Adjust the URL if needed
      setSuccessMessage("Formation created successfully.");
      setErrorMessage("");
      console.log("Formation created:", response.data);
      // Reset form data after successful creation
      setFormationData({
        Name: "",
        FirstName: "",
        LastName: "",
        informations: "",
        Date: "",
        description: "",
        startHour: "",
        FinishHour: "",
        status: "Upcoming",
        region: "TUNIS",
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
            name="FirstName"
            value={formationData.FirstName}
            onChange={handleChange}
            placeholder="Formateur First Name"
            required
          />
        </label>
        <label>
          Formateur Last Name:
          <input
            type="text"
            name="LastName"
            value={formationData.LastName}
            onChange={handleChange}
            placeholder="Formateur Last Name"
            required
          />
        </label>
        <label>
          Informations:
          <input
            type="text"
            name="informations"
            value={formationData.informations}
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
        <button type="submit">Create Formation</button>
      </form>
    </div>
  );
};

export default CreateFormation;
