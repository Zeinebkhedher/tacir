import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AfficheEvaluation.css";

const AfficherEvaluation = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchEvaluations = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          throw new Error("User not authenticated");
        }

        // Fetch evaluations from the API
        const response = await axios.get(
          "http://localhost:8000/api/projects/evaluations",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        setEvaluations(response.data);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error fetching evaluations");
        console.error("Error fetching evaluations:", error.message);
      }
    };

    fetchEvaluations();
  }, []);

  return (
    <div className="containerEvaluation">
      <h2>Evaluations</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Evaluator Lastname</th>
            <th>Evaluator Firstname</th>
            <th>Owner Lastname</th>
            <th>Owner Firstname</th>
            <th>Project Name</th>
            <th>Project Description</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation._id}>
              {new Date(evaluation.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}{" "}
              {new Date(evaluation.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
              <td>{evaluation.evaluatorId.nom}</td>
              <td>{evaluation.evaluatorId.prenom}</td>
              <td>{evaluation.owner.nom}</td>
              <td>{evaluation.owner.prenom}</td>
              <td>{evaluation.projectId.titre}</td>
              <td>{evaluation.projectId.description}</td>
              <td>{evaluation.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AfficherEvaluation;
