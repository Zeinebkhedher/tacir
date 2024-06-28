import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MonProjet.css";

function MonProjet() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

      if (!token) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      // Decode the token to get the userId
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      const decodedToken = JSON.parse(jsonPayload);
      const userId = decodedToken.membreId;

      if (!userId) {
        setError("Invalid token");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/api/projects/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProject(response.data);
      } catch (error) {
        setError("Error fetching project data.");
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!project) {
    return <p>No project found.</p>;
  }

  return (
    <div className="content">
      <h2>Mon Projet</h2>
      <div className="project-container">
        <p>
          <strong>Nom du projet:</strong> {project.titre}
        </p>
        <p>
          <strong>Nom et prenom:</strong> {project.owner.nom}{" "}
          {project.owner.prenom}
        </p>
        <p>
          <strong>Email:</strong> {project.owner.email}
        </p>
        <p>
          <strong>Telephone:</strong> {project.owner.telephone}
        </p>
        <h3>Members:</h3>
        <ul>
          {project.members.map((member, index) => (
            <li key={index}>
              <strong>Full Name:</strong> {member.FullName} <br />
              <strong>Age:</strong> {member.age}
            </li>
          ))}
        </ul>
        <p>
          <strong>Titre du projet:</strong> {project.titre}
        </p>
        <p>
          <strong>Description du projet:</strong> {project.description}
        </p>
      </div>
    </div>
  );
}

export default MonProjet;
