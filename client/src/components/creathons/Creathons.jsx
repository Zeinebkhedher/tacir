import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from 'axios'; // Importez axios en haut de votre fichier
import React, { useEffect, useState } from "react";
import { FcAddressBook, FcBusinessContact, FcConferenceCall, FcContacts, FcDribbble, FcGenericSortingDesc, FcIdea, FcLink } from "react-icons/fc";
import "./creathons.css";

const Creathons = () => {
  const [creathons, setCreathons] = useState([]);
  const [filteredCreathons, setFilteredCreathons] = useState([]);
  const [open, setOpen] = useState(false); // État pour ouvrir/fermer le popup
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    titre: '',
    descriptif: '',
    ideeProjet: '',
    lien: '',
    membres: ''
  });
  useEffect(() => {
    const fetchCreathons = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/creathons/creathonsListe");
        if (!response.ok) {
          throw new Error("Failed to fetch creathons");
        }
        const data = await response.json();
        setCreathons(data.creathons || []);
        setFilteredCreathons(data.creathons || []);
      } catch (error) {
        console.error("Error fetching creathons:", error.message);
      }
    };

    fetchCreathons();
  }, []);

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredCreathons(creathons);
    } else {
      const filtered = creathons.filter((creathon) => creathon.status === status);
      setFilteredCreathons(filtered);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/candidatureCreathon/sendCandidatureCreathon',
        formData
      );
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        titre: '',
        descriptif: '',
        ideeProjet: '',
        lien: '',
        membres: ''
      });
      setOpen(false);
      console.log('Inscription réussie !');
    } catch (error) {
      console.error('Error creating candidat Creathon:', error.message);
      let errorMessage = 'Erreur lors de la création du candidat Creathon.';
      if (error.response && error.response.data && error.response.data.message) {
        errorMessage += ' ' + error.response.data.message;
      }
      console.log(errorMessage);
    }
  };
  
  return (
    <div className="containerFormation">
      <h2>All Creathons</h2>
    
      {filteredCreathons.map((creathon) => (
        <div
          key={creathon._id}
          className={`formation-box ${creathon.status === "fini" ? "fini" : ""}`}
        >
          <div className="formation">
            <h3>{creathon.titre}</h3>
            <div className="contentFormation">
              <div className="line">
                <p>Statut: </p>
                <span>{creathon.status}</span>
              </div>
              <div className="line">
                <p>Date: </p>
                <span>{new Date(creathon.date).toLocaleDateString("fr-FR")}</span>
              </div>
              <div className="line">
                <p>Lieu:</p>
                <span> {creathon.lieu}</span>
              </div>
              <div className="line">
                <Button className="red-button" onClick={handleOpen}>
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* Popup d'inscription */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Inscription</DialogTitle>
        <DialogContent>
        <div >
        <FcBusinessContact className="iconStyle" />
  <input
   className= "inputStyle"
    type="text"
    id="nom"
    name="nom"
    placeholder="Nom"
    value={formData.nom}
    onChange={handleChange}
  />
</div>
{/* Autres champs de formulaire */}
<div className="inputContainerStyle" >
<FcContacts className="iconStyle" />
  <input
   className= "inputStyle"
   type="text"
    id="prenom"
    name="prenom"
    placeholder="Prénom"
    value={formData.prenom}
    onChange={handleChange}
  />
</div>

<div >
<FcAddressBook className="iconStyle" />
  <input
   className= "inputStyle"
   type="email"
    id="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
  />
</div>

<div >
<FcDribbble className="iconStyle" />
  <input
   className= "inputStyle"
   type="text"
    id="titre"
    name="titre"
    placeholder="Titre de votre projet"
    value={formData.titre}
    onChange={handleChange}
  />
</div>

<div >
<FcGenericSortingDesc className="iconStyle" />
  <input
   className= "inputStyle"
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
   className= "inputStyle"
   type="text"
    id="ideeProjet"
    name="ideeProjet"
    placeholder="Idée de votre projet"
    value={formData.ideeProjet}
    onChange={handleChange}
  />
</div>



<div >
<FcLink className="iconStyle" />
  <input
   className= "inputStyle"
   type="text"
   id="lien"
   name="lien"
    placeholder="Lien de votre projet"
    value={formData.lien}
    onChange={handleChange}
  />
</div>

<div >
<FcConferenceCall className="iconStyle" />
  <input
   className= "inputStyle"
   type="text"
    id="membres"
    name="membres"
    placeholder="Membres de votre projet"
    value={formData.membres}
    onChange={handleChange}
  />
</div>

          <div>
            {/* Vos champs de formulaire ici */}
          </div>
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
