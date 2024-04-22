
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
import Login from "./pages/login/Login"
import EmailVerification from "./components/verify/EmailVerification"
const App = () => {
  return (
    <Router>
      <>
        <Routes>
          <Route exact path="/" element={<Login />} />
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
          <Route exact path="/candidatsFormulaire  " element={<FormCandidature />} />

          {/* <Route exact path="/presence/cancert/:idC" element={<PresenceConcert />} />
          <Route exact path="/presence/repetition/:idR" element={<PresenceRepetition />} /> */}
          
          <Route
            exact
            path="/dashboard/admin"
            element={<AdminDashboard />}
          />
           <Route
            path="/dashboard/admin/accounts/register"
            element={<AdminDashboard load="AcountRegister" />}
          />

          
          {/* <Route
            exact
            path="/dashboard/manager"
            element={<ManagerDashboard />}
          />
          <Route
            exact
            path="/dashboard/choriste"
            element={<ChoristeDashboard />}
          />
          <Route
            exact
            path="/dashboard/chef-de-pupitre"
            element={<ChefPupitreDashboard />}
          />
          <Route exact path="/dashboard/admin" element={<AdminDashboard />} />
          
          <Route
            exact
            path="/presence/cancert/:idC"
            element={<PresenceConcert />}
          />
          <Route
            exact
            path="/presence/repetition/:idR"
            element={<PresenceRepetition />}
          /> */}
        </Routes>
      </>
    </Router>
  );
};

export default App;
