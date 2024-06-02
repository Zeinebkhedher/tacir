import React from 'react';
import CreathonListeAccepte from '../creathonListeAccepte/CreathonListeAccepte';
// Importez le fichier CSS

const CreathonAcceptedInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <CreathonListeAccepte  />
    </div>
  );
}

export default CreathonAcceptedInterface;
