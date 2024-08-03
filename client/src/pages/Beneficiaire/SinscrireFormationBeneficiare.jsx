import React, { useEffect, useState } from "react";
import "../formation/allFormationPage.css"; // Import CSS file for component-specific styles

function FormationBeneficiaire() {
  const [formations, setFormations] = useState([]);

  useEffect(() => {
    // Fetch all formations from the backend API
    fetch("http://localhost:8000/api/formations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch formations");
        }
        return response.json();
      })
      .then((responseData) => {
        // Extract the formations array from the response data
        const formationsData = responseData.data || [];
        console.log(formationsData); // Log the formations to inspect their structure
        setFormations(formationsData);
      })
      .catch((error) => {
        console.error("Error fetching formations:", error.message);
      });
  }, []);

  return (
    <>
      <h2 className="tilteFormation">All Formations</h2>
      <div className="containerFormation">
        {formations.map((formation) => (
          <div
            key={formation._id}
            className={`formation-box ${
              formation.status === "Past" ? "past" : ""
            }`}
          >
            <div className="formation">
              <h3>{formation.Name}</h3>
              <div className="contentFormation">
                <div className="line">
                  <p>status: </p>
                  <span>{formation.status}</span>
                </div>
                <div className="line">
                  <p>Date: </p>
                  <span>{formation.Date}</span>
                </div>
                <div className="line">
                  <p>Nom du formateur:</p>
                  <span> {formation.formateur[0]?.LastName}</span>
                </div>
                <div className="line">
                  <p>Prénom du formateur:</p>
                  <span> {formation.formateur[0]?.FirstName}</span>
                </div>
                <div className="line">
                  <p>Information:</p>{" "}
                  <span>{formation.formateur[0]?.informations}</span>
                </div>
                <div className="line">
                  <p>Start Hour:</p> <span>{formation.startHour}</span>
                </div>
                <div className="line">
                  <p>Finish Hour:</p> <span>{formation.FinishHour}</span>
                </div>
                <div className="line">
                  <p>Description: </p>
                  <span>{formation.description}</span>
                </div>
              </div>
            </div>
            {formation.status === "Upcoming" && (
              <button className="inscription">
                <a
                  href={`/formations/sinscrireBeneficiaire/${formation._id}`}
                  className="link-no-decoration"
                >
                  S'inscrire
                </a>
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default FormationBeneficiaire;
