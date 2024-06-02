import React from 'react';
import PlannigAccompagnement from '../plannigAccompagnement/PlannigAccompagnement';
// Importez le fichier CSS

const PlannigAccompagnementInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <PlannigAccompagnement  />
    </div>
  );
}

export default PlannigAccompagnementInterface;
