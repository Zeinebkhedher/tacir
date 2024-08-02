import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import CompteInterface from "../../components/compteInterface/CompteInterface";
import AccountRegister from "../../components/comptes/AccountRegister";
import Creathons from "../../components/creathons/Creathons";
import Profile from "../../components/profil/Profile";
import ListeProjects from "../../components/projects/ListeProjects";
import SidebarCoordinateurGeneral from "../../components/sideBar/SideBarCoordinateurGeneral";
import "../admin/adminDashboard.css";
import ListeCandidatsPage from "../candidat/ListeCandidatsPage";
import HomePage from "../home/HomePage";
import MentorListInterface from "../mentor/mentorListInterface/MentorListInterface";
import CreathonInterface from "../../components/creathonInterface/CreathonInterface";
import SidebarCoordinateurComposante from "../../components/sideBar/SideBarCoordinateurComposante";
import ListeFormations from "../../components/formations/ListeFormations";
import CreaProjects from "../../components/projects/ListCreaProjects";
import InovProjects from "../../components/projects/ListInovProjects";
import Contact from "../../components/Contact/Contact";
import ListeRendu from "../../components/rendu/ListeRendu";
import DeposerRendu from "../../components/rendu/DeposerRendu";
import EspaceDepot from "../../components/rendu/EspaceDepot";
import CreateFormation from "../../components/formations/CreateFormation";
import FormationList from "../../components/formations/UpcomingFormations";
import AllFormationPage from "../formation/AllFormationPage";
import PlanifierReunion from "../../components/meetings/PlanifierReunion";
import PlanifierMentorat from "../../components/Mentorat/CreateMentorat";

const CoordinateurComposanteDashboard = (props) => {
  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SidebarCoordinateurComposante />
            </aside>

            <Navbar1 />

            {props.load === "Home" && <HomePage />}
            {props.load === "ListeCandidats" && <ListeCandidatsPage />}
            {props.load === "parametresComptes" && <Profile />}
            {props.load === "mentorList" && <MentorListInterface />}
            {props.load === "ListeProject" && <ListeProjects />}
            {props.load === "listeFormations" && <ListeFormations />}
            {props.load === "projetCrea" && <CreaProjects />}
            {props.load === "projetInov" && <InovProjects />}
            {props.load === "contact" && <Contact />}
            {props.load === "ListRendu" && <ListeRendu />}
            {props.load === "demanderRendu" && <EspaceDepot />}
            {props.load === "createFormation" && <CreateFormation />}
            {props.load === "upcomingFormation" && <AllFormationPage />}
            {props.load === "planifierReunion" && <PlanifierReunion />}
            {props.load === "planifierMentorat" && <PlanifierMentorat />}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default CoordinateurComposanteDashboard;
