import React from "react";
import SideBarPoreturProjet from "../../components/sideBarPorteurProjet/SideBarPorteurProjet";
import Navbar1 from "../../components/navBar1/NavBar1";
import HomePage from "../home/HomePage";
import ListeProjets from "../../pages/porteurProjet/ListeProjets";
import AddProject from "../../components/projects/AddProject";
import AfficherEvaluation from "../../components/EvaluationProjet/AfficherEvaluation";
import UpcomingFormations from "../../components/formations/UpcomingFormations";
import SinscrireFormation from "../../components/formations/SinscrireFormation";
import AllFormationPage from "../formation/AllFormationPage";

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
            {props.load === "upcomingFormations" && <UpcomingFormations />}
            {props.load === "AllFormation" && <AllFormationPage />}
            {props.load === "sinscrireFormation" && <SinscrireFormation />}
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
