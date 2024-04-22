import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import "../admin/adminDashboard.css";
import HomePage from "../admin/pages/HomePage";

import AccountRegister from "../../components/comptes/AccountRegister";
import SidebarCoordinateurRegional from "../../components/sideBar/SideBarCoordinateurRegional";

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

   
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default CoordinateurRegionalDashboard;
