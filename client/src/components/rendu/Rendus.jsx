import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Rendu.css";

const Rendus = () => {
  const [rendus, setRendus] = useState([]);

  useEffect(() => {
    const fetchRendus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/rendus/rendus"
        );
        setRendus(response.data);
      } catch (error) {
        console.error("Error fetching rendus:", error);
      }
    };
    fetchRendus();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className="content">
      <div className="rendu-container">
        <h2>Liste des Rendus</h2>
        {rendus.map((rendu) => {
          const isExpired = new Date(rendu.expirationDate) < new Date();
          return (
            <div
              key={rendu._id}
              className={`rendu-card ${isExpired ? "expired" : ""}`}
            >
              <h3>{rendu.titre}</h3>
              <p className="description">Description: {rendu.description}</p>
              <p className="expiration">
                Date d'expiration: {formatDate(rendu.expirationDate)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rendus;
