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
            {props.load === "creathonList" && <CreathonInterface />}
            {props.load === "creathon" && <Creathons />}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default CoordinateurComposanteDashboard;
