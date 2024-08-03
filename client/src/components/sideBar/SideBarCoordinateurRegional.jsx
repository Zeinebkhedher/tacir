import { NavLink } from "react-router-dom";

function SidebarCoordinateurRegional() {
  function goup() {
    var scrollStep = -window.scrollY / (400 / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);
  }
  return (
    <ul className="menu-inner py-1">
      {/* Dashboard */}
      <li className="menu-item active">
        <a href="index.html" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle" />
          <div data-i18n="Analytics">Dashboard</div>
        </a>
      </li>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Pages</span>
      </li>
      <NavLink to="/dashboard/coordinateurRegional/Home">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Home</div>
          </a>
        </li>
      </NavLink>
      {/* Concerts */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Projets</span>
      </li>

      <NavLink to="/dashboard/coordinateurRegional/ListeProjets">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste projets</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/coordinateurRegional/projetInov">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">projets Inov</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/coordinateurRegional/projetCrea">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">projets Crea</div>
          </a>
        </li>
      </NavLink>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Sessions de mentorats</span>
      </li>

      <NavLink to="/dashboard/coordinateurRegional/listMentorat">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste des mentorats</div>
          </a>
        </li>
      </NavLink>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Cearthons</span>
      </li>

      <NavLink to="/dashboard/coordinateurRegional/creathons">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">creathons</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/coordinateurRegional/creathon">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste des creathons</div>
          </a>
        </li>
      </NavLink>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text"> Formations</span>
      </li>
      <NavLink
        to="/dashboard/coordinateurRegional/creerFormation"
        onClick={goup}
      >
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Créer formation</div>
          </a>
        </li>
      </NavLink>
      <NavLink
        to="/dashboard/coordinateurRegional/ListFormation"
        onClick={goup}
      >
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste formations</div>
          </a>
        </li>
      </NavLink>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Membres de TACIR</span>
      </li>
      <NavLink
        to="/dashboard/coordinateurRegional/ListeCandidats"
        onClick={goup}
      >
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste des candidatures</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/coordinateurRegional/mentorList" onClick={goup}>
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste des mentors</div>
          </a>
        </li>
      </NavLink>

      {/* gestion des compte */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Comptes</span>
      </li>
      <NavLink
        to="/dashboard/coordinateurRegional/AcountRegister"
        onClick={goup}
      >
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Création des comptes</div>
          </a>
        </li>
      </NavLink>
      <NavLink
        to="/dashboard/coordinateurRegional/profile/parametresComptes"
        onClick={goup}
      >
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Paramètres</div>
          </a>
        </li>
      </NavLink>
    </ul>
  );
}

export default SidebarCoordinateurRegional;
