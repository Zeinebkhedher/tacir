import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const CreathonList = () => {
  const [creathons, setCreathons] = useState([]);

  useEffect(() => {
    const fetchCreathons = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/creathons/creathonsListe"
        );
        setCreathons(response.data.creathons);
      } catch (error) {
        console.error("Erreur lors de la récupération de la liste des Creathons :", error);
      }
    };

    fetchCreathons();
  }, []);

  return (
    <div style={{ marginTop: "70px", maxWidth: "800px", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        LISTE DES CREATHONS
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Lieu</TableCell>
            {/* Ajoutez d'autres en-têtes ici si nécessaire */}
          </TableRow>
        </TableHead>
        <TableBody>
          {creathons.map((creathon) => (
            <TableRow key={creathon._id}>
              <TableCell>{creathon.titre}</TableCell>
              <TableCell>{creathon.date}</TableCell>
              <TableCell>{creathon.lieu}</TableCell>
              {/* Ajoutez d'autres cellules de tableau ici si nécessaire */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {creathons.length === 0 && (
        <Box sx={{ textAlign: "center" }}>
          <Typography>Aucun Creathon trouvé.</Typography>
        </Box>
      )}
    </div>
  );
};

export default CreathonList;
