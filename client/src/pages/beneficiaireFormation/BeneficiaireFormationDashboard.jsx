import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import SideBarBeneficiaireFormation from "../../components/sideBar/SideBarBeneficiaireFormation";
import HomePage from "../home/HomePage";


const BeneficiaireFormationDashboard = (props) => {
  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SideBarBeneficiaireFormation />
            </aside>

            <Navbar1 />

            {props.load === "Home" && <HomePage />} 
            
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default BeneficiaireFormationDashboard;
