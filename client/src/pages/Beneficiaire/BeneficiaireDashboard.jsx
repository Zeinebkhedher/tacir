import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import FormationList from "../../components/formations/UpcomingFormations";
import PlannigBeneficiare from "../../components/plannigBeneficiare/PlannigBeneficiare";
import SideBarBeneficiare from "../../components/sideBar/SideBarBeneficiaire";
import "../admin/adminDashboard.css";
import AllFormationPage from "../formation/AllFormationPage";
import HomePage from "../home/HomePage";

const BeneficiaireDashboard = (props) => {
  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SideBarBeneficiare />
            </aside>

            <Navbar1 />

            {props.load === "Home" && <HomePage />}

            {props.load === "ALLformation" && <AllFormationPage />}

            {props.load === "FormationList" && <FormationList />}
            {props.load === "calendrier" && <PlannigBeneficiare />}

          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default BeneficiaireDashboard;
