import React from 'react';
import MentorList from '../../../components/mentorList/MentorList';
import './mentorListInterface.css'; // Importez le fichier CSS

const MentorListInterface = () => {
  return (
    <div   className="position-absolute top-50 start-50 translate-middle" style={{ transform: 'translate(-50%, -50%)' }}> {/* Utilisez une classe pour définir le conteneur de MentorListInterface */}
      <MentorList  />
    </div>
  );
}

export default MentorListInterface;
