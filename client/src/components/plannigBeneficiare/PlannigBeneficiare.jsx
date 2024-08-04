import React from 'react';
import CalendrierFormationsBeneficiaires from './calendrierBeneficiare/CalendrierFormationsBeneficiaires';
// Importez le fichier CSS

const PlannigBeneficiare = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" > {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <CalendrierFormationsBeneficiaires  />
    </div>
  );
}

export default PlannigBeneficiare;
