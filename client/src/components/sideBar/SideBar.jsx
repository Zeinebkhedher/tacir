import { NavLink } from "react-router-dom";
import TacirLogo from "../../assets/img/tacir_logo.jpg";
function Sidebar() {
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
      <img src ={TacirLogo} style={{ maxWidth: '50%', height: 'auto', display: 'block', margin: '0 auto' }} />

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
      {/* Concerts */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Cearthons</span>
      </li>
      <NavLink to="/dashboard/admin/creathonForm">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Lancer créathons</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/admin/gereComptes">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Gérer projets</div>
          </a>
        </li>
      </NavLink>
      

     
      <NavLink to="/dashboard/admin/creathonList">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">
              Générer un planning des créathons
            </div>
          </a>
        </li>
      </NavLink>
      {/* auditions */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Membres de TACIR</span>
      </li>
      <NavLink to="/dashboard/admin/Candidature/list" onClick={goup}>
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste des candidatures</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/admin/mentorList" onClick={goup}>
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste des mentors</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/admin/repetition/liste-absence">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Listes des absences </div>
          </a>
        </li>
      </NavLink>
      
     
      {/* gestion des compte */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Comptes</span>
      </li>
      <NavLink to="/dashboard/admin/accounts/register" onClick={goup}>
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Création des comptes</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/admin/parametresComptes" onClick={goup}>
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

export default Sidebar;
