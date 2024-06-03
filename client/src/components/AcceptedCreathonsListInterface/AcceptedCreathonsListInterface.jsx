import React from 'react';
import AcceptedCreathonsListByPorteurPorjet from '../AcceptedCreathonsListByPorteurPorjet/AcceptedCreathonsListByPorteurPorjet';
// Importez le fichier CSS

const AcceptedCreathonsListInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <AcceptedCreathonsListByPorteurPorjet  />
    </div>
  );
}

export default AcceptedCreathonsListInterface;
