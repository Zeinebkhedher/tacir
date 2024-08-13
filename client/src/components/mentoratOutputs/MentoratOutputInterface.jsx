import React from 'react';
import MentoratOutputs from './MentoratOutputs';
// Importez le fichier CSS

const MentoratOutputInterface = () => {
  return (
    <div   className="position-absolute top-70 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <MentoratOutputs  />
    </div>
  );
}

export default MentoratOutputInterface;
