import React, { useState } from "react";
import axios from "axios";

const EvaluateProject = () => {
  const [formData, setFormData] = useState({
    projectName: "", // Changed from projectId to projectName
    comment: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem("token");
      console.log("Stored Token:", storedToken);
      if (!storedToken) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post(
        "http://localhost:8000/api/projects/evaluate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.status !== 201) {
        throw new Error("Error evaluating project");
      }

      setFormData({
        projectName: "", // Reset projectName instead of projectId
        comment: "",
      });
      console.log("storedToken", storedToken);
      setSuccessMessage("Project evaluated successfully");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error evaluating project");
      setSuccessMessage("");
      console.error("Error evaluating project:", error.message);
    }
  };

  return (
    <div className="container">
      <h2>Evaluate Project</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="projectName">Project Name:</label>{" "}
          {/* Changed from projectId to projectName */}
          <input
            type="text"
            name="projectName"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EvaluateProject;
