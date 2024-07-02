import React, { useState, useEffect } from "react";
import "./listeprojects.css";

const InovProjects = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [selectedRegion, setSelectedRegion] = useState(""); // State to hold selected region

 useEffect(() => {
   const fetchProjects = async () => {
     try {
       let url = "http://localhost:8000/api/projects/inov";

       // Append region filter if selected
       if (selectedRegion) {
         url += `?region=${selectedRegion}`;
       }

       const response = await fetch(url);
       if (!response.ok) {
         throw new Error("Error fetching INOV projects");
       }
       const data = await response.json();
       setProjects(data);
     } catch (error) {
       setError(error.message);
     }
   };

   fetchProjects();
 }, [selectedRegion]);


  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  return (
    <div className="containerProjet">
      <h2>INOV Projects</h2>
      {error && <div className="error">{error}</div>}
      <div className="region-filter">
        <label htmlFor="region">Filter by Region:</label>
        <select
          id="region"
          value={selectedRegion}
          onChange={handleRegionChange}
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

export default InovProjects;
