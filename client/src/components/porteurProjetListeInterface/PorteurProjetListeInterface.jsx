import React from 'react';
import PorteurProjetListe from '../porteurProjetListe/PorteurProjetListe';
// Importez le fichier CSS

const PorteurProjetListeInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <PorteurProjetListe  />
    </div>
  );
}

export default PorteurProjetListeInterface;
