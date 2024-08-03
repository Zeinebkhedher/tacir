import React, { useState, useEffect } from "react";
import "./ListeFormations.css";

function ListeFormations() {
  const [formations, setFormations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showBeneficiaries, setShowBeneficiaries] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState(null);

  useEffect(() => {
    // Fetch formations when the component mounts
    fetch("http://localhost:8000/api/formations/")
      .then((response) => response.json())
      .then((data) => {
        setFormations(data.data);})
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
      setShowBeneficiaries(false); // Hide beneficiaries frame
    } catch (error) {
      console.error("Error fetching participants:", error);
    }
  };

  const handleShowBeneficiaries = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/formations/${id}/beneficiaires`
      );
      const data = await response.json();
      console.log(data); // Assuming the response contains the list of beneficiaries
      setBeneficiaries(data.data); // Set beneficiaries data
      setSelectedFormationId(id); // Set selected formation ID
      setShowBeneficiaries(true); // Show beneficiaries frame
      setShowParticipants(false); // Hide participants frame
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div className="Formation">
        <h2>Liste des Formations</h2>
        <table className="tableFormation">
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
              <th>Beneficiaries</th>
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
                    Participants
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleShowBeneficiaries(formation._id)}
                  >
                    Beneficiaries
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {(showParticipants || showBeneficiaries) && (
        <div
          style={{
            position:"absolute",
            top:"30vh",
            right:"1vw",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
            
          }}
        >
          <h2>{showParticipants ? "Participants" : "Beneficiaries"}</h2>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {(showParticipants ? participants : beneficiaries).map((item) => (
              <li
                key={item._id}
                style={{
                  marginTop: "20px",
                  borderBottom: "1px solid #eee",
                  paddingBottom: "5px",
                }}
              >
                <strong>Name:</strong> {item.prenom} {item.nom}
                <br />
                <strong>Email:</strong> {item.email}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ListeFormations;
