import React from "react";
import Sidebar from "../../components/sideBar/SideBar";
import Navbar1 from "../../components/navBar1/NavBar1";

import "../admin/adminDashboard.css";
import HomePage from "../home/HomePage";

import MentorListInterface from "../mentor/mentorListInterface/MentorListInterface";
import FormationPage from "../formation/FormationPage";
import CreateFormation from "../../components/formations/CreateFormation";
import SinscrireFormation from "../../components/formations/SinscrireFormation";

const AdminDashboard = (props) => {
  return (
    <div>
      <div>
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <Sidebar />
            </aside>

            <Navbar1 />

            {props.load === "home" && <HomePage />}
            {props.load === "mentorList" && <MentorListInterface />}
            {props.load === "formation" && <FormationPage />}
            {props.load === "createFormation" && <CreateFormation />}
            {props.load === "sinscrireFormation" && <SinscrireFormation />}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
