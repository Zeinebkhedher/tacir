import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { eachDayOfInterval, format } from 'date-fns';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AcceptedCreathonsListByPorteurProjet = () => {
  const [creathons, setCreathons] = useState([]);
  //const [porteurProjetId, setPorteurProjetId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCreathon, setSelectedCreathon] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAcceptedCreathons = async () => {
      try {
        const token = localStorage.getItem('token');
       // const decodedToken = jwtDecode(token);
        //const userId = decodedToken.membreId;
        //setPorteurProjetId(userId);

        const response = await axios.get("http://localhost:8000/api/candidatureCreathon/acceptedCreathons", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCreathons(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des créathons acceptés :', error.message);
      }
    };

    fetchAcceptedCreathons();
  }, []);

  const formatDate = (date) => {
    return format(new Date(date), 'yyyy-MM-dd');
  };

  const handleOpenDialog = (creathon) => {
    setSelectedCreathon(creathon);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCreathon(null);
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
    if (!file || !selectedCreathon) return;
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('dateDepot', new Date().toISOString());
    formData.append('creathonId', selectedCreathon._id || '');
    formData.append('mentoratId', selectedCreathon.mentoratId || '');
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8000/api/outputs/add", formData, {
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

  const handleViewOutputs = (creathonId) => {
    navigate(`/dashboard/porteurProjet/outputs/${creathonId}`);
  };
  

  return (
    <Grid container spacing={2}>
      {creathons.map((creathon) => (
        <Grid item xs={12} sm={6} md={4} key={creathon._id} style={{ position: 'relative' }}>
          <Card>
            <CardContent>
              <div style={{ position: 'absolute', top: '23px', right: '8px' }}>
                <IconButton
                  color="default"
                  onClick={() => handleViewOutputs(creathon._id)}
                  style={{
                    backgroundColor: 'transparent', // Enlève la couleur de fond
                    padding: 0 // Réduit le padding pour ne garder que l'icône visible
                  }}
                >
                  <VisibilityIcon style={{ fontSize: '1.5rem', color: '#4caf50' }} /> {/* Couleur de l'icône */}
                </IconButton>
              </div>
              <Typography variant="h6">{creathon.titre}</Typography>
              <Typography variant="body2">
                Date de début : {formatDate(creathon.dateDebut)}
              </Typography>
              <Typography variant="body2">
                Date de fin : {formatDate(creathon.dateFin)}
              </Typography>
              <Button variant="contained" color="primary" onClick={() => handleOpenDialog(creathon)}>
                Déposer un fichier
              </Button>
            </CardContent>
          </Card>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Déposer un fichier</DialogTitle>
            <DialogContent>
              {selectedCreathon && getDateRangeInputs(selectedCreathon.dateDebut, selectedCreathon.dateFin)}
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

export default AcceptedCreathonsListByPorteurProjet;
