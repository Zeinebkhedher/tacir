import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";
import Sidebar from "../../components/sideBar/SideBar";

import "../admin/adminDashboard.css";
import HomePage from "../home/HomePage";

import CompteInterface from "../../components/compteInterface/CompteInterface";
import AccountRegister from "../../components/comptes/AccountRegister";
import CreathonInterface from "../../components/creathonInterface/CreathonInterface";
import CreathonList from "../../components/creathonList/CreathonList";
import CreateFormation from "../../components/formations/CreateFormation";
import SinscrireFormation from "../../components/formations/SinscrireFormation";
import InterfaceDemandeCreathon from "../../components/inetrfaceDemandeCreathon/InterfaceDeamndeCreathon";
import FormationPage from "../formation/FormationPage";
import MentorListInterface from "../mentor/mentorListInterface/MentorListInterface";

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
            {props.load === "mentorList" && <MentorListInterface/>}
            {props.load === "AcountRegister" && <AccountRegister />}
            {props.load === "formation" && <FormationPage />}
            {props.load === "createFormation" && <CreateFormation />}
            {props.load === "creathonForm" && <CreathonInterface />}
            {props.load === "creathonList" && <CreathonList />}
            {props.load === "demande_candidature_creathon" && <InterfaceDemandeCreathon />}

            {props.load === "parametresComptes" && <CompteInterface />}



            {props.load === "sinscrireFormation" && <SinscrireFormation />}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
