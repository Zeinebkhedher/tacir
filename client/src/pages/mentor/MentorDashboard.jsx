import React from "react";
import Contact from "../../components/Contact/Contact";
import CreathonAcceptedInterface from "../../components/creathonAcceptedInterface/CreathonAcceptedInterface";
import Navbar1 from "../../components/navBar1/NavBar1";
import Profile from "../../components/profil/Profile";
import UpdateProfile from "../../components/profil/UpdateProfile";
import EvaluateProject from "../../components/projects/EvaluateProject";
import EvaluationTable from "../../components/projects/Evaluation";
import ListeProjects from "../../components/projects/ListeProjects";
import EspaceDepot from "../../components/rendu/EspaceDepot";
import ListeRendu from "../../components/rendu/ListeRendu";
import SideBarMentor from "../../components/sideBarMentor/SideBarMentor";
import SyntheseInterface from "../../components/syntheseInterface/SyntheseInterface";
import HomePage from "../home/HomePage";
import ListeBesoinInsterface from "../../components/listeBesoinsInterface/ListeBesoinInsterface";
import EvaluationList from "../../components/projects/ListeEvaluations";
import InovProjects from "../../components/projects/ListInovProjects";
import CreaProjectsByRegion from "../../components/projects/ListCreaProjects";

const MentorDashboard = (props) => {
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
              <SideBarMentor />
            </aside>
            <Navbar1 />
            {props.load === "home" && <HomePage />}
            {props.load === "ListeProject" && <ListeProjects />}
            {props.load === "EvaluateProject" && <EvaluateProject />}
            {props.load === "Profil" && <Profile />}
            {props.load === "updateprofil" && <UpdateProfile />}
            {props.load === "ListeCandidatCreathonAcceptes" && (
              <CreathonAcceptedInterface />
            )}

            {props.load === "syntheseInterface" && <SyntheseInterface />}
            {props.load === "ListeBesoins" && <ListeBesoinInsterface />}

            {props.load === "contact" && <Contact />}
            {props.load === "Evaluations" && <EvaluationTable />}
            {props.load === "espaceDepot" && <EspaceDepot />}
            {props.load === "ListeRendu" && <ListeRendu />}
            {props.load === "ListeEvaluations" && <EvaluationList />}
            {props.load === "ListInovProjects" && <InovProjects />}
            {props.load === "ListCreaProjects" && <CreaProjectsByRegion />}
          </div>
          {/* Overlay */}
          <div className="layout-overlay layout-menu-toggle" />
        </div>
        {/* / Layout wrapper */}
      </div>
    </div>
  );
};

export default MentorDashboard;
