import {
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import "./assets/css/demo.css";
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import SinscrireFormation from "./components/formations/SinscrireFormation";
import EmailVerification from "./components/verify/EmailVerification";
import BeneficiaireDashboard from "./pages/Beneficiaire/BeneficiaireDashboard";
import InscriptionForm from "./pages/Beneficiaire/FormInscriptionFormation";
import FormationBeneficiaire from "./pages/Beneficiaire/SinscrireFormationBeneficiare";
import CoordinateurComposanteDashboard from "./pages/CoordinateurComposante/CoordinateurComposanteDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CandidatDashboard from "./pages/candidat/CandidatDashbord";
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
            path="/dashboard/candidat/Home"
            element={<CandidatDashboard load="Home" />}
          />
          <Route
            exact
            path="/dashboard/candidat/ListeProjets/addProject"
            element={<CandidatDashboard load="addProject" />}
          />
          <Route
            path="/dashboard/candidat/creathonForm"
            element={<CandidatDashboard load="creathonForm" />}
          />
          <Route
            path="/dashboard/candidat/profile/parametresComptes"
            element={<CandidatDashboard load="parametre" />}
          />
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
            path="/candidatFormulaire"
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
            path="/dashboard/coordinateurGeneral/register"
            element={<CoordinateurGeneralDashboard load="AcountRegister" />}
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
          exact
            path="/dashboard/coordinateurGeneral/calendrier"
            element={<CoordinateurGeneralDashboard load="calendrier" />}
          />
          <Route
            path="/dashboard/potreur-de-projet/p/parametresComptes"
            element={<PorteurProjetDashboard load="parametresComptes" />}
          />
          <Route
            exact
            path="/dashboard/porteur-de-projet"
            element={<PorteurProjetDashboard />}
          />
          <Route
            exact
            path="/dashboard/porteur-de-projet/home"
            element={<PorteurProjetDashboard load="Home" />}
          />
          <Route
            path="/dashboard/coordinateurGeneral/profile/parametresComptes"
            element={<CoordinateurGeneralDashboard load="parametresComptes" />}
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
            path="/dashboard/porteurProjet/Formations/UpcomingFormations"
            element={<PorteurProjetDashboard load="upcomingFormations" />}
          />
          <Route
            path="/dashboard/porteurProjet/ListeProjets/evaluation"
            element={<PorteurProjetDashboard load="Evaluation" />}
          />
          <Route
            path="/formations/sinscrire/:formationId"
            element={<SinscrireFormation />}
          />
          <Route
            path="/formations/sinscrireBeneficiaire/:formationId"
            element={<InscriptionFormWrapper />}
          />
          <Route path="/formations" element={<FormationBeneficiaire />} />
          <Route path="/formations" element={<FormationBeneficiaire />} />
          <Route
            path="/dashboard/potreur-de-projet/calendrier"
            element={
              <PorteurProjetDashboard load="PlannigAccompagnementInterface" />
            }
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
            path="/dashboard/porteurProjet/Rendu/depot"
            element={<PorteurProjetDashboard load="deposerRendu" />}
          />
          <Route
            path="/dashboard/porteurProjet/AcceptedCreathonsList"
            element={<PorteurProjetDashboard load="AcceptedCreathonsList" />}
          />
          <Route
            path="/dashboard/porteurProjet/projet/MonProjet"
            element={<PorteurProjetDashboard load="Monprojet" />}
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
          <Route
            path="/dashboard/Mentor/Rendu/espaceDepot"
            element={<MentorDashboard load="espaceDepot" />}
          />
          <Route
            path="/dashboard/mentor/besoinsListes"
            element={<MentorDashboard load="ListeBesoins" />}
          />
          <Route
            path="/dashboard/Mentor/Rendu/listeRendu"
            element={<MentorDashboard load="ListeRendu" />}
          />
          <Route
            path="/dashboard/Mentor/projets/Evaluations"
            element={<MentorDashboard load="ListeEvaluations" />}
          />
          <Route
            path="/dashboard/Mentor/ListInovProjects"
            element={<MentorDashboard load="ListInovProjects" />}
          />
          <Route
            path="/dashboard/Mentor/ListCreaProjects"
            element={<MentorDashboard load="ListCreaProjects" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurRegional/Home"
            element={<CoordinateurRegionalDashboard load="Home" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurRegional/creerFormation"
            element={<CoordinateurRegionalDashboard load="creerFormation" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurRegional/ListFormation"
            element={<CoordinateurRegionalDashboard load="ListFormation" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurRegional/projetInov"
            element={<CoordinateurRegionalDashboard load="projetInov" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurRegional/projetCrea"
            element={<CoordinateurRegionalDashboard load="projetCrea" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurRegional/listMentorat"
            element={<CoordinateurRegionalDashboard load="listMentorat" />}
          />
          <Route
            path="/dashboard/coordinateurRegional/profile/parametresComptes"
            element={<CoordinateurRegionalDashboard load="parametresComptes" />}
          />
           <Route
            path="/dashboard/coordinateurRegional/AcountRegister"
            element={<CoordinateurRegionalDashboard load="AcountRegister" />}
          /> 
          <Route
            path="/dashboard/coordinateurRegional/mentorList"
            element={<CoordinateurRegionalDashboard load="mentorList" />}
          /> 
           <Route
            path="/dashboard/coordinateurRegional/ListeCandidats"
            element={<CoordinateurRegionalDashboard load="ListeCandidats" />}
          />
           <Route
            path="/dashboard/coordinateurRegional/creathons"
            element={<CoordinateurRegionalDashboard load="creathonList" />}
          />  
           <Route
            path="/dashboard/coordinateurRegional/creathon"
            element={<CoordinateurRegionalDashboard load="creathon" />}
          />  
           <Route
            path="/dashboard/coordinateurRegional/demande_candidature_creathon"
            element={<CoordinateurRegionalDashboard load="demande_candidature_creathon" />}
          />
          <Route
            path="/dashboard/coordinateurRegional/ListeProjets"
            element={<CoordinateurRegionalDashboard load="ListeProject" />}
          />
          <Route
            path="/dashboard/coordinateurComposante/ListeProjets"
            element={<CoordinateurComposanteDashboard load="ListeProject" />}
          />
          <Route
            path="/dashboard/coordinateurComposante/profile/parametresComptes"
            element={
              <CoordinateurComposanteDashboard load="parametresComptes" />
            }
          />
          <Route
            path="/dashboard/coordinateurComposante/ListeCandidats"
            element={<CoordinateurComposanteDashboard load="ListeCandidats" />}
          />
          <Route
            path="/dashboard/coordinateurComposante/mentorList"
            element={<CoordinateurComposanteDashboard load="mentorList" />}
          />
          <Route
            path="/dashboard/coordinateurComposante/ListMentorat"
            element={<CoordinateurComposanteDashboard load="ListMentorat" />}
          />
          <Route
            path="/dashboard/coordinateurComposante/projets/Evaluations"
            element={
              <CoordinateurComposanteDashboard load="ListeEvaluations" />
            }
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/Home"
            element={<CoordinateurComposanteDashboard load="Home" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/listeFormations"
            element={<CoordinateurComposanteDashboard load="listeFormations" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/ListeProjets/inov"
            element={<CoordinateurComposanteDashboard load="projetInov" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/ListeProjets/crea"
            element={<CoordinateurComposanteDashboard load="projetCrea" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/contact"
            element={<CoordinateurComposanteDashboard load="contact" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/demanderRendu"
            element={<CoordinateurComposanteDashboard load="demanderRendu" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/ListRendu"
            element={<CoordinateurComposanteDashboard load="ListRendu" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/createFormation"
            element={<CoordinateurComposanteDashboard load="createFormation" />}
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/upcomingFormation"
            element={
              <CoordinateurComposanteDashboard load="upcomingFormation" />
            }
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/planifierReunion"
            element={
              <CoordinateurComposanteDashboard load="planifierReunion" />
            }
          />
          <Route
            exact
            path="/dashboard/coordinateurComposante/planifierMentorat"
            element={
              <CoordinateurComposanteDashboard load="planifierMentorat" />
            }
          />

<Route
            path="/dashboard/coordinateurComposante/calendrier"
            element={<CoordinateurComposanteDashboard load="calendrier" />}
          />
          <Route
            path="/dashboard/beneficiaire/home"
            element={<BeneficiaireDashboard load="Home" />}
          />
          <Route
            path="/dashboard/beneficiaire/formations"
            element={<BeneficiaireDashboard load="ALLformation" />}
          />
          <Route
            path="/dashboard/beneficiaire/Formations/FormationList"
            element={<BeneficiaireDashboard load="FormationList" />}
          />
           <Route
            path="/dashboard/beneficiaire/calendrier"
            element={<BeneficiaireDashboard load="calendrier" />}
          />
        </Routes>
      </>
    </Router>
  );
};
function InscriptionFormWrapper() {
  const { formationId } = useParams();
  return <InscriptionForm formationId={formationId} />;
}
export default App;
