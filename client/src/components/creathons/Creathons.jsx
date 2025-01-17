import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import React, { useEffect, useState } from "react";
import {
  FcAddressBook, FcBusinessContact,
  FcContacts,
  FcDribbble, FcGenericSortingDesc, FcIdea, FcLink
} from "react-icons/fc";
import "./creathons.css";

const Creathons = () => {
  const [creathons, setCreathons] = useState([]);
  const [filteredCreathons, setFilteredCreathons] = useState([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    titre: '',
    descriptif: '',
    ideeProjet: '',
    lien: '',
    creathonId: '', 
    creathonNom: '' 
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [porteurProjetId, setPorteurProjetId] = useState(null); 

  useEffect(() => {
    const extractPorteurProjetIdFromToken = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.membreId; 
        setPorteurProjetId(userId); 
      }
    };

    extractPorteurProjetIdFromToken(); 
  }, []);

  useEffect(() => {
    const fetchCreathons = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/creathons/creathonsListe");
        if (!response.ok) {
          throw new Error("Failed to fetch creathons");
        }
        const data = await response.json();
        const enCoursCreathons = data.creathons.filter(creathon => creathon.status === "en cours");
        setCreathons(enCoursCreathons);
        setFilteredCreathons(enCoursCreathons);
      } catch (error) {
        console.error("Error fetching creathons:", error.message);
      }
    };
    fetchCreathons();
  }, []);

  /*const handleFilter = (status) => {
    if (status === "all") {
      setFilteredCreathons(creathons);
    } else {
      const filtered = creathons.filter((creathon) => creathon.status === status);
      setFilteredCreathons(filtered);
    }
  };*/

  const handleOpen = (creathonId, creathonNom) => {
    setFormData({
      ...formData,
      creathonId: creathonId,
      creathonNom: creathonNom,
      membres: porteurProjetId 
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrorMessage("");
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    const requiredFields = ['nom', 'prenom', 'email', 'titre', 'descriptif', 'ideeProjet', 'lien', 'creathonId', 'creathonNom'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setErrorMessage(`Le champ ${field} est requis.`);
        return;
      }
    }

    const token = localStorage.getItem("token");

    try {
      /*const response = await axios.post(
        'http://localhost:8000/api/candidatureCreathon/sendCandidatureCreathon',
        { 
          ...formData, 
          membres: porteurProjetId,
          creathon: formData.creathonId // inclure le champ creathon avec l'ID du créathon
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );*/
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        titre: '',
        descriptif: '',
        ideeProjet: '',
        lien: '',
        creathonId: '',
        creathonNom: ''
      });
      setOpen(false);
      console.log('Inscription réussie !');
    } catch (error) {
      console.error('Error creating candidat Creathon:',error.message);
      let errorMessage = 'Erreur lors de la création du candidat Creathon.';
      if (error.response) {
        console.log('Server response:', error.response.data);
        if (error.response.data && error.response.data.message) {
          errorMessage += ' ' + error.response.data.message;
        }
      }
      setErrorMessage(errorMessage);
    }
  };

  return (
    <div className="">
      <h2>Les Creathons</h2>
      <hr className="separator" />  
      <div className="grid-container">
  {filteredCreathons.map((creathon) => (
    <div
      key={creathon._id}
      className={`creathon-box ${creathon.status === "fini" ? "fini" : ""}`}
    >
      <div className="creathon">
        <h3>{creathon.titre}</h3>
        <div className="contentCreathon">
          <div className="line">
            <p>Statut: </p>
            <span style={{ marginBottom: "16px" }}>{creathon.status}</span>
          </div>
          <div className="line">
            <p>Date de début: </p>
            <span style={{ marginBottom: "16px" }}>{new Date(creathon.dateDebut).toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="line">
            <p>Date de fin: </p>
            <span style={{ marginBottom: "16px" }}>{new Date(creathon.dateFin).toLocaleDateString("fr-FR")}</span>
          </div>
          <div className="line">
            <p>Lieu:</p>
            <span style={{ marginBottom: "16px" }}>{creathon.lieu}</span>
          </div>
          <div className="line">
            <p>Affiche:</p>
            <span style={{ marginBottom: "16px" }}>{creathon.affiche}</span>
          </div>
          <div>
            <Button className="red-button" onClick={() => handleOpen(creathon._id, creathon.titre)}>
              S'inscrire
            </Button>
          </div>
        </div>
      </div>
    </div>
  ))}
</div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inscription</DialogTitle>
        <DialogContent style={{ width: '400px', boxShadow: 'none' }}>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          <div>
            <p>ID du Créathon : {formData.creathonId}</p>
            <p>Nom du Créathon : {formData.creathonNom}</p>
          </div>
          <div>
            <FcBusinessContact className="iconStyle" /> 
            <input
              className="inputStyle"
              type="text"
              id="nom"
              name="nom"
              placeholder="Nom"
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          <div className="">
            <FcContacts className="iconStyle" />
            <input
              className="inputStyle"
              type="text"
              id="prenom"
              name="prenom"
              placeholder="Prénom"
              value={formData.prenom}
              onChange={handleChange}
            />
          </div>
          <div>
            <FcAddressBook className="iconStyle" />
            <input
              className="inputStyle"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <FcDribbble className="iconStyle" />
            <input
              className="inputStyle"
              type="text"
              id="titre"
              name="titre"
              placeholder="Titre de votre projet"
              value={formData.titre}
              onChange={handleChange}
            />
          </div>
          <div>
            <FcGenericSortingDesc className="iconStyle" />
            <input
              className="inputStyle"
              type="text"
              id="descriptif"
              name="descriptif"
              placeholder="Description de votre projet"
              value={formData.descriptif}
              onChange={handleChange}
            />
          </div>
          <div>
            <FcIdea className="iconStyle" />
            <input
              className="inputStyle"
              type="text"
              id="ideeProjet"
              name="ideeProjet"
              placeholder="Idée de votre projet"
              value={formData.ideeProjet}
              onChange={handleChange}
            />
          </div>
          <div>
            <FcLink className="iconStyle" />
            <input
              className="inputStyle"
              type="text"
              id="lien"
              name="lien"
              placeholder="Lien de votre projet"
              value={formData.lien}
              onChange={handleChange}
            />
          </div>
          {/* Le champ "membres" est désormais pré-rempli avec l'identifiant du porteur de projet */}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSubmit} color="primary">
            S'inscrire
          </Button>
        </DialogActions>  
      </Dialog>
    </div>
  );
};

export default Creathons;

