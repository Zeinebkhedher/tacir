import { Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import TacirLogo from "../../components/img/tacir_logo.jpg"
function SideBarPoreturProjet() {
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
      <NavLink to="/dashboard/potreur-de-projet/home">
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
      <NavLink to="/dashboard/potreur-de-projet/formulaire">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Formulaire</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/potreur-de-projet/projets">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Liste de projets</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/potreur-de-projet/calendrier">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Calendrier d'accompagnement</div>
          </a>
        </li>
      </NavLink>
      <NavLink to="/dashboard/potreur-de-projet/depotsRendus">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Dépot des rendus</div>
          </a>
        </li>
      </NavLink>
     
      

     
     
     
     
      {/* gestion des compte */}
      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Compte</span>
      </li>
      <NavLink to="/dashboard/potreur-de-projet/profile" onClick={goup}>
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Paramétres du compte</div>
          </a>
        </li>
      </NavLink>
    </ul>
  );
}

export default SideBarPoreturProjet;
