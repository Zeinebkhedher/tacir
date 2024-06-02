import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./listProjects.css";
import { jwtDecode } from "jwt-decode";
import EvaluateProject from "./EvaluateProject";
const ListeProjects = () => {
  const [projects, setProjects] = useState([]);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    // Fetch projects when the component mounts
    fetchProjects();

    // Decode JWT token to get user role
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      console.log("Decoded Token:", decodedToken);
      console.log("Decoded Token role:", decodedToken.role);

      setUserRole(decodedToken.role);
      console.log("userRole", userRole);
    }
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
      <div className="evaluateContent">
        <EvaluateProject />
      </div>
      <div className="CONTAINER">
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
    </>
  );
};

export default ListeProjects;
