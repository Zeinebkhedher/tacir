import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from "react-icons/md";

const BesoinAccomapgnement = () => {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('');
    const [description, setDescription] = useState('');
    const [besoinsMateriels, setBesoinsMateriels] = useState([]);
    const [besoinsFormation, setBesoinsFormation] = useState([]);
  
    useEffect(() => {
      fetchBesoins();
    }, []);
  
    const fetchBesoins = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/besoins/besoins');
        if (response.status === 200) {
          const besoins = response.data;
          const materiels = besoins.filter((besoin) => besoin.type === 'Ressources matérielles');
          const formation = besoins.filter((besoin) => besoin.type === 'Besoins de formation');
          setBesoinsMateriels(materiels.map((besoin) => besoin.description));
          setBesoinsFormation(formation.map((besoin) => besoin.description));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des besoins:', error.message);
      }
    };
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = async () => {
    try {
      await axios.post('http://localhost:8000/api/besoins/create', { type, description });
      if (type === 'Ressources matérielles') {
        setBesoinsMateriels([...besoinsMateriels, description]);
      } else if (type === 'Besoins de formation') {
        setBesoinsFormation([...besoinsFormation, description]);
      }
      setOpen(false);
      setType('');
      setDescription('');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du besoin :', error.message);
    }
  };
  const handleDelete = async (type, index) => {
    try {
      await axios.delete(`http://localhost:8000/api/besoins/delete/${type}/${index}`);
      if (type === 'Ressources matérielles') {
        const updatedBesoins = [...besoinsMateriels];
        updatedBesoins.splice(index, 1);
        setBesoinsMateriels(updatedBesoins);
      } else if (type === 'Besoins de formation') {
        const updatedBesoins = [...besoinsFormation];
        updatedBesoins.splice(index, 1);
        setBesoinsFormation(updatedBesoins);
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du besoin :', error.message);
    }
  };

  return (
    <div style={{marginBottom:"10%"}}>
        <DialogTitle style={{fontSize:"35px"}}>Besoins d'accompagenement  </DialogTitle>
         <Button onClick={handleClickOpen} style={{ marginTop: '20px', marginBottom:"18px",  fontSize:"10px" }}>
        Ajouter un besoin
      </Button>

      <Grid container spacing={16}>
        {/* Conteneur pour les ressources matérielles */}
        <Grid item xs={6}>
       
          <Paper elevation={3} style={{ borderRadius: '20px', backgroundColor: '#FFCDD2', padding: '20px',width:"130%", maxHeight: '500px', overflow: 'auto' }}>
            <h3>Ressources Matérielles</h3>
            {besoinsMateriels.map((besoin, index) => ( <>
                <div key={index} style={{ display: 'flex'}}>
                <p>{besoin}</p>
                <Button onClick={() => handleDelete('Ressources matérielles', index)} style={{marginLeft:"60%" ,borderRadius:"30px", backgroundColor:"transparent"}}><MdDelete style={{fontSize:"20px"}} /></Button>
               
              </div>
              <hr /></>
             
            ))}
          </Paper>
        </Grid>
        {/* Conteneur pour les besoins de formation */}
        <Grid item xs={6}>
          <Paper elevation={3} style={{ borderRadius: '20px', backgroundColor: '#81D4FA', padding: '20px',width:"130%", maxHeight: '500px', overflow: 'auto' }}>
            <h3>Besoins de Formation</h3>
            {besoinsFormation.map((besoin, index) => ( <>
                <div key={index} style={{ display: 'flex'}}>
                <p>{besoin}</p>
                <Button onClick={() => handleDelete('Besoins de formation', index)} style={{marginLeft:"50%" ,borderRadius:"30px", backgroundColor:"transparent"}}><MdDelete style={{fontSize:"20px"}} />

</Button>
               
              </div>
              <hr /></>
            
            ))}
          </Paper>
        </Grid>
      </Grid>
      {/* Bouton d'ajout */}
     
      {/* Dialog pour ajouter un besoin */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ajouter un besoin</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Type de besoin</InputLabel>
            <Select
              value={type}
              onChange={(e) => setType(e.target.value)}
              fullWidth
            >
              <MenuItem value="Ressources matérielles">Ressources matérielles</MenuItem>
              <MenuItem value="Besoins de formation">Besoins de formation</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button onClick={handleSave}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BesoinAccomapgnement;
