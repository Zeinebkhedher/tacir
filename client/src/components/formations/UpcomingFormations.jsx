import React, { useState, useEffect } from "react";
import "./upcomingFormation.css"; // Import CSS file for component-specific styles
import { Link } from "react-router-dom";

function FormationList() {
  const [upcomingFormations, setUpcomingFormations] = useState([]);

  useEffect(() => {
    // Fetch formations from the backend API
    fetch("http://localhost:8000/api/formations")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch formations");
        }
        return response.json();
      })
      .then((responseData) => {
        // Extract the array of formations from the response data
        const formations = responseData.data || [];
        console.log(formations); // Log the formations to inspect their structure
        // Filter formations with status "Upcoming"
        const upcoming = formations.filter(
          (formation) => formation.status === "Upcoming"
        );
        // Format the date in "dd-mm-yy" format
        const formattedFormations = upcoming.map((formation) => {
          return {
            ...formation,
            Date: formatDate(formation.Date), // Format the date
          };
        });
        setUpcomingFormations(formattedFormations);
      })
      .catch((error) => {
        console.error("Error fetching formations:", error.message);
      });
  }, []);

  // Function to format the date in "dd-mm-yy" format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(2);
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="containerFormation">
      <h2>Upcoming Formations</h2>
      {upcomingFormations.map((formation) => (
        <div key={formation._id} className="formation-box">
          <div className="formation">
            <h3>{formation.Name}</h3>
            <div className="contentFormation">
              <div className="line">
                <p>Date: </p>
                <span>{formation.Date}</span>
              </div>
              <div className="line">
                <p>Nom du formateur:</p>
                <span> {formation.formateur[0].LastName}</span>
              </div>
              <div className="line">
                <p>Prénom du formateur:</p>
                <span> {formation.formateur[0].FirstName}</span>
              </div>
              <div className="line">
                <p>Information:</p>{" "}
                <span>{formation.formateur[0].informations}</span>
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
          <Link
            to={`/dashboard/porteurProjet/formations/sinscrire/${formation._id}`}
          >
            <button className="sinscrire">S'inscrire</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default FormationList;
