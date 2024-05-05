import React, { useState, useEffect } from "react";

function ListeFormations() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    // Fetch formations when the component mounts
    fetch("http://localhost:8000/api/formations/")
      .then((response) => response.json())
      .then((data) => {
        // Set the fetched formations to the state
        setFormations(data.data); // Assuming the response data structure has a 'data' property containing the formations
      })
      .catch((error) => {
        console.error("Error fetching formations:", error);
      });
  }, []); // Empty dependency array to execute the effect only once when the component mounts

  return (
    <div>
      <h2>Liste des Formations</h2>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Date</th>
            <th>Heure de début</th>
            <th>Heure de fin</th>
            <th>Formateur FistName </th>
            <th>Formateur LastName </th>
            <th>Formateur infos </th>
          </tr>
        </thead>
        <tbody>
          {formations.map((formation) => (
            <tr key={formation._id}>
              <td>{formation.Name}</td>
              <td>{formation.Date}</td>
              <td>{formation.startHour}</td>
              <td>{formation.FinishHour}</td>
              <td>
                {formation.formateur.map((formateur) => (
                  <div key={formateur._id}>{formateur.FirstName}</div>
                ))}
              </td>
              <td>
                {formation.formateur.map((formateur) => (
                  <div key={formateur._id}>{formateur.LastName}</div>
                ))}
              </td>
              <td>
                {formation.formateur.map((formateur) => (
                  <div key={formateur._id}>{formateur.informations}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListeFormations;
