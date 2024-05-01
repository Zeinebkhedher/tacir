import React, { useState, useEffect } from "react";
import "./AddProject.css";

const AddProject = () => {
  const [formData, setFormData] = useState({
    members: [],
    Dateprojet: "",
    titre: "",
    description: "",
    region: "",
    comments: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [storedToken, setStoredToken] = useState("");
  useEffect(() => {
    const storedTokenValue = localStorage.getItem("token");

    if (storedTokenValue && storedTokenValue !== "null") {
      setStoredToken(storedTokenValue);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, { FullName: "", age: "" }],
    });
  };

  const handleMemberChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMembers = [...formData.members];
    updatedMembers[index][name] = value;
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get the stored token from localStorage
      const storedToken = localStorage.getItem("token");

      if (!storedToken) {
        throw new Error("Token not found");
      }

      // Decode the token to extract the owner's ID
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      const ownerId = decodedToken.membreId;

      const formDataWithOwner = {
        ...formData,
        ownerId: ownerId,
      };

      const response = await fetch("http://localhost:8000/api/projects/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(formDataWithOwner),
      });

      if (!response.ok) {
        throw new Error("Error adding project");
      }

      setFormData({
        members: [],
        Dateprojet: "",
        titre: "",
        description: "",
        region: "",
        comments: "",
      });

      setSuccessMessage("Project added successfully");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error adding project");
      setSuccessMessage("");
      console.error("Error adding project:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>Ajouter Projet</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="members">Members:</label>
          {formData.members.map((member, index) => (
            <div key={index}>
              <input
                type="text"
                name="FullName"
                value={member.FullName}
                placeholder="Full Name"
                onChange={(e) => handleMemberChange(index, e)}
              />
              <input
                type="number"
                name="age"
                value={member.age}
                placeholder="Age"
                onChange={(e) => handleMemberChange(index, e)}
              />
            </div>
          ))}
          <button type="button" className="add-member-btn" onClick={addMember}>
            Add Member
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="Dateprojet">Date projet:</label>
          <input
            type="date"
            name="Dateprojet"
            value={formData.Dateprojet}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="titre">Titre:</label>
          <input
            type="text"
            name="titre"
            value={formData.titre}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="region">Region:</label>
          <select name="region" value={formData.region} onChange={handleChange}>
            <option value="">Select Region</option>
            <option value="TUNIS">Tunis</option>
            <option value="KEF">Kef</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <input
            type="text"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Project</button>
      </form>
    </div>
  );
};

export default AddProject;
