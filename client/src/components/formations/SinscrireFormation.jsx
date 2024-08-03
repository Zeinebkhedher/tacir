import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./sinscrireFormation.css";

function SinscrireFormation() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [emailOptions, setEmailOptions] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { formationId } = useParams();

  const [storedToken, setStoredToken] = useState("");

  useEffect(() => {
    const storedTokenValue = localStorage.getItem("token");
    if (storedTokenValue && storedTokenValue !== "null") {
      setStoredToken(storedTokenValue);
    }
  }, []);

  useEffect(() => {
    if (storedToken) {
      const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
      const userId = decodedToken.membreId;

      // Fetch projects where the connected person is the owner
      fetch(`http://localhost:8000/api/projects/listeProjet?owner=${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch project data");
          }
          return response.json();
        })
        .then((projectsData) => {
          const project = projectsData[0]; // Assuming one project per owner
          const memberEmails = project.members.map((member) => member.email);

          // Set email options including the connected person's email and project members' emails
          setEmailOptions(memberEmails);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error.message);
          setErrorMessage("Failed to fetch project data");
        });
    }
  }, [storedToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const participantData = { fullName, email };
    console.log(participantData);

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/formations/${formationId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${storedToken}`, // Include the token in the request
          },
          body: JSON.stringify(participantData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add participant to the formation");
      }

      // Reset form fields
      setFullName("");
      setEmail("");
      setSuccessMessage("Participant added successfully!");
      setErrorMessage("");
    } catch (error) {
      console.error("Error:", error.message);
      setErrorMessage(
        "Failed to add participant to the formation. Please try again later."
      );
      setSuccessMessage("");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="containerInscription">
      <h2>Inscription à la Formation</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Nom complet:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Adresse Email:</label>
          <select
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="email"
          >
            <option value="">Select Email</option>
            {emailOptions.map((emailOption, index) => (
              <option key={index} value={emailOption}>
                {emailOption}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "En cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

export default SinscrireFormation;
