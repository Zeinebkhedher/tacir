import React from 'react';
import CoordinateurGeneraleListe from '../corrdinateurGeneraleListe/CoordinateurGeneraleListe';
import Synthese from '../synthese/Synthese';
// Importez le fichier CSS

const SyntheseInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <Synthese/>
    </div>
  );
}

export default SyntheseInterface;
