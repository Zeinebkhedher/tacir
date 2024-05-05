import { Box, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";

const ParametreCompte = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    sexe: "",
    dateNaissance: "",
    nationalite: "",
    CIN: "",
    situationPerso: "",
    telephone: "",
    region: "",
    historiqueStatut: "",
    role: "",
  });
  const [storedToken, setStoredToken] = useState(null); // Ajoutez l'état pour stocker le token JWT

  useEffect(() => {
    const storedTokenValue = localStorage.getItem("token");

    if (storedTokenValue && storedTokenValue !== "null") {
      setStoredToken(storedTokenValue);
    }
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);
          const userId = decodedToken.membreId;

          const response = await axios.get(`http://localhost:8000/api/profile/getUser/${userId}`);
          setUserProfile(response.data);
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération du profil utilisateur :", error);
      }
    };

    if (storedToken) {
      fetchUser();
    }
  }, [storedToken]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.patch(`http://localhost:8000/api/profile/updateUserData/${userProfile._id}`, formData);
        alert("Données mises à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil utilisateur :", error);
      alert("Erreur lors de la mise à jour des données. Veuillez réessayer !");
    }
  };

  return (
    <div style={{ marginTop: "70px", maxWidth: "900px", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Paramètres du compte
      </Typography>
      {userProfile ? (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={18}>
            <Grid item xs={6}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <TextField
                  name="nom"
                  label="Nom"
                  variant="outlined"
                  fullWidth
                  value={formData.nom}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="prenom"
                  label="Prénom"
                  variant="outlined"
                  fullWidth
                  value={formData.prenom}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  fullWidth
                  value={formData.email}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="password"
                  label="Mot de passe"
                  type="password"
                  variant="outlined"
                  fullWidth
                  value={formData.password}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sexe</FormLabel>
                  <RadioGroup
                    row
                    aria-label="sexe"
                    name="sexe"
                    value={formData.sexe}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="Homme" control={<Radio />} label="Homme" />
                    <FormControlLabel value="Femme" control={<Radio />} label="Femme" />
                  </RadioGroup>
                </FormControl>
                <TextField
                  name="dateNaissance"
                  label="Date de naissance"
                  variant="outlined"
                  type="date"
                  fullWidth
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  sx={{ width: "150%" }} 
                />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Divider orientation="vertical" />
              <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <TextField
                  name="nationalite"
                  label="Nationalité"
                  variant="outlined"
                  fullWidth
                  value={formData.nationalite}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="CIN"
                  label="CIN"
                  variant="outlined"
                  fullWidth
                  value={formData.CIN}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="situationPerso"
                  label="Situation personnelle"
                  variant="outlined"
                  fullWidth
                  value={formData.situationPerso}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="telephone"
                  label="Téléphone"
                  variant="outlined"
                  fullWidth
                  value={formData.telephone}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="region"
                  label="Région"
                  variant="outlined"
                  fullWidth
                  value={formData.region}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="historiqueStatut"
                  label="Historique du statut"
                  variant="outlined"
                  fullWidth
                  value={formData.historiqueStatut}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                />
                <TextField
                  name="role"
                  label="Rôle"
                  variant="outlined"
                  fullWidth
                  value={formData.role}
                  onChange={handleChange}
                  sx={{ width: "150%" }} 
                  disabled
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", marginTop: "20px" }}>
            <Button type="submit" variant="contained" color="primary">
              Enregistrer les modifications
            </Button>
          </Box>
        </form>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography>Chargement du profil en cours...</Typography>
        </Box>
      )}
    </div>
  );
};

export default ParametreCompte;
