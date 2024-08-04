import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EspaceRendu.css"; // Make sure to add the CSS for styling

const EspaceDepot = () => {
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [destinataires, setDestinataires] = useState([]);
  const [selectedDestinataires, setSelectedDestinataires] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchDestinataires = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/membres/getAllMembers?role=PorteurProjet"
        );
        setDestinataires(response.data.model);
      } catch (error) {
        console.error("Error fetching destinataires:", error);
      }
    };

    fetchDestinataires();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const renduData = {
      titre,
      description,
      expirationDate,
      destinataires: selectedDestinataires,
    };

    try {
      await axios.post("http://localhost:8000/api/rendus/rendu", renduData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccess("Rendu created successfully!");
      setError(null);
      // Clear form fields after submission
      setTitre("");
      setDescription("");
      setExpirationDate("");
      setSelectedDestinataires([]);
    } catch (error) {
      setError("Error creating rendu. Please try again.");
      setSuccess("");
    }
  };

  const handleDestinataireChange = (email) => {
    setSelectedDestinataires((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="content">
      <h2>Create Rendu</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titre">Titre:</label>
          <input
            type="text"
            id="titre"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="expirationDate">Expiration Date:</label>
          <input
            type="date"
            id="expirationDate"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="destinataires">Destinataires:</label>
          <div className="dropdown">
            <button  className="dropbtn" onClick={toggleDropdown}>
              {selectedDestinataires.length > 0
                ? `${selectedDestinataires.length} selected`
                : "Select Destinataires"}
            </button>
            {dropdownOpen && (
              <div className="dropdown-content">
                {destinataires.map((member) => (
                  <div key={member.email}>
                    <input
                      type="checkbox"
                      id={member.email}
                      checked={selectedDestinataires.includes(member.email)}
                      onChange={() => handleDestinataireChange(member.email)}
                    />
                    <label htmlFor={member.email}>{member.email}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button type="submit">Create Rendu</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </form>
    </div>
  );
};

export default EspaceDepot;
