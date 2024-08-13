import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Card, CardContent, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MentoratList.css'; // Import the CSS file for styling

const MentoratListeOutputs = ({ mentoratId }) => {
  console.log("ID du mentorat dans le composant:", mentoratId);
  const [mentorat, setMentorat] = useState(null);
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fonction pour récupérer les outputs du mentorat
  useEffect(() => {
    const fetchOutputs = async () => {
      try {
        if (!mentoratId) {
          throw new Error('ID du mentorat est manquant.');
        }
        console.log(`Fetching outputs for mentorat with ID: ${mentoratId}`);
        const response = await axios.get(`http://localhost:8000/api/mentorats/${mentoratId}/outputs`);
        console.log('Mentorat outputs data:', response.data);

        // Mettre à jour l'état avec les données du mentorat et les outputs
        setMentorat(response.data.mentorat);
        setOutputs(response.data.outputs);
      } catch (error) {
        console.error('Error fetching mentorat outputs:', error);
        setError('Erreur lors de la récupération des outputs : ' + error.message);
      }
    };

    fetchOutputs();
  }, [mentoratId]);

  // Gestion du retour en arrière
  const handleBack = () => {
    navigate('/dashboard/porteurProjet/mentorats/listeMentoratsAcceptes'); // Ajustez cette route si nécessaire
  };

  // Affichage des erreurs s'il y en a
  if (error) return <div>{error}</div>;

  // Affichage si aucun mentorat ou outputs n'est trouvé
  if (!mentorat || outputs.length === 0) return <div>Aucun mentorat ou outputs trouvés</div>;

  // Affichage des détails des outputs du mentorat
  return (
    <div className="mentorat-list-container">
      <div className="mentorat-list">
        <IconButton
          onClick={handleBack}
          style={{ position: 'absolute', top: -136, left: -35, backgroundColor: 'transparent' }}
        >
          <NavigateBeforeIcon style={{ fontSize: '2rem', color: '#FF5733' }} />
        </IconButton>
        <h1>Détails des Outputs du Mentorat</h1>
        {outputs.map((output, index) => (
          <Card key={index} className="mentorat-card">
            <CardContent>
              <Typography color="text.secondary">
                Nom du Mentorat: {mentorat.titre}
              </Typography>
              <Typography color="text.secondary">
                Fichier: {output.file}
              </Typography>
              <Typography color="text.secondary">
                Date de Dépôt: {new Date(output.dateDepot).toLocaleString()}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MentoratListeOutputs;
