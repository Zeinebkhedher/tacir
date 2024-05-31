import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";
import Profile from "../../components/profil/Profile";
import UpdateProfile from "../../components/profil/UpdateProfile";
import EvaluateProject from "../../components/projects/EvaluateProject";
import ListeProjects from "../../components/projects/ListeProjects";
import SideBarMentor from "../../components/sideBarMentor/SideBarMentor";
import HomePage from "../home/HomePage";
import Contact from "../../components/Contact/Contact";
import EvaluationTable from "../../components/projects/Evaluation";

const MentorDashboard = (props) => {
  return (
    <div>
      <div>
        {/* Layout wrapper */}
        <div className="layout-wrapper layout-content-navbar">
          <div className="layout-container">
            {/* Menu */}
            <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SideBarMentor />
            </aside>
            <Navbar1 />
            {props.load === "home" && <HomePage />}
            {props.load === "ListeProject" && <ListeProjects />}
            {props.load === "EvaluateProject" && <EvaluateProject />}
            {props.load === "Profil" && <Profile />}
            {props.load === "updateprofil" && <UpdateProfile />}
            {props.load === "contact" && <Contact />}
            {props.load === "Evaluations" && <EvaluationTable />}
          </div>
          {/* Overlay */}
          <div className="layout-overlay layout-menu-toggle" />
        </div>
        {/* / Layout wrapper */}
      </div>
    </div>
  );
};

export default MentorDashboard;
