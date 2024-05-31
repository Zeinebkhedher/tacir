import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import CompteInterface from "../../components/compteInterface/CompteInterface";
import AccountRegister from "../../components/comptes/AccountRegister";
import SidebarCoordinateurGeneral from "../../components/sideBar/SideBarCoordinateurGeneral";
import "../admin/adminDashboard.css";
import ListeCandidatsPage from "../candidat/ListeCandidatsPage";
import HomePage from "../home/HomePage";
import ListeProjects from "../../components/projects/ListeProjects";
import Creathons from "../../components/creathons/Creathons";

const CoordinateurGeneralDashboard = (props) => {
  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SidebarCoordinateurGeneral />
            </aside>

            <Navbar1 />

            {props.load === "Home" && <HomePage />}
            {props.load === "AcountRegister" && <AccountRegister />}
            {props.load === "ListeCandidats" && <ListeCandidatsPage />}
            {props.load === "parametresComptes" && <CompteInterface />}
            {props.load === "ListeProject" && <ListeProjects />}
            {props.load === "creathonList" && <Creathons />}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default CoordinateurGeneralDashboard;
