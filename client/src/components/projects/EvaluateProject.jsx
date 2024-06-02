import React, { useState, useEffect } from "react";
import axios from "axios";

const EvaluateProject = () => {
  const [formData, setFormData] = useState({
    projectName: "", // Change to projectName
    comment: "",
  });

  const [projects, setProjects] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/projects/listeProjet"
      );
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        throw new Error("User not authenticated");
      }

      const response = await axios.post(
        "http://localhost:8000/api/projects/evaluate",
        {
          projectName: formData.projectName, // Change to projectName
          comment: formData.comment,
        },
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
        projectName: "", // Reset projectName
        comment: "",
      });

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
          <label htmlFor="projectName">Select Project:</label>{" "}
          <select
            name="projectName" // Change to projectName
            value={formData.projectName}
            onChange={handleChange}
          >
            <option value="">Select a project</option>
            {projects.map((project) => (
              <option key={project._id} value={project.titre}>
                {project.titre}
              </option>
            ))}
          </select>
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
