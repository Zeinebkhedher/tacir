import React, { useState, useEffect } from "react";
import axios from "axios";
import "./contact.css";
const Contact = () => {
  const [role, setRole] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [message, setMessage] = useState("");
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (role) {
      fetchMembersByRole(role);
    }
  }, [role]);

  const fetchMembersByRole = async (role) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/contacts/${role}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMembers(response.data);
    } catch (err) {
      setError("Error fetching members");
    }
  };

  const handleEmailSelect = (email) => {
    setSelectedEmails((prevSelectedEmails) =>
      prevSelectedEmails.includes(email)
        ? prevSelectedEmails.filter((e) => e !== email)
        : [...prevSelectedEmails, email]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/contacts/send-message",
        {
          emails: selectedEmails,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        setFeedback("Message sent successfully");
      }
    } catch (err) {
      setError("Error sending message");
    }
  };

  return (
    <div className="content">
      <h2>Send a Message</h2>
      <div>
        <label htmlFor="role">Select Role:</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">--Select a role--</option>
          <option value="admin">Admin</option>
          <option value="Mentor">Mentor</option>
          <option value="PorteurProjet">PorteurProjet</option>
          <option value="coordinateurGeneral">Coordinateur General</option>
          <option value="coordinateurRegional">Coordinateur Regional</option>
          <option value="candidat">Candidat</option>
        </select>
      </div>
      <div>
        <h3>Select Members</h3>
        {members.length > 0 ? (
          members.map((member) => (
            <div key={member.email}>
              <input
                type="checkbox"
                id={member.email}
                checked={selectedEmails.includes(member.email)}
                onChange={() => handleEmailSelect(member.email)}
              />
              <label htmlFor={member.email}>{member.email}</label>
            </div>
          ))
        ) : (
          <p>No members found for the selected role.</p>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>
      </form>
      {feedback && <p style={{ color: "green" }}>{feedback}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Contact;
