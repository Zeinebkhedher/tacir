import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/css/demo.css";
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import EmailVerification from "./components/verify/EmailVerification";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FormCandidature from "./pages/candidat/FormCandidature";
import CoordinateurGeneralDashboard from "./pages/coordinateurGeneral/CoordinateurGeneralDashboard";
import CoordinateurRegionalDashboard from "./pages/coordinateurRegional/CoordinateurRegionalDashboard";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import PorteurProjetDashboard from "./pages/porteurProjet/PorteurProjetDashboard";
const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route
            exact
            path="/emailVerification"
            element={<EmailVerification />}
          />
          <Route
            exact
            path="/candidats/:id/verify/:token"
            element={<FormCandidature />}
          />
          <Route
            exact
            path="/candidatFormulaire  "
            element={<FormCandidature />}
          />
          <Route
            path="/dashboard/admin/formations/createFormation"
            element={<AdminDashboard load="createFormation" />}
          />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          <Route
            path="/dashboard/admin/accounts/register"
            element={<AdminDashboard load="AcountRegister" />}
          />
          <Route
            exact
            path="/dashboard/admin/Home"
            element={<AdminDashboard load="Home" />}
          />
          <Route
            path="/dashboard/admin/mentorList"
            element={<AdminDashboard load="mentorList" />}
          />
          <Route
            path="/dashboard/admin/creathonForm"
            element={<AdminDashboard load="creathonForm" />}
          />
           <Route
            path="/dashboard/admin/PorteurProjetListe"
            element={<AdminDashboard load="PorteurProjetListe" />}
          />

          <Route
            path="/dashboard/admin/coordinateurRegionalListe"
            element={<AdminDashboard load="coordinateurRegionalListe" />}
          />
          
          <Route
            path="/dashboard/admin/formations"
            element={<AdminDashboard load="formation" />}
          />
          <Route
            path="/dashboard/admin/CoordinateurGeneraleInterface"
            element={<AdminDashboard load="CoordinateurGeneraleInterface" />}
          />

          <Route
            path="/dashboard/admin/creathonList"
            element={<AdminDashboard load="creathonList" />}
          />  

<Route
            exact
            path="/dashboard/admin/listesCandidats"
            element={<AdminDashboard load="ListeCandidats" />}
          />

          
          <Route
            path="/dashboard/admin/demande_candidature_creathon"
            element={<AdminDashboard load="demande_candidature_creathon" />}
          />
          <Route
            path="/dashboard/admin/parametresComptes"
            element={<AdminDashboard load="parametresComptes" />}
          />
          <Route exact path="/dashboard/mentor" element={<MentorDashboard />} />
          <Route
            exact
            path="/dashboard/coordinateurGeneral/Home"
            element={<CoordinateurGeneralDashboard load="Home" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurGeneral/listesCandidats"
            element={<CoordinateurGeneralDashboard load="ListeCandidats" />}
          />
           <Route
            exact
            path="/dashboard/coordinateurGeneral/mentorList"
            element={<CoordinateurGeneralDashboard load="mentorList" />}
          />
          <Route
            path="/dashboard/coordinateurGeneral/ListeProjets"
            element={<CoordinateurGeneralDashboard load="ListeProject" />}
          />
          <Route
            path="/dashboard/coordinateurGeneral/creathons"
            element={<CoordinateurGeneralDashboard load="creathonList" />}
          />
          <Route
            path="/dashboard/coordinateurRegional/profile/parametresComptes"
            element={<CoordinateurRegionalDashboard load="parametresComptes" />}
          />
          <Route
            path="/dashboard/coordinateurGeneral/profile/parametresComptes"
            element={<PorteurProjetDashboard load="parametresComptes" />}
          />
          <Route
            exact
            path="/dashboard/porteur-de-projet"
            element={<PorteurProjetDashboard />}
          />
            

          <Route
            path="/dashboard/potreur-de-projet/profile/parametresComptes"
            element={<PorteurProjetDashboard load="parametresComptes" />}
          />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          
          
          <Route
            path="/dashboard/porteurProjet/ListeProjets"
            element={<PorteurProjetDashboard load="ListeProjet" />}
          />
          <Route
            path="/dashboard/porteurProjet/creathonsList"
            element={<PorteurProjetDashboard load="creathonList" />}
          />
          <Route
            path="/dashboard/porteurProjet/ListeProjets/addProject"
            element={<PorteurProjetDashboard load="AddProject" />}
          />
          <Route
            path="/dashboard/porteurProjet/Formations/UpcomingFormations"
            element={<PorteurProjetDashboard load="upcomingFormations" />}
          />
          <Route
            path="/dashboard/porteurProjet/ListeProjets/evaluation"
            element={<PorteurProjetDashboard load="Evaluation" />}
          />
          <Route
            path="/dashboard/porteurProjet/formations/sinscrire/:formationId"
            element={<PorteurProjetDashboard load="sinscrireFormation" />}
          />
          <Route
            path="/dashboard/potreur-de-projet/besoinAccompagnement"
            element={<PorteurProjetDashboard load="besoinAccompagnement" />}
          />
           <Route
            path="/dashboard/porteurProjet/formations"
            element={<PorteurProjetDashboard load="AllFormation" />}
          />
          <Route
            path="/dashboard/porteurProjet/contact"
            element={<PorteurProjetDashboard load="contact" />}
          />
          <Route
            path="/dashboard/Mentor/ListeProjets"
            element={<MentorDashboard load="ListeProject" />}
          />
          <Route
            path="/dashboard/Mentor/ListeProjets/EvaluateProject"
            element={<MentorDashboard load="EvaluateProject" />}
          />{" "}
          <Route
            path="/dashboard/Mentor/ListeProjets/Evaluations"
            element={<MentorDashboard load="Evaluations" />}
          />
          <Route
            path="/dashboard/Mentor/profile"
            element={<MentorDashboard load="Profil" />}
          />
          <Route
            path="/dashboard/Mentor/syntheseInterface"
            element={<MentorDashboard load="syntheseInterface" />}
          />
          <Route
            path="/dashboard/Mentor/ListeCandidatCreathonAcceptes"
            element={<MentorDashboard load="ListeCandidatCreathonAcceptes" />}
          />
          
          <Route
            path="/dashboard/Mentor/updateprofile"
            element={<MentorDashboard load="updateprofil" />}
          />
          <Route
            path="/dashboard/Mentor/contact"
            element={<MentorDashboard load="contact" />}
          />
        </Routes>
      </>
    </Router>
  );
};

export default App;
