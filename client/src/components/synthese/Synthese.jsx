import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Synthese = () => {
    // Etats
    const [selectedDay, setSelectedDay] = useState("");
    const [synthesis, setSynthesis] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState("success");
    const [alertMessage, setAlertMessage] = useState("");
    const [syntheses, setSyntheses] = useState([]);
  
    // Fonction pour changer le jour sélectionné
    const handleDayChange = (event) => {
      setSelectedDay(event.target.value);
    };
  
    // Fonction pour changer la synthèse
    const handleSynthesisChange = (event) => {
      setSynthesis(event.target.value);
    };
  
    // Fonction pour soumettre la synthèse
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!selectedDay || !synthesis) {
        setAlertSeverity("error");
        setAlertMessage("Veuillez remplir tous les champs.");
        setOpenAlert(true);
        return;
      }
  
      try {
        await axios.post("http://localhost:8000/api/creathons/syntheses", {
          day: selectedDay,
          synthesis: synthesis,
        });
        setAlertSeverity("success");
        setAlertMessage("Synthèse enregistrée avec succès !");
        setOpenAlert(true);
        setSelectedDay("");
        setSynthesis("");
      } catch (error) {
        setAlertSeverity("error");
        setAlertMessage("Erreur lors de l'enregistrement de la synthèse.");
        setOpenAlert(true);
      }
    };
  
    // Fonction pour fermer l'alerte
    const handleAlertClose = () => {
      setOpenAlert(false);
    };
  
    // Effet pour récupérer toutes les synthèses enregistrées
    useEffect(() => {
      const fetchSyntheses = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/synthese/syntheses");
          if (response.status === 200) {
            setSyntheses(response.data);
          }
        } catch (error) {
          console.error("Error fetching syntheses:", error.message);
        }
      };
  
      fetchSyntheses();
    }, []);

    return (
        <div style={{ marginTop: "70px", maxWidth: "600px", margin: "auto" }}>
            <Typography variant="h4" align="center" gutterBottom>
                Synthèse Journalière de la Créathon
            </Typography>
            <Snackbar
                open={openAlert}
                autoHideDuration={6000}
                onClose={handleAlertClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity={alertSeverity}>{alertMessage}</Alert>
            </Snackbar>
            <form onSubmit={handleSubmit}>
                <FormControl fullWidth margin="normal">
                    <InputLabel id="day-label">Sélectionnez le jour</InputLabel>
                    <Select
                        labelId="day-label"
                        value={selectedDay}
                        onChange={handleDayChange}
                        label="Sélectionnez le jour"
                    >
                        <MenuItem value={1}>Jour 1</MenuItem>
                        <MenuItem value={2}>Jour 2</MenuItem>
                        <MenuItem value={3}>Jour 3</MenuItem>
                        <MenuItem value={4}>Jour 4</MenuItem>
                        <MenuItem value={5}>Jour 5</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Synthèse de la journée"
                    multiline
                    rows={6}
                    fullWidth
                    margin="normal"
                    value={synthesis}
                    onChange={handleSynthesisChange}
                    variant="outlined"
                />
                <Box sx={{ textAlign: "center", marginTop: "20px" }}>
                    <Button type="submit" variant="contained" color="primary">
                        Enregistrer la synthèse
                    </Button>
                </Box>
            </form>

            <div style={{ marginTop: "40px" }}>
                <Typography variant="h5" align="center" gutterBottom>
                    Synthèses enregistrées
                </Typography>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Jour</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Synthèse</th>
                            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {syntheses.map((synthese, index) => (
                            <tr key={index}>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{synthese.day}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{synthese.synthesis}</td>
                                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{synthese.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Synthese;
