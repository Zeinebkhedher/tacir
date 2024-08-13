import React from 'react';
import MentoratListeAcceptes from '../mentoratListeAcceptes/AcceptedMentoratsListByPorteurProjet';
import AcceptedMentoratsListByPorteurProjet from '../mentoratListeAcceptes/AcceptedMentoratsListByPorteurProjet';
// Importez le fichier CSS

const MentoratListeAccepteInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <AcceptedMentoratsListByPorteurProjet  />
    </div>
  );
}

export default MentoratListeAccepteInterface;
