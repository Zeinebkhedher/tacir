import React, { useState, useEffect } from "react";
import "./listeprojects.css";

const CreaProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        let url = "http://localhost:8000/api/projects/crea";

        // Append region filter if selected
        const params = new URLSearchParams(window.location.search);
        const regionParam = params.get("region");
        if (regionParam) {
          url += `?region=${regionParam}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error fetching CREA projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="containerProjet">
      <h2>CREA Projects</h2>
      {error && <div className="error">{error}</div>}
      <div className="region-filter">
        <label htmlFor="region">Filter by Region:</label>
        <select
          id="region"
          onChange={(e) => {
            const selectedRegion = e.target.value;
            const params = new URLSearchParams(window.location.search);
            params.set("region", selectedRegion);
            window.location.search = params.toString();
          }}
        >
          <option value="">All Regions</option>
          <option value="TUNIS">Tunis</option>
          <option value="KEF">Kef</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nom du Projet</th>
            <th>Owner</th>
            <th>Other Members</th>
            <th>Description</th>
            <th>Region</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.titre}</td>
              <td>
                {project.owner.nom} {project.owner.prenom} <br />
                {project.owner.email}
              </td>
              <td>
                {project.members.map((member) => (
                  <div key={member.email}>{member.FullName}</div>
                ))}
              </td>
              <td>{project.description}</td>
              <td>{project.region}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CreaProjects;
