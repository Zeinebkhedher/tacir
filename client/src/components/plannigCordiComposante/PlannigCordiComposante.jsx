import React from 'react';
import CalendrierCordiComposante from '../calendrierCordiComposante/CalendrierCordiComposante';
// Importez le fichier CSS

const PlannigCordiComposante = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <CalendrierCordiComposante  />
    </div>
  );
}

export default PlannigCordiComposante;
