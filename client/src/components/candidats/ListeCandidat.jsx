import axios from "axios";
import React, { useEffect, useState } from "react";
import "./listeCandidats.css";

const ListeCandidats = () => {
  const [candidats, setCandidats] = useState([]);
  const [acceptedCandidates, setAcceptedCandidates] = useState([]);
  const [rejectedCandidates, setRejectedCandidates] = useState([]);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showRejected, setShowRejected] = useState(false);

  useEffect(() => {
    const fetchCandidats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/candidats/getAllCandidats"
        );

        // Filter candidates based on status
        const accepted = response.data.filter(
          (candidat) => candidat.status === "Accepted"
        );
        const rejected = response.data.filter(
          (candidat) => candidat.status === "Refused"
        );
        const all = response.data.filter(
          (candidat) =>
            candidat.status !== "Accepted" && candidat.status !== "Refused"
        );

        // Update state
        setAcceptedCandidates(accepted);
        setRejectedCandidates(rejected);
        setCandidats(all);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };

    fetchCandidats();
  }, []);
  const handleRefuse = async (candidatId) => {
    try {
      // Make an API call to update the candidate status to "Refused"
      await axios.put(
        `http://localhost:8000/api/candidats/status/${candidatId}`,
        { status: "Refused" }
      );
      // Remove the candidate from the list of candidates
      const updatedCandidates = candidats.filter(
        (candidat) => candidat._id !== candidatId
      );
      setCandidats(updatedCandidates);
      // Add the candidate to the list of rejected candidates
      const rejectedCandidate = candidats.find(
        (candidat) => candidat._id === candidatId
      );
      setRejectedCandidates((prevState) => [...prevState, rejectedCandidate]);
    } catch (error) {
      console.error("Error refusing candidate:", error);
    }
  };

  const handleAccept = async (candidatId) => {
    try {
      // Make an API call to update the candidate status to "Accepted"
      await axios.put(
        `http://localhost:8000/api/candidats/status/${candidatId}`,
        { status: "Accepted" }
      );
      // Remove the candidate from the list of candidates
      const updatedCandidates = candidats.filter(
        (candidat) => candidat._id !== candidatId
      );
      setCandidats(updatedCandidates);
      // Add the candidate to the list of accepted candidates
      const acceptedCandidate = candidats.find(
        (candidat) => candidat._id === candidatId
      );
      setAcceptedCandidates((prevState) => [...prevState, acceptedCandidate]);
    } catch (error) {
      console.error("Error accepting candidate:", error);
    }
  };
  const handleAcceptFromRejected = async (candidatId) => {
    try {
      // Make an API call to update the candidate status to "Accepted"
      await axios.put(
        `http://localhost:8000/api/candidats/status/${candidatId}`,
        { status: "Accepted" }
      );
      // Remove the candidate from the list of rejected candidates
      const updatedRejectedCandidates = rejectedCandidates.filter(
        (candidat) => candidat._id !== candidatId
      );
      setRejectedCandidates(updatedRejectedCandidates);
      // Add the candidate to the list of accepted candidates
      const acceptedCandidate = rejectedCandidates.find(
        (candidat) => candidat._id === candidatId
      );
      setAcceptedCandidates((prevState) => [...prevState, acceptedCandidate]);
    } catch (error) {
      console.error("Error accepting candidate:", error);
    }
  };
  const handleRefuseFromAccepted = async (candidatId) => {
    try {
      // Faire un appel API pour mettre à jour le statut du candidat à "Refusé"
      await axios.put(
        `http://localhost:8000/api/candidats/status/${candidatId}`,
        { status: "Refused" }
      );
      // Retirer le candidat de la liste des candidats acceptés
      const updatedAcceptedCandidates = acceptedCandidates.filter(
        (candidat) => candidat._id !== candidatId
      );
      // Ajouter le candidat à la liste des candidats refusés
      const refusedCandidate = acceptedCandidates.find(
        (candidat) => candidat._id === candidatId
      );
      setAcceptedCandidates(updatedAcceptedCandidates);
      setRejectedCandidates((prevState) => [...prevState, refusedCandidate]);
    } catch (error) {
      console.error("Erreur lors du refus du candidat :", error);
    }
  };
  const handleShowAccepted = () => {
    setShowAccepted(true);
    setShowRejected(false);
  };

  const handleShowRejected = () => {
    setShowAccepted(false);
    setShowRejected(true);
  };

  const handleShowAll = () => {
    setShowAccepted(false);
    setShowRejected(false);
  };

 return (
   <div className="contenuListeCandidat">
     <h1>Liste des Candidats</h1>
     <div className="buttons-container">
       <button onClick={handleShowAccepted}>Candidats acceptés</button>
       <button onClick={handleShowRejected} className="rejectedbut">
         Candidats refusés
       </button>
       <button onClick={handleShowAll} className="allbut">
         Tous les candidats
       </button>
     </div>
     {showAccepted && (
       <div>
         <h2>Candidats acceptés</h2>
         <table>
           <thead>
             <tr>
               <th>Nom</th>
               <th>Prénom</th>
               <th>Email</th>
               <th>CIN</th>
               <th>Description</th>
               <th>Idée de projet</th>
               <th>Région</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {acceptedCandidates.map((candidat) => (
               <tr key={candidat._id}>
                 <td>{candidat.nom}</td>
                 <td>{candidat.prenom}</td>
                 <td>{candidat.email}</td>
                 <td>{candidat.CIN}</td>
                 <td>{candidat.descriptif}</td>
                 <td>{candidat.ideeProjet}</td>
                 <td>{candidat.region}</td>
                 <td>
                   <button
                     onClick={() => handleRefuseFromAccepted(candidat._id)}
                     className="rejectedbut"
                   >
                     Refuser
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     )}
     {showRejected && (
       <div>
         <h2>Candidats refusés</h2>
         <table>
           <thead>
             <tr>
               <th>Nom</th>
               <th>Prénom</th>
               <th>Email</th>
               <th>CIN</th>
               <th>Description</th>
               <th>Idée de projet</th>
               <th>Région</th>
               <th>Actions</th>
             </tr>
           </thead>
           <tbody>
             {rejectedCandidates.map((candidat) => (
               <tr key={candidat._id}>
                 <td>{candidat.nom}</td>
                 <td>{candidat.prenom}</td>
                 <td>{candidat.email}</td>
                 <td>{candidat.CIN}</td>
                 <td>{candidat.descriptif}</td>
                 <td>{candidat.ideeProjet}</td>
                 <td>{candidat.region}</td>
                 <td>
                   <button
                     onClick={() => handleAcceptFromRejected(candidat._id)}
                   >
                     Accepter
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     )}
     {!showAccepted && !showRejected && (
       <div>
         {candidats.length === 0 ? (
           <p>Aucun candidat disponible</p>
         ) : (
           <table>
             <thead>
               <tr>
                 <th>Nom</th>
                 <th>Prénom</th>
                 <th>Email</th>
                 <th>CIN</th>
                 <th>Description</th>
                 <th>Idée de projet</th>

                 <th>Région</th>

                 <th>Actions</th>
               </tr>
             </thead>
             <tbody>
               {candidats.map((candidat) => (
                 <tr key={candidat._id}>
                   <td>{candidat.nom}</td>
                   <td>{candidat.prenom}</td>
                   <td>{candidat.email}</td>
                   <td>{candidat.CIN}</td>
                   <td>{candidat.descriptif}</td>
                   <td>{candidat.ideeProjet}</td>
                   <td>{candidat.region}</td>
                   <td>
                     <button
                       onClick={() => handleRefuse(candidat._id)}
                       className="buttonRefusé"
                     >
                       Refuser
                     </button>
                     <button onClick={() => handleAccept(candidat._id)}>
                       Accepter
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         )}
       </div>
     )}
   </div>
 );

};

export default ListeCandidats;
