import React from "react";
import ListeFormations from "../../components/formations/ListeFormations";
import "./FormationPage.css";
import { Link } from "react-router-dom";

function FormationPage() {
  return (
    <div className="ForamtionContainer">
      <ListeFormations />
      <Link to="/dashboard/admin/formations/createFormation">
        <button className="CreateFormationButton">Créer une formation</button>
      </Link>
    </div>
  );
}

export default FormationPage;
