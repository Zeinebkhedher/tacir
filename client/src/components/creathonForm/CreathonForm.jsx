import {
    Box,
    Button,
    Card,
    CardContent,
    FormControl,
    FormHelperText,
    InputLabel,
    Modal,
    OutlinedInput,
    Typography
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

const CreathonForm = () => {
  const [inputs, setInputs] = useState({
    titre: "",
    date: "",
    lieu: "",
    affiche: "",
  });

  const [errors, setErrors] = useState({
    titre: null,
    date: null,
    lieu: null,
    affiche: null,
  });

  const [errorsText, setErrorsText] = useState({
    titre: "",
    date: "",
    lieu: "",
    affiche: "",
  });

  const [openModal, setOpenModal] = useState(false);

  const handleCreateCreathonButton = async () => {
    try {
      const newErrors = {};
      const newErrorsText = {};

      // Vérification des champs obligatoires
      if (!inputs.titre) {
        newErrors.titre = true;
        newErrorsText.titre = "Le titre est requis";
      } else {
        newErrors.titre = false;
        newErrorsText.titre = "";
      }

      if (!inputs.date) {
        newErrors.date = true;
        newErrorsText.date = "La date est requise";
      } else {
        newErrors.date = false;
        newErrorsText.date = "";
      }

      if (!inputs.lieu) {
        newErrors.lieu = true;
        newErrorsText.lieu = "Le lieu est requis";
      } else {
        newErrors.lieu = false;
        newErrorsText.lieu = "";
      }

      if (!inputs.affiche) {
        newErrors.affiche = true;
        newErrorsText.affiche = "L'affiche est requise";
      } else {
        newErrors.affiche = false;
        newErrorsText.affiche = "";
      }

      // Mise à jour des erreurs
      setErrors(newErrors);
      setErrorsText(newErrorsText);

      // Vérification s'il y a des erreurs
      if (!newErrors.titre && !newErrors.date && !newErrors.lieu && !newErrors.affiche) {
        const res = await axios.post(
          "http://localhost:8000/api/creathons/create",
          {
            titre: inputs.titre,
            date: inputs.date,
            lieu: inputs.lieu,
            affiche: inputs.affiche,
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
            titre: "",
            date: "",
            lieu: "",
            affiche: "",
          });
        }
      }
    } catch (error) {
      // Afficher les erreurs
      console.error("Erreur lors de la création du Creathon :", error);
      if (error.response && error.response.data) {
        console.error("Erreurs de validation :", error.response.data);
      }
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
       <h4 style={{ position: "absolute",
  marginTop: "110px",
  marginLeft:" -1150px"}}>
        <span style={{ color: "#5456FC" , position: "absolute"}}>
          CREATHON /
        </span>{" "}
        Créer un Creathon
      </h4>
      <Card sx={{ maxWidth: 600, mx: "auto", mt: 5, p: 4, borderRadius: 4, marginTop:"20%" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Créer un Creathon
          </Typography>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel htmlFor="titre">Titre</InputLabel>
            <OutlinedInput
              id="titre"
              value={inputs.titre}
              error={errors.titre}
              onChange={(e) =>
                setInputs((prevInputs) => ({ ...prevInputs, titre: e.target.value }))
              }
            />
            {errors.titre && <FormHelperText error>{errorsText.titre}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel htmlFor="date">Date</InputLabel>
            <OutlinedInput
              id="date"
              value={inputs.date}
              error={errors.date}
              onChange={(e) =>
                setInputs((prevInputs) => ({ ...prevInputs, date: e.target.value }))
              }
            />
            {errors.date && <FormHelperText error>{errorsText.date}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel htmlFor="lieu">Lieu</InputLabel>
            <OutlinedInput
              id="lieu"
              value={inputs.lieu}
              error={errors.lieu}
              onChange={(e) =>
                setInputs((prevInputs) => ({ ...prevInputs, lieu: e.target.value }))
              }
            />
            {errors.lieu && <FormHelperText error>{errorsText.lieu}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel htmlFor="affiche">Affiche</InputLabel>
            <OutlinedInput
              id="affiche"
              value={inputs.affiche}
              error={errors.affiche}
              onChange={(e) =>
                setInputs((prevInputs) => ({ ...prevInputs, affiche: e.target.value }))
              }
            />
            {errors.affiche && <FormHelperText error>{errorsText.affiche}</FormHelperText>}
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ background: "#696CFF", color: "white" }}
            onClick={handleCreateCreathonButton}
          >
            Créer le Creathon
          </Button>
        </CardContent>
      </Card>
      <Modal
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
            borderRadius: "10px",
          }}
        >
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {"Votre Creathon a été créé avec succès"}
          </Typography>

          <Button
            style={{ letterSpacing: "1px", background: "#696CFF" }}
            onClick={() => {
              setInputs({
                titre: "",
                date: "",
                lieu: "",
                affiche: "",
              });
              setOpenModal(false);
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

export default CreathonForm;
