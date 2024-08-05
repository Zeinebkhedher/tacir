import React, { useEffect, useState } from "react";

const FormationRequests = ({ formationId }) => {
  const [beneficiaires, setBeneficiaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (formationId) {
      const fetchBeneficiaires = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/formations/${formationId}/beneficiaires`);
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || "Failed to fetch beneficiaires");
          }
          setBeneficiaires(data.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBeneficiaires();
    } else {
      setError("Formation ID is not defined");
      setLoading(false);
    }
  }, [formationId]);
  

  const handleStatusUpdate = async (beneficiaireId, status) => {
    try {
      const response = await fetch(`http://localhost:8000/api/formations/${formationId}/beneficiaire/${beneficiaireId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update status");
      }
      setBeneficiaires((prev) => prev.map((b) => (b._id === beneficiaireId ? { ...b, status } : b)));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Beneficiaire Requests</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prenom</th>
              <th>Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {beneficiaires.map((beneficiaire) => (
              <tr key={beneficiaire._id}>
                <td>{beneficiaire.nom}</td>
                <td>{beneficiaire.prenom}</td>
                <td>{beneficiaire.email}</td>
                <td>{beneficiaire.status}</td>
                <td>
                  <button onClick={() => handleStatusUpdate(beneficiaire._id, "accepted")}>Accept</button>
                  <button onClick={() => handleStatusUpdate(beneficiaire._id, "rejected")}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormationRequests;

// CSS in the same file
<style jsx>{`
  .container {
    width: 80%;
    margin: auto;
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }

  .error {
    color: red;
  }
`}</style>
