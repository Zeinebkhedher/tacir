import React from 'react';
import CoordinateurRegionaleListe from '../coordinateurRegionaleListe/CoordinateurRegionaleListe';
// Importez le fichier CSS

const CoordinateurRegionalListeInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <CoordinateurRegionaleListe  />
    </div>
  );
}

export default CoordinateurRegionalListeInterface;
