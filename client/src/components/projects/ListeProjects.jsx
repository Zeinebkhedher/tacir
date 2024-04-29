import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./listProjects.css";

const ListeProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/projects/listeProjet"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    }
  };

  return (
    <>
    <div className="container">
      <h2>List of Projects</h2>

      <table className="project-table">
        <thead>
          <tr>
            <th className="table-header">Title</th>
            <th className="table-header">Description</th>
            <th className="table-header">Region</th>
            {/* Add more table headers for other project details */}
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td className="table-data">{project.titre}</td>
              <td className="table-data">{project.description}</td>
              <td className="table-data">{project.region}</td>
              {/* Add more table cells for other project details */}
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
     <Link
        to="/dashboard/porteurProjet/ListeProjets/addProject"
        className="add-project-btn"
      >
        Add Project
      </Link>
      </>
  );
};

export default ListeProjects;
