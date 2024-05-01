import React, { useState, useEffect } from "react";
import axios from "axios";

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

        // Decode the token to extract the user ID
        const decodedToken = parseToken(storedToken);
        const userId = decodedToken.membreId;

        // Fetch evaluations from the API
        const response = await axios.get(
          "http://localhost:8000/api/projects/evaluations",
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );
        // Filter evaluations based on ownership
        const filteredEvaluations = response.data.filter(
          (evaluation) => evaluation.projectId.owner === userId
        );

        setEvaluations(filteredEvaluations);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage("Error fetching evaluations");
        console.error("Error fetching evaluations:", error.message);
      }
    };

    fetchEvaluations();
  }, []);

  // Function to parse JWT token
  const parseToken = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const decodedToken = JSON.parse(atob(base64));
      return decodedToken;
    } catch (error) {
      console.error("Error parsing token:", error.message);
      return {};
    }
  };

  return (
    <div className="container">
      <h2>Evaluations</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation._id}>
              <td>{evaluation.projectId.titre}</td>
              <td>{evaluation.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AfficherEvaluation;
