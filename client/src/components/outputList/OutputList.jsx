// OutputList.jsx
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Card, CardContent, Grid, IconButton, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OutputList.css'; // Import the CSS file for styling

const OutputList = ({ creathonId }) => {
  const [outputs, setOutputs] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOutputs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/outputs/creathon/${creathonId}`);
        setOutputs(response.data);
      } catch (error) {
        setError('Erreur lors de la récupération des outputs : ' + error.message);
      }
    };

    fetchOutputs();
  }, [creathonId]);

  if (error) return <div>{error}</div>;
  if (outputs.length === 0) return <div>Aucun output trouvé</div>;
  const handleBack = () => {
    navigate('/dashboard/porteurProjet/AcceptedCreathonsList'); // Adjust this route as needed
  };
  return (
    <div className="output-list-container">
      <div className="output-list">
      <IconButton onClick={handleBack} style={{ position: 'absolute', top: -136, left: -35, backgroundColor: 'transparent' }}>
        <NavigateBeforeIcon style={{ fontSize: '2rem', color: '#FF5733',        
 }} /> {/* Back icon */}
      </IconButton>
        <h1>Liste des Outputs</h1>
        <Grid container spacing={3}>
          {outputs.map(output => (
            <Grid item xs={12} sm={8} md={6} lg={6} key={output._id}>
              <Card className="output-card">
                <CardContent>
                 
                  <Typography color="text.secondary">
                    File: {output.file}
                  </Typography>
                  <Typography color="text.secondary">
                    Date Depot: {new Date(output.dateDepot).toLocaleString()}
                  </Typography>
                  <Typography color="text.secondary">
                  Creathon: {output.creathonTitle} {/* Display creathon title */}
                  </Typography>
                 
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default OutputList;
