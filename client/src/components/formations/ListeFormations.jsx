import React, { useState, useEffect } from "react";

function ListeFormations() {
  const [formations, setFormations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState(null);

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

  const handleShowParticipants = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/formations/${id}/participants`
      );
      const data = await response.json();
      console.log(data); // Assuming the response contains the list of participants
      setParticipants(data.data); // Set participants data
      setSelectedFormationId(id); // Set selected formation ID
      setShowParticipants(true); // Show participants frame
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2>Liste des Formations</h2>
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Date</th>
              <th>Heure de début</th>
              <th>Heure de fin</th>
              <th>Formateur FistName</th>
              <th>Formateur LastName</th>
              <th>Formateur infos</th>
              <th>Participants</th>
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
                <td>
                  <button onClick={() => handleShowParticipants(formation._id)}>
                    Show Participants
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showParticipants && (
        <div
          style={{
            marginLeft: "20px",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h2>Participants</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {participants.map((participant) => (
              <li
                key={participant._id}
                style={{
                  marginBottom: "10px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "5px",
                }}
              >
                <strong>Name:</strong> {participant.prenom} {participant.nom}
                <br />
                <strong>Email:</strong> {participant.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListeFormations;
