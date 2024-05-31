import React, { useState, useEffect } from "react";
import axios from "axios";

const EvaluationTable = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [filteredEvaluations, setFilteredEvaluations] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    fetchEvaluations();
  }, []);

  const fetchEvaluations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/projects/evaluations"
      );
      setEvaluations(response.data);
      setFilteredEvaluations(response.data); // Set filtered evaluations initially
    } catch (error) {
      console.error("Error fetching evaluations:", error.message);
      setErrorMessage("Error fetching evaluations");
    }
  };

  // Function to handle filtering
  const handleFilter = () => {
    const filtered = evaluations.filter((evaluation) =>
      evaluation.projectName.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredEvaluations(filtered);
  };

  // Function to handle input change
  const handleChange = (event) => {
    setFilterValue(event.target.value);
  };

  return (
    <div className="container">
      <h2>Evaluations</h2>
      {errorMessage && <div className="error">{errorMessage}</div>}
      <div>
        <label htmlFor="projectFilter">Filter by Project Name: </label>
        <input
          type="text"
          id="projectFilter"
          value={filterValue}
          onChange={handleChange}
        />
        <button onClick={handleFilter}>Filter</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Comment</th>
            <th>Evaluator</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvaluations.map((evaluation) => (
            <tr key={evaluation._id}>
              <td>{evaluation.projectName}</td>
              <td>{evaluation.comment}</td>
              <td>{evaluation.evaluatorId.nom}</td>
              <td>{evaluation.owner.nom}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EvaluationTable;
