import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai"; // Importer l'icône de React Icons

const CreathonDetails = () => {
  const [creathon, setCreathon] = useState(null);

  useEffect(() => {
    const fetchCreathon = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/creathons/creathonsListe");
        setCreathon(response.data);
      } catch (error) {
        console.error("Error fetching Creathon details:", error);
      }
    };

    fetchCreathon();
  }, []);

  return (
    <div style={styles.container}>
      {creathon ? (
        <>
          <div style={styles.header}>
            <AiOutlineInfoCircle style={styles.icon} /> {/* Utiliser l'icône de React Icons */}
            <h2 style={styles.title}>{creathon.titre}</h2>
          </div>
          <div style={styles.info}>
            <p><strong>Date:</strong> {creathon.date}</p>
            <p><strong>Lieu:</strong> {creathon.lieu}</p>
          </div>
          <div style={styles.description}>
            <h3>Description</h3>
            <p>{creathon.description}</p>
          </div>
        </>
      ) : (
        <p>Chargement des détails du Creathon...</p>
      )}
    </div>
  );
};

export default CreathonDetails;

const styles = {
  container: {
    position: 'fixed',
    top: '20px',
    left: '20px',
    border: '1px solid black',
    borderRadius: '15px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    maxWidth: '700px',
    width: 'calc(100% - 40px)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  icon: {
    fontSize: '36px',
    marginRight: '10px',
  },
  title: {
    fontSize: '24px',
    margin: '0',
  },
  info: {
    marginBottom: '20px',
  },
  description: {
    marginBottom: '20px',
  },
};
