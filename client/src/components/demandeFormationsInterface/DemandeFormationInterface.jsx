import React from 'react';
import ListeFormations from '../formations/ListeFormations';

const DemandeFormationInterface = () => {
  return (
    <div className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}>
      <ListeFormations />
    </div>
  );
}

export default DemandeFormationInterface;
