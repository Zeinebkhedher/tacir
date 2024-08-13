import React from 'react';
import CreathonListeDetails from './CreathonListeDetails';
// Importez le fichier CSS

const CreathonListeDetailsInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <CreathonListeDetails  />
    </div>
  );
}

export default CreathonListeDetailsInterface;
