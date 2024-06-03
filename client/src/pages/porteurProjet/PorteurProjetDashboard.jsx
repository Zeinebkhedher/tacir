import React from "react";
import AcceptedCreathonsListInterface from "../../components/AcceptedCreathonsListInterface/AcceptedCreathonsListInterface";
import Contact from "../../components/Contact/Contact";
import AfficherEvaluation from "../../components/EvaluationProjet/AfficherEvaluation";
import BesoinInterface from "../../components/besoinInterface/BesoinInterface";
import SinscrireFormation from "../../components/formations/SinscrireFormation";
import UpcomingFormations from "../../components/formations/UpcomingFormations";
import InterfaceCreathon from "../../components/interfaceCreathon/InterfaceCreathon";
import Navbar1 from "../../components/navBar1/NavBar1";
import PlannigAccompagnementInterface from "../../components/plannigAccompagnementInterface/PlannigAccompagnementInterface";
import Profile from "../../components/profil/Profile";
import AddProject from "../../components/projects/AddProject";
import DeposerRendu from "../../components/rendu/DeposerRendu";
import SideBarPoreturProjet from "../../components/sideBarPorteurProjet/SideBarPorteurProjet";
import SyntheseInterface from "../../components/syntheseInterface/SyntheseInterface";
import ListeProjets from "../../pages/porteurProjet/ListeProjets";
import AllFormationPage from "../formation/AllFormationPage";
import HomePage from "../home/HomePage";
import MonProjet from "../../components/projects/MonProjet";

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
            {props.load === "Home" && <HomePage />}
            {props.load === "ListeProjet" && <ListeProjets />}

            {props.load === "Evaluation" && <AfficherEvaluation />}
            {props.load === "parametresComptes" && <Profile />}
            {props.load === "creathonList" && <InterfaceCreathon />}
            {props.load === "syntheseInterface" && <SyntheseInterface />}
            {props.load === "besoinAccompagnement" && <BesoinInterface />}
            {props.load === "PlannigAccompagnementInterface" && (
              <PlannigAccompagnementInterface />
            )}
            {props.load === "PlannigAccompagnementInterface" && (
              <PlannigAccompagnementInterface />
            )}
            {props.load === "AcceptedCreathonsList" && (
              <AcceptedCreathonsListInterface />
            )}

            {props.load === "upcomingFormations" && <UpcomingFormations />}
            {props.load === "AllFormation" && <AllFormationPage />}
            {props.load === "sinscrireFormation" && <SinscrireFormation />}
            {props.load === "contact" && <Contact />}
            {props.load === "deposerRendu" && <DeposerRendu />}
            {props.load === "Monprojet" && <MonProjet />}
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
