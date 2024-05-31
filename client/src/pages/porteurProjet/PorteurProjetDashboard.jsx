import React from "react";
import AfficherEvaluation from "../../components/EvaluationProjet/AfficherEvaluation";
import CompteInterface from "../../components/compteInterface/CompteInterface";
import SinscrireFormation from "../../components/formations/SinscrireFormation";
import UpcomingFormations from "../../components/formations/UpcomingFormations";
import InterfaceCreathon from "../../components/interfaceCreathon/InterfaceCreathon";
import Navbar1 from "../../components/navBar1/NavBar1";
import AddProject from "../../components/projects/AddProject";
import SideBarPoreturProjet from "../../components/sideBarPorteurProjet/SideBarPorteurProjet";
import ListeProjets from "../../pages/porteurProjet/ListeProjets";
import AllFormationPage from "../formation/AllFormationPage";
import HomePage from "../home/HomePage";
import Contact from "../../components/Contact/Contact";

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
            {props.load === "creathonList" && <InterfaceCreathon />}
            {props.load === "upcomingFormations" && <UpcomingFormations />}
            {props.load === "AllFormation" && <AllFormationPage />}
            {props.load === "sinscrireFormation" && <SinscrireFormation />}
            {props.load === "contact" && <Contact />}
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
