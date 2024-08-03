import React, { useState, useEffect } from "react";
import axios from "axios";
import "./createMentorat.css";

const PlanifierMentorat = () => {
  const [titre, setTitre] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [description, setDescription] = useState("");
  const [region, setRegion] = useState(""); // New state for region
  const [mentors, setMentors] = useState([]);
  const [destinataires, setDestinataires] = useState([]);
  const [selectedMentors, setSelectedMentors] = useState([]);
  const [selectedDestinataires, setSelectedDestinataires] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/membres/getAllMembers?role=Mentor"
        );
        setMentors(response.data.model);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

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

    fetchMentors();
    fetchDestinataires();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mentoratData = {
      titre,
      dateDebut,
      dateFin,
      description,
      region, // Include the region
      mentors: selectedMentors,
      destinataires: selectedDestinataires,
    };

    try {
      await axios.post("http://localhost:8000/api/mentorats/add", mentoratData);
      setSuccess("Mentorat created successfully!");
      setError(null);
      // Clear form fields after submission
      setTitre("");
      setDateDebut("");
      setDateFin("");
      setDescription("");
      setRegion(""); // Clear region
      setSelectedMentors([]);
      setSelectedDestinataires([]);
    } catch (error) {
      setError("Error creating mentorat. Please try again.");
      setSuccess("");
    }
  };

  const handleMentorChange = (email) => {
    setSelectedMentors((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  const handleDestinataireChange = (email) => {
    setSelectedDestinataires((prev) =>
      prev.includes(email) ? prev.filter((e) => e !== email) : [...prev, email]
    );
  };

  return (
    <div className="MentoratContainer">
      <h2>Planifier un Mentorat</h2>
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
          <label htmlFor="dateDebut">Date Début:</label>
          <input
            type="date"
            id="dateDebut"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="dateFin">Date Fin:</label>
          <input
            type="date"
            id="dateFin"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
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
          <label htmlFor="region">Region:</label>
          <select
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            required
          >
            <option value="">Select Region</option>
            <option value="KEF">KEF</option>
            <option value="TUNIS">TUNIS</option>
          </select>
        </div>

        <div>
          <label htmlFor="mentors">Mentors:</label>
          <div className="dropdown">
            <button className="dropbtn">Select Mentors</button>
            <div className="dropdown-content">
              {mentors.map((member) => (
                <div key={member.email}>
                  <input
                    className="checkboxEmail"
                    type="checkbox"
                    id={member.email}
                    checked={selectedMentors.includes(member.email)}
                    onChange={() => handleMentorChange(member.email)}
                  />
                  <label htmlFor={member.email}>{member.email}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="destinataires">Destinataires:</label>
          <div className="dropdown">
            <button className="dropbtn">Select Destinataires</button>
            <div className="dropdown-content">
              {destinataires.map((member) => (
                <div key={member.email}>
                  <input
                    className="checkboxEmail"
                    type="checkbox"
                    id={member.email}
                    checked={selectedDestinataires.includes(member.email)}
                    onChange={() => handleDestinataireChange(member.email)}
                  />
                  <label htmlFor={member.email}>{member.email}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit">Ajouter Mentorat</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </div>
  );
};

export default PlanifierMentorat;
