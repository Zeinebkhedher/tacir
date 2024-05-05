import React from "react";
import Navbar1 from "../../components/navBar1/NavBar1";
import Sidebar from "../../components/sideBar/SideBar";

import "../admin/adminDashboard.css";
import HomePage from "../home/HomePage";

import CompteInterface from "../../components/compteInterface/CompteInterface";
import AccountRegister from "../../components/comptes/AccountRegister";
import CreathonInterface from "../../components/creathonInterface/CreathonInterface";
import CreathonListInterface from "../../components/creathonListInterface/CreathonListInterface";
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
            {props.load === "creathonForm" && <CreathonInterface />}
            {props.load === "creathonList" && <CreathonListInterface />}
            {props.load === "parametresComptes" && <CompteInterface />}



            {/*{props.load === "adminAudition" && <AdminAudition />}
            {props.load === "Concert" && <Concert />}
            {props.load === "nouvelleSaison" && <NouvelleSaison />}
            {props.load === "saisonActuelle" && <SaisonActuelle />}
            {props.load === "auditionAddInfo" && <AdminAuditionInfo />}
            {props.load === "archives" && <Archive />}
            {props.load === "candidatesList" && <CandidatesList />}
            {props.load === "updateAudition" && <AuditionUpdate />}
            {props.load === "ListeOeuvres" && <ListeOeuvres />}
            {props.load === "AddOeuvre" && <AddOeuvre />}
            {props.load === "ListeCandidatesParPupitre" && (
              <ListeCandidatesParPupitre />
            )}
            {props.load === "genererPlanning" && <PlanningAudition />}
            {props.load === "absenceRep" && <AbsenceRepetition />}
            {props.load === "candidatesListV2" && <CandidatesListV2 />}
            {props.load === "AcountRegister" && <AcountRegister />}*/}
        
        
        
          </div>
          
      
         
          
          <div className="layout-overlay layout-menu-toggle" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
