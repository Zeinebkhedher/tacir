import React from "react";
import AfficherEvaluation from "../../components/EvaluationProjet/AfficherEvaluation";
import CompteInterface from "../../components/compteInterface/CompteInterface";
import Navbar1 from "../../components/navBar1/NavBar1";
import AddProject from "../../components/projects/AddProject";
import SideBarPoreturProjet from "../../components/sideBarPorteurProjet/SideBarPorteurProjet";
import ListeProjets from "../../pages/porteurProjet/ListeProjets";
import HomePage from "../home/HomePage";

const PorteurProjetDashboard = (props) => {
  return (
    <div>
      <div>
        {/* Layout wrapper */}
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            {/* Menu */}
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SideBarPoreturProjet />
            </aside>
            <Navbar1 />
            {props.load === "home" && <HomePage />}
            {props.load === "ListeProjet" && <ListeProjets />}
            {props.load === "AddProject" && <AddProject />}
            {props.load === "Evaluation" && <AfficherEvaluation />}
            {props.load === "parametresComptes" && <CompteInterface />}


          </div>
          {/* Overlay */}
          <div className="layout-overlay layout-menu-toggle" />
        </div>
        {/* / Layout wrapper */}
      </div>
    </div>
  );
};

export default PorteurProjetDashboard;
