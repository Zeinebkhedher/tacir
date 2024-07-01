import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import HomePage from "../home/HomePage";

import SidebarCandidat from "../../components/sideBar/SideBarCandidat";
import InterfaceDemandeCreathon from "../../components/inetrfaceDemandeCreathon/InterfaceDeamndeCreathon";
import AddProject from "../../components/projects/AddProject";
import CreathonForm from "../../components/creathonForm/CreathonForm";
import Profile from "../../components/profil/Profile";

const CandidatDashboard = (props) => {
  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SidebarCandidat />
            </aside>

            <Navbar1 />

            {props.load === "Home" && <HomePage />}
            {props.load === "addProject" && <AddProject />}
            {props.load === "creathonForm" && <CreathonForm />}
            {props.load === "parametre" && <Profile />}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default CandidatDashboard;
