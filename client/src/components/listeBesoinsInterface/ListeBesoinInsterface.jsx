import React from 'react';
import BesoinsList from '../listeBesoins/BesoinsList';
// Importez le fichier CSS

const ListeBesoinInsterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <BesoinsList  />
    </div>
  );
}

export default ListeBesoinInsterface;
