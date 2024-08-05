import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ListeFormations.css";

function ListeFormations() {
  const [formations, setFormations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [showParticipants, setShowParticipants] = useState(false);
  const [showBeneficiaries, setShowBeneficiaries] = useState(false);
  const [selectedFormationId, setSelectedFormationId] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");

  useEffect(() => {
    const fetchFormations = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/formations${
            selectedRegion ? `?region=${selectedRegion}` : ""
          }`
        );
        const data = await response.json();
        setFormations(data.data);
      } catch (error) {
        console.error("Error fetching formations:", error);
      }
    };

    fetchFormations();
  }, [selectedRegion]);

  const handleShowParticipants = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/formations/${id}/participants`
      );
      const data = await response.json();
      setParticipants(data.data);
      setSelectedFormationId(id);
      setShowParticipants(true);
      setShowBeneficiaries(false);
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
      setBeneficiaries(data.data);
      setSelectedFormationId(id);
      setShowBeneficiaries(true);
      setShowParticipants(false);
    } catch (error) {
      console.error("Error fetching beneficiaries:", error);
    }
  };

  const handleReturnToFormations = () => {
    setShowParticipants(false);
    setShowBeneficiaries(false);
  };

  const handleAcceptParticipant = async (participantId) => {
    try {
      console.log('Accepting participant ID:', participantId); // Log participant acceptance attempt
      const response = await axios.patch(
        `http://localhost:8000/api/formations/${selectedFormationId}/accept`,
        { participantId }  // Ensure this matches the backend expectation
      );
      console.log('Participant accepted response:', response);
       // Log response from the server
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) =>
          participant._id === participantId
            ? { ...participant, status: "accepted" }
            : participant
        )
      );
    } catch (error) {
      console.error("Error accepting participant:", error); // Log any errors
    }
  };

  const handleRefuseParticipant = async (participantId) => {
    try {
      console.log('Refusing participant ID:', participantId); // Log participant refusal attempt
      const response = await axios.patch(
        `http://localhost:8000/api/formations/${selectedFormationId}/refus`,
        { participantId }
      );
      console.log('Participant refused response:', response); // Log response from the server
      setParticipants((prevParticipants) =>
        prevParticipants.map((participant) =>
          participant._id === participantId
            ? { ...participant, status: "refused" }
            : participant
        )
      );
    } catch (error) {
      console.error("Error refusing participant:", error); // Log any errors
    }
  };
  const handleAcceptBeneficiary = async (beneficiaryId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/formations/${selectedFormationId}/beneficiaires/${beneficiaryId}/accept`
      );
      console.log('Beneficiary accepted response:', response);
      setBeneficiaries((prevBeneficiaries) =>
        prevBeneficiaries.map((beneficiary) =>
          beneficiary._id === beneficiaryId
            ? { ...beneficiary, status: "accepted" }
            : beneficiary
        )
      );
    } catch (error) {
      console.error("Error accepting beneficiary:", error);
    }
  };

  const handleRefuseBeneficiary = async (beneficiaryId) => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/formations/${selectedFormationId}/beneficiaires/${beneficiaryId}/refuse`
      );
      console.log('Beneficiary refused response:', response);
      setBeneficiaries((prevBeneficiaries) =>
        prevBeneficiaries.map((beneficiary) =>
          beneficiary._id === beneficiaryId
            ? { ...beneficiary, status: "rejected" }
            : beneficiary
        )
      );
    } catch (error) {
      console.error("Error refusing beneficiary:", error);
    }
  };
  return (
    <div className="Formation">
      {!showParticipants && !showBeneficiaries && (
        <div>
          <h2>Liste des Formations</h2>
          <div>
            <label htmlFor="region">Region:</label>
            <select
              id="region"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">All Regions</option>
              <option value="TUNIS">Tunis</option>
              <option value="KEF">Kef</option>
            </select>
          </div>
          <table className="tableFormation">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Date</th>
                <th>Heure de début</th>
                <th>Heure de fin</th>
                <th>Formateur FirstName</th>
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
                    <button
                      onClick={() => handleShowParticipants(formation._id)}
                    >
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
      )}

      {(showParticipants || showBeneficiaries) && (
        <div className="detailsContainer">
          <button className="backButton" onClick={handleReturnToFormations}>
            Return
          </button>
          <h2>{showParticipants ? "Participants" : "Beneficiaries"}</h2>
          <table className="tableDetails">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Numero</th>
                <th>Code Postal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(showParticipants ? participants : beneficiaries).map((item) => (
                <tr key={item._id}>
                  <td>{item.prenom} {item.nom}</td>
                  <td>{item.email}</td>
                  <td>{item.numero}</td>
                  <td>{item.codePostal}</td>
                  <td>
                    {showParticipants && (
                      <>
                        <button className="acceptButton" onClick={() => handleAcceptParticipant(item._id)}>
                          Accept
                        </button>
                        <button className="rejectButton" onClick={() => handleRefuseParticipant(item._id)}>
                          Reject
                        </button>
                      </>
                    )}
                    {showBeneficiaries && (
                      <>
                        <button className="acceptButton" onClick={() => handleAcceptBeneficiary(item._id)}>
                          Accept
                        </button>
                        <button className="rejectButton" onClick={() => handleRefuseBeneficiary(item._id)}>
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ListeFormations;
