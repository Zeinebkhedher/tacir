import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";

import CompteInterface from "../../components/compteInterface/CompteInterface";
import AccountRegister from "../../components/comptes/AccountRegister";
import CreathonInterface from "../../components/creathonInterface/CreathonInterface";
import CreathonList from "../../components/creathonList/CreathonList";
import CreateFormation from "../../components/formations/CreateFormation";
import InterfaceDemandeCreathon from "../../components/inetrfaceDemandeCreathon/InterfaceDeamndeCreathon";
import ListMentorat from "../../components/Mentorat/ListMentorat";
import CreaProjects from "../../components/projects/ListCreaProjects";
import ListeProjects from "../../components/projects/ListeProjects";
import InovProjects from "../../components/projects/ListInovProjects";
import SidebarCoordinateurRegional from "../../components/sideBar/SideBarCoordinateurRegional";
import ListeCandidatsPage from "../candidat/ListeCandidatsPage";
import FormationPage from "../formation/FormationPage";
import HomePage from "../home/HomePage";
import MentorListInterface from "../mentor/mentorListInterface/MentorListInterface";
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

            {props.load === "Home" && <HomePage />}
            {props.load === "AcountRegister" && <AccountRegister />}
            {props.load === "parametresComptes" && <CompteInterface />}
            {props.load === "mentorList" && <MentorListInterface />}
            {props.load === "ListeCandidats" && <ListeCandidatsPage />}
            {props.load === "creathonList" && <CreathonInterface />}
            {props.load === "creathon" && <CreathonList />}
            {props.load === "demande_candidature_creathon" &&
              <InterfaceDemandeCreathon />
            }
            {props.load === "ListeProject" && <ListeProjects />}
            {props.load === "creerFormation" && <CreateFormation />}
            {props.load === "ListFormation" && <FormationPage />}
            {props.load === "projetCrea" && <CreaProjects />}
            {props.load === "projetInov" && <InovProjects />}
            {props.load === "listMentorat" && <ListMentorat />}
          </div>

          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default CoordinateurRegionalDashboard;
