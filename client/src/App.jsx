//import Login from "./routes/Login";
import PresenceConcert from "./routes/PresenceConcert";
import PresenceRepetition from "./routes/PresenceRepetititon";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./assets/css/demo.css";
import "./assets/vendor/css/core.css";
import "./assets/vendor/css/theme-default.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ChefPupitreDashboard from "./pages/chefPupitre/ChefPupitreDashboard";
import ChoristeDashboard from "./pages/choriste/ChoristeDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import FormCandidature from "./pages/FormCandidature";
import Login from "./pages/login/Login";
import EmailVerification from "./components/verify/EmailVerification";
import HomePage from "./pages/admin/pages/HomePage";
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
        </Routes>
      </>
    </Router>
  );
};

export default App;
