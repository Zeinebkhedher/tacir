import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import React, { useState } from "react";
import "./acountRegister.css";

const AccountRegister = () => {
  const [inputs, setInputs] = useState({
    prenom: "",
    nom: "",
    email: "",
    role: "",
    region:""
    
  });

  const [errors, setErrors] = useState({
    prenom: null,
    nom: null,
    email: null,
    role: null,
    region:null
    
  });

  const [errorsText, setErrorsText] = useState({
    prenom: "",
    nom: "",
    email: "",
    role: "",
    region:""
    
  });

  const [openModal, setOpenModal] = useState(false);

  const roleArray = [
    { title: "admin" },
    { title: "Mentor" },
    { title: "porteurProjet" },  // Corrected the role name
    { title: "coordinateur géneral" },
    { title: "coordinateurRegional" },
    { title: "beneficiaraie" },

    
  ];

  
  const handleCreateAccountButton = async () => {
    try {
      const newErrors = {};
      const newErrorsText = {};
  
      // Vérification des champs obligatoires
      if (!inputs.prenom) {
        newErrors.prenom = true;
        newErrorsText.prenom = "Le prénom est requis";
      } else {
        newErrors.prenom = false;
        newErrorsText.prenom = "";
      }
  
      if (!inputs.nom) {
        newErrors.nom = true;
        newErrorsText.nom = "Le nom est requis";
      } else {
        newErrors.nom = false;
        newErrorsText.nom = "";
      }
  
      if (!inputs.email) {
        newErrors.email = true;
        newErrorsText.email = "L'email est requis";
      } else if (!validateEmail(inputs.email)) {
        newErrors.email = true;
        newErrorsText.email = "Veuillez entrer une adresse email valide";
      } else {
        newErrors.email = false;
        newErrorsText.email = "";
      }
  
      if (!inputs.role) {
        newErrors.role = true;
        newErrorsText.role = "Le rôle est requis";
      } else {
        newErrors.role = false;
        newErrorsText.role = "";
      }

      if (!inputs.region) {
        newErrors.region = true;
        newErrorsText.region = "La région est requiss";
      } else {
        newErrors.region = false;
        newErrorsText.region = "";
      }
  
      // Mise à jour des erreurs
      setErrors(newErrors);
      setErrorsText(newErrorsText);
  
      // Vérification s'il y a des erreurs
      if (
        !newErrors.prenom &&
        !newErrors.nom &&
        !newErrors.email &&
        !newErrors.role && 
        !newErrors.region
      ) {
        const res = await axios.post(
          "http://localhost:8000/api/membres/register",
          {
            prenom: inputs.prenom,
            nom: inputs.nom,
            email: inputs.email,
            role: inputs.role,
            sexe: null,
            dateNaissance: null,
            nationalite: null,
            CIN: null,
            situationPerso: null,
            telephone: null,
            historiqueStatut: null,
            region:inputs.region
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        // Afficher un message de succès et réinitialiser les champs si la requête est réussie
        if (res) {
          setOpenModal(true);
          setInputs({
            prenom: "",
            nom: "",
            email: "",
            role: "",
            region:""
          });
        }
      }
    } catch (error) {
      // Afficher les erreurs
      console.error("Erreur lors de la création du compte :", error);
      if (error.response && error.response.data) {
        console.error("Erreurs de validation :", error.response.data);
      }
    }
  };
  

  function validateEmail($email) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return reg.test($email);
  }
  return (
    <div style={{ marginTop: "30px" }}>
      <h4 className="audition-title">
        <span class="text-muted fw-light" style={{color:"#5456FC"}}>COMPTE /</span> Créer un compte
      </h4>
      <Card className="white-card" style={{ marginTop: "190px" }}>
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              width: "100%",
              paddingLeft: "4%",
              marginBottom: "30px",
              marginTop: "20px",
            }}
          >
            <TextField
              value={inputs.prenom}
              error={errors.prenom}
              label="Prenom"
              type="text"
              helperText={errorsText.prenom}
              style={{ width: "45%" }}
              onChange={(e) =>
                setInputs((prevInputs) => ({
                  ...prevInputs,
                  prenom: e.target.value,
                }))
              }
              //   value={candidatsPerHour}
              //   onChange={handleCandidatsPerHourChange}
              //   error={!!formErrors.candidatsPerHour}
              //   helperText={formErrors.candidatsPerHour}
            />
            <TextField
            value={inputs.nom}
              error={errors.nom}
              label="Nom"
              type="text"
              style={{ width: "45%", marginLeft: "6%" }}
              helperText={errorsText.nom}
              onChange={(e) =>
                setInputs((prevInputs) => ({
                  ...prevInputs,
                  nom: e.target.value,
                }))
              }
              //   value={candidatsPerHour}
              //   onChange={handleCandidatsPerHourChange}
              //   error={!!formErrors.candidatsPerHour}
              //   helperText={formErrors.candidatsPerHour}
            />
          </div>
          <div
            style={{ width: "100%", paddingLeft: "4%", marginBottom: "30px" }}
          >
            <TextField
            value={inputs.email}
              error={errors.email}
              label="Email"
              type="text"
              style={{ width: "80%", marginLeft: "8%" }}
              helperText={errorsText.email}
              onChange={(e) =>
                setInputs((prevInputs) => ({
                  ...prevInputs,
                  email: e.target.value,
                }))
              }
              //   value={candidatsPerHour}
              //   onChange={handleCandidatsPerHourChange}
              //   error={!!formErrors.candidatsPerHour}
              //   helperText={formErrors.candidatsPerHour}
            />
          </div>
          <div
            style={{
              width: "100%",
              paddingLeft: "4%",
              marginBottom: "30px",
              display: "flex",
            }}
          >
            <Autocomplete
              style={{ background: "white", width: "45%" }}
              options={roleArray}
              getOptionLabel={(option) => option.title}
              sx={{ width: 150 }}
              value={
                inputs.role
                  ? roleArray.find((option) => option.title === inputs.role)
                  : null
              }
              onChange={(event, value) => {
                setInputs((prevInputs) => ({
                  ...prevInputs,
                  role: value ? value.title : "",
                }));
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Role"
                  error={errors.role}
                  helperText={errorsText.role}
                />
              )}
            />
             <TextField
            value={inputs.region}
              error={errors.region}
              label="Region"
              type="text"
              style={{ width: "45%", marginLeft: "6%" }}
              helperText={errorsText.nom}
              onChange={(e) =>
                setInputs((prevInputs) => ({
                  ...prevInputs,
                  region: e.target.value,
                }))
              }
              //   value={candidatsPerHour}
              //   onChange={handleCandidatsPerHourChange}
              //   error={!!formErrors.candidatsPerHour}
              //   helperText={formErrors.candidatsPerHour}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              
              type="submit"
              className="btnPlanning"
              variant="contained"
              
              style={{ width: "25%", letterSpacing: "2px" ,background:"#696CFF"}}
              onClick={handleCreateAccountButton}
            >
              Créer le compte
            </Button>
          </div>
        </CardContent>
      </Card>
      <Modal
        className="pop-up"
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "background.paper",
            p: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius:"10px"
          }}
        >
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {"votre compte a été créé avec succès "}
          </Typography>

          <Button
          style={{letterSpacing:"1px",background:"#696CFF"}}
            className="pop-upBtn"
            onClick={() => {
              setInputs({
                prenom: "",
                nom: "",
                email: "",
                role: "",
                
              });
              setOpenModal(false)
            }}
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AccountRegister;
