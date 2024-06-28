import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListeEvaluation.css"; // Import your CSS file for styling

function EvaluationList() {
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    // Fetch all evaluations from the backend API
    const fetchEvaluations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/projects/evaluations"
        );
        setEvaluations(response.data);
      } catch (error) {
        console.error("Error fetching evaluations:", error);
      }
    };

    fetchEvaluations();
  }, []);

  return (
    <div className="content">
      <h2>All Evaluations</h2>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Evaluator</th>
            <th>Owner</th>
            <th>Owner Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation._id}>
              <td>{evaluation.projectName}</td>
              <td>
                {evaluation.evaluatorId.nom}&nbsp;
                {evaluation.evaluatorId.prenom}
              </td>
              <td>
                {evaluation.owner.nom} &nbsp;
                {evaluation.owner.prenom}
              </td>
              <td>{evaluation.owner.email}</td>
              <td>{evaluation.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EvaluationList;
