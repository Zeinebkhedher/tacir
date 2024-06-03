import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import CompteInterface from "../../components/compteInterface/CompteInterface";
import AccountRegister from "../../components/comptes/AccountRegister";
import SidebarCoordinateurRegional from "../../components/sideBar/SideBarCoordinateurRegional";
import "../admin/adminDashboard.css";
import HomePage from "../home/HomePage";
import MentorListInterface from "../mentor/mentorListInterface/MentorListInterface";
import ListeCandidatsPage from "../candidat/ListeCandidatsPage";
import CreathonInterface from "../../components/creathonInterface/CreathonInterface";
import CreathonList from "../../components/creathonList/CreathonList";
import InterfaceDemandeCreathon from "../../components/inetrfaceDemandeCreathon/InterfaceDeamndeCreathon";
import ListeProjects from "../../components/projects/ListeProjects";

const CoordinateurRegionalDashboard = (props) => {
  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SidebarCoordinateurRegional />
            </aside>

            <Navbar1 />

            {props.load === "home" && <HomePage />}
            {props.load === "AcountRegister" && <AccountRegister />}
            {props.load === "parametresComptes" && <CompteInterface />}
            {props.load === "mentorList" && <MentorListInterface />}
            {props.load === "ListeCandidats" && <ListeCandidatsPage />}
            {props.load === "creathonList" && <CreathonInterface />}
            {props.load === "creathon" && <CreathonList />}
            {props.load === "demande_candidature_creathon" && (
              <InterfaceDemandeCreathon />
            )}
          {props.load === "ListeProject" && <ListeProjects />}


          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default CoordinateurRegionalDashboard;
