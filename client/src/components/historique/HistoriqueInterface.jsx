import React from 'react';
import Historique from './Historique';
// Importez le fichier CSS

const HistoriqueInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <Historique  />
    </div>
  );
}

export default HistoriqueInterface;
