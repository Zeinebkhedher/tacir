import { NavLink } from "react-router-dom";
import TacirLogo from "../../assets/img/tacir_logo.jpg";
function SideBarMentor() {
  function goup() {
    var scrollStep = -window.scrollY / (400 / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  }
  return (
    <ul className="menu-inner py-1">
      {/* Dashboard */}
      <img
        src={TacirLogo}
        style={{
          maxWidth: "50%",
          height: "auto",
          display: "block",
          margin: "0 auto",
        }}
      />

      <li className="menu-item active">
        <a href="index.html" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle" />

          <div data-i18n="Analytics">Dashboard</div>
        </a>
      </li>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Pages</span>
      </li>
      <NavLink to="/dashboard/admin/home">
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Home</div>
    </a>
  </li>
</NavLink>

{/* Créathons */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Créathons</span>
</li>

<NavLink to="/dashboard/Mentor/ListeCandidatCreathonAcceptes">
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste de candidats acceptés</div>
    </a>
  </li>
</NavLink>

<NavLink to="/dashboard/Mentor/syntheseInterface">
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Synthèse</div>
    </a>
  </li>
</NavLink>

{/* Projets */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Projets</span>
</li>

<NavLink to="/dashboard/Mentor/ListInovProjects">
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste Projets INOV</div>
    </a>
  </li>
</NavLink>

<NavLink to="/dashboard/Mentor/ListCreaProjects">
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste Projets CREA</div>
    </a>
  </li>
</NavLink>

<NavLink to="/dashboard/Mentor/ListeProjets">
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Evaluation de projets</div>
    </a>
  </li>
</NavLink>

<NavLink to="/dashboard/Mentor/ListeProjets/Evaluations">
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des évaluations</div>
    </a>
  </li>
</NavLink>

{/* Espace de dépôt */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Espace de dépôt</span>
</li>

<NavLink to="/dashboard/Mentor/Rendu/espaceDepot" onClick={goup}>
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Session des rendus</div>
    </a>
  </li>
</NavLink>

<NavLink to="/dashboard/Mentor/Rendu/listeRendu" onClick={goup}>
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des rendus</div>
    </a>
  </li>
</NavLink>

{/* Compte */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Compte</span>
</li>

<NavLink to="/dashboard/mentor/profile" onClick={goup}>
  <li className="menu-item">
    <a href="javascript:void(0);" className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Paramètres du compte</div>
    </a>
  </li>
</NavLink>

    </ul>
  );
}

export default SideBarMentor;
