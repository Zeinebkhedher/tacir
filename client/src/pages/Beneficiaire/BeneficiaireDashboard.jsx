import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";
import Sidebar from "../../components/sideBar/SideBar";

import "../admin/adminDashboard.css";
import HomePage from "../home/HomePage";
import FormationPage from "../formation/FormationPage";
import SinscrireFormation from "../../components/formations/SinscrireFormation";
import SideBarBeneficiare from "../../components/sideBar/SideBarBeneficiaire";
import AllFormationPage from "../formation/AllFormationPage";
import FormationList from "../../components/formations/UpcomingFormations";

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
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default BeneficiaireDashboard;
