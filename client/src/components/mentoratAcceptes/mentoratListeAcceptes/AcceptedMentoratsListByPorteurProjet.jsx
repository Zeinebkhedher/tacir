import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { eachDayOfInterval, format } from 'date-fns';
import {jwtDecode} from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AcceptedMentoratsListByPorteurProjet = () => {
  const [mentorats, setMentorats] = useState([]);
  const [setPorteurProjetId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMentorat, setSelectedMentorat] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedMentorats = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.membreId;
        setPorteurProjetId(userId);

        const response = await axios.get("http://localhost:8000/api/mentorats/userMentorats", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setMentorats(response.data.data); // Adapté pour correspondre au format de réponse
      } catch (error) {
        console.error('Erreur lors de la récupération des mentorats acceptés :', error.message);
      }
    };

    fetchAcceptedMentorats();
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd');
  };

  const handleOpenDialog = (mentorat) => {
    setSelectedMentorat(mentorat);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMentorat(null);
    setFile(null);
  };

  const getDateRangeInputs = (startDate, endDate) => {
    const today = new Date();
    const dates = eachDayOfInterval({ start: new Date(startDate), end: new Date(endDate) });

    return dates.map((date, index) => {
      const formattedDate = formatDate(date);
      const isPast = today > date;
      const message = isPast
        ? 'Vous avez dépassé la date limite.'
        : 'Vous devez déposer avant la date limite.';

      return (
        <div key={index} style={{ marginBottom: '16px' }}>
          <Typography
            variant="body2"
            style={{ color: isPast ? 'red' : 'black' }}
          >
            {formattedDate}
          </Typography>
          <TextField
            type="file"
            disabled={isPast}
            helperText={message}
            fullWidth
            InputProps={{ style: { color: isPast ? 'grey' : 'black' } }}
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
      );
    });
  };

  const handleSubmit = async () => {
    if (!file || !selectedMentorat) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dateDepot', new Date().toISOString());
    formData.append('mentoratId', selectedMentorat._id);
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8000/api/outputMentorat/add", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Response:', response.data);
      handleCloseDialog();
    } catch (error) {
      console.error('Erreur lors du dépôt du fichier :', error.response ? error.response.data : error.message);
    }
  };

  const handleViewOutputs = (mentoratId) => {
    navigate(`/dashboard/porteurProjet/outputMentorat/${mentoratId}`);
  };
  

  return (
    <Grid container spacing={2}>
      {mentorats.map((mentorat) => (
        <Grid item xs={12} sm={6} md={4} key={mentorat._id} style={{ position: 'relative' }}>
          <Card>
            <CardContent>
              <div style={{ position: 'absolute', top: '23px', right: '8px' }}>
                <IconButton
                  color="default"
                  onClick={() => handleViewOutputs(mentorat._id)}
                  style={{
                    backgroundColor: 'transparent',
                    padding: 0
                  }}
                >
                  <VisibilityIcon style={{ fontSize: '1.5rem', color: '#4caf50' }} />
                </IconButton>
              </div>
              <Typography variant="h6">{mentorat.titre}</Typography>
              <Typography variant="body2">
                Date de début : {formatDate(mentorat.dateDebut)}
              </Typography>
              <Typography variant="body2">
                Date de fin : {formatDate(mentorat.dateFin)}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleOpenDialog(mentorat)}>
                Déposer un fichier
              </Button>
            </CardContent>
          </Card>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Déposer un fichier</DialogTitle>
            <DialogContent>
              {selectedMentorat && getDateRangeInputs(selectedMentorat.dateDebut, selectedMentorat.dateFin)}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Annuler
              </Button>
              <Button onClick={handleSubmit} color="primary" disabled={!file}>
                Déposer
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      ))}
    </Grid>
  );  
};

export default AcceptedMentoratsListByPorteurProjet;
