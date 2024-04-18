import React from "react";
import Sidebar from "../../components/sideBar/SideBar";
import Navbar1 from "../../components/navBar1/NavBar1";

import "../admin/adminDashboard.css";
import HomePage from "./pages/HomePage";
<<<<<<< HEAD
=======
import AccountRegister from "../../components/comptes/AccountRegister";
>>>>>>> ae1b9c2f1706811650329d9869b7f361bfe56904


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
<<<<<<< HEAD
=======
             {props.load === "AcountRegister" && <AccountRegister />}
>>>>>>> ae1b9c2f1706811650329d9869b7f361bfe56904


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
