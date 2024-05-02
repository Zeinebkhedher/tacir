import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/demo.css";
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import FormCandidature from "./pages/candidat/FormCandidature";
import Login from "./pages/login/Login";
import EmailVerification from "./components/verify/EmailVerification";
import HomePage from "./pages/home/HomePage";
import MentorDashboard from "./pages/mentor/MentorDashboard";
import PorteurProjetDashboard from "./pages/porteurProjet/PorteurProjetDashboard";
import CoordinateurGeneralDashboard from "./pages/coordinateurGeneral/CoordinateurGeneralDashboard";
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
            path="/candidatsFormulaire  "
            element={<FormCandidature />}
          />

          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          <Route
            path="/dashboard/admin/accounts/register"
            element={<AdminDashboard load="AcountRegister" />}
          />
          <Route
            path="/dashboard/admin/mentorList"
            element={<AdminDashboard load="mentorList" />}
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
            path="/dashboard/porteur-de-projet"
            element={<PorteurProjetDashboard />}
          />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />

          <Route
            path="/dashboard/porteurProjet/ListeProjets"
            element={<PorteurProjetDashboard load="ListeProjet" />}
          />
          <Route
            path="/dashboard/porteurProjet/ListeProjets/addProject"
            element={<PorteurProjetDashboard load="AddProject" />}
          />
          <Route
            path="/dashboard/porteurProjet/ListeProjets/evaluation"
            element={<PorteurProjetDashboard load="Evaluation" />}
          />
          <Route
            path="/dashboard/Mentor/ListeProjets"
            element={<MentorDashboard load="ListeProject" />}
          />
          <Route
            path="/dashboard/Mentor/ListeProjets/EvaluateProject"
            element={<MentorDashboard load="EvaluateProject" />}
          />
        </Routes>
      </>
    </Router>
  );
};

export default App;
