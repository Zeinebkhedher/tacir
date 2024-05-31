import React from 'react';
import CreathonList from '../creathonList/CreathonList';
// Importez le fichier CSS

const CreathonListInterface = () => {
  return (
    <div  className="position-absolute top-50 start-50 translate-middle auditionTable"> 
      <CreathonList />
    </div>
  );
}

export default CreathonListInterface;
