import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, Grid, IconButton, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import './creathonOutout.css';

const CreathonOutputs = () => {
  const { creathonId } = useParams();
  const [creathon, setCreathon] = useState(null);
  const [outputs, setOutputs] = useState([]);
  const [comments, setComments] = useState({});
  const [commentDialogOpen, setCommentDialogOpen] = useState(false);
  const [selectedComments, setSelectedComments] = useState([]);
  const [editingComment, setEditingComment] = useState(null); 
  const [newCommentText, setNewCommentText] = useState('');

  useEffect(() => {
    const fetchCreathonWithOutputs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/creathons/${creathonId}/outputs`);
        setCreathon(response.data.creathon);
        setOutputs(response.data.outputs);
      } catch (error) {
        console.error('Erreur lors de la récupération des outputs:', error);
      }
    };
    fetchCreathonWithOutputs();
  }, [creathonId]);

  const handleCommentChange = (outputId, event) => {
    setComments({ ...comments, [outputId]: event.target.value });
  };
  

  const handleAddComment = async (outputId) => {
    try {
      const token = localStorage.getItem('token'); // Assurez-vous que le token est bien stocké et récupéré
      const commentData = {
        outputId: outputId,
        comment: comments[outputId] // Remplacez ceci par le commentaire réel
      };
  
      console.log('Sending comment data:', commentData);
  
      await axios.post('http://localhost:8000/api/outputs/comment', commentData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setComments({ ...comments, [outputId]: '' });

    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire:', error);
    }
  };
  
  

  const handleOpenCommentDialog = async (outputId) => {
    try {
      if (typeof outputId === 'object') {
        outputId = outputId._id;
      }
      const response = await axios.get(`http://localhost:8000/api/outputs/listeComments/${outputId}`);
      console.log('Commentaires récupérés:', response.data); // Vérifiez les données ici
      setSelectedComments(response.data);
      setCommentDialogOpen(true);
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires:', error);
    }
  };
  
  const handleEditClick = (comment) => {
    setEditingComment(comment);
    setNewCommentText(comment.texte);  // Initialisez newCommentText avec le texte du commentaire
  };
  
  
  
  
 
  const handleCloseCommentDialog = () => {
    setCommentDialogOpen(false);
    setEditingComment(null);
    setNewCommentText('');
  };

  const handleUpdateComment = async (commentId) => {
    try {
      // Assurez-vous que newCommentText contient une chaîne valide et non undefined
      console.log('ID du commentaire:', commentId);
      console.log('Texte du commentaire:', newCommentText);  // Ajoutez un log ici
  
      if (!newCommentText) {
        console.error('Le texte du commentaire est requis.');
        return;
      }
  
      const response = await axios.patch(
        `http://localhost:8000/api/outputs/updateComment/${commentId}`,
        { texte: newCommentText }  // Assurez-vous que le champ texte est bien passé
      );
  
      console.log('Commentaire mis à jour:', response.data);
      // Fermez la boîte de dialogue après la mise à jour
      handleCloseCommentDialog();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
    }
  };
  
  
  

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8000/api/outputs/deleteComment/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      // Met à jour la liste des commentaires après suppression
      setSelectedComments(prevComments => prevComments.filter(comment => comment._id !== commentId));
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };
  
  

  return (
    <div className="creathonOutput-list-container">
    {creathon && (
      <Card className="card-yellow">
        <CardContent className="card-content">
          <Typography variant="h4">{creathon.titre}</Typography>
          <Typography variant="body1">Date de début : {creathon.dateDebut}</Typography>
          <Typography variant="body1">Date de fin : {creathon.dateFin}</Typography>
          <Typography variant="body1">Lieu : {creathon.lieu}</Typography>
        </CardContent>
      </Card>
    )}
    <Grid container spacing={2}>
      {outputs.map((output) => (
        <Grid item xs={12} key={output._id}>
          <Card>
            <CardContent>
              <Typography variant="body1">
                Porteur de projet : {output.porteur?.nom || output.porteurId?.nom || 'Non disponible'}
              </Typography>
              <Typography variant="body1">
                Email : {output.porteur?.email || output.porteurId?.email || 'Non disponible'}
              </Typography>
              <Typography variant="body1">Date de dépôt : {output.dateDepot || 'Non disponible'}</Typography>
              {output.file && 
                <Typography variant="body1">
                  Fichier : 
                  <a href={`http://localhost:8000/${output.file}`} target="_blank" rel="noopener noreferrer">
                    Voir le fichier
                  </a>
                </Typography>
              }
             <IconButton className="icon-button" onClick={() => handleOpenCommentDialog(output._id)}>
  <ListIcon />
</IconButton>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={comments[output._id] || ''}
                onChange={(event) => handleCommentChange(output._id, event)}
                placeholder="Ajouter un commentaire"
              />
<Button className="button-yellow" onClick={() => handleAddComment(output._id)}>
  Ajouter un commentaire
</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Dialog open={commentDialogOpen} onClose={handleCloseCommentDialog}>
      <DialogTitle>Liste des commentaires</DialogTitle>
      <DialogContent>
        <List>
          {selectedComments.map((comment) => (
            <ListItem key={comment._id}>
              <ListItemText
                primary={`Commentaire: ${comment.texte}`}
                secondary={`Par: ${comment.coordonateurId?.nom || 'Non disponible'} le ${new Date(comment.date).toLocaleString()}`}
              />
             <IconButton className="icon-button" onClick={() => handleEditClick(comment)}>
  <EditIcon />
</IconButton>
<IconButton className="icon-button" onClick={() => handleDeleteComment(comment._id)}>
  <DeleteIcon />
</IconButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        {editingComment && (
          <>
            <TextField
              fullWidth
              multiline
              rows={2}
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Modifier le commentaire"
            />
          <Button className="button-orange" onClick={() => handleUpdateComment(editingComment._id)}>
  Sauvegarder
</Button>
          </>
        )}
        <Button className="button-pink" onClick={handleCloseCommentDialog}>
  Fermer
</Button>
      </DialogActions>
    </Dialog>
  </div>
  );
};

export default CreathonOutputs;
