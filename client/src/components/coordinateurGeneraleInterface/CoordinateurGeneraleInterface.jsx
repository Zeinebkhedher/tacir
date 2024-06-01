import React from 'react';
import CoordinateurGeneraleListe from '../corrdinateurGeneraleListe/CoordinateurGeneraleListe';
// Importez le fichier CSS

const CoordinateurGeneraleInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <CoordinateurGeneraleListe  />
    </div>
  );
}

export default CoordinateurGeneraleInterface;
