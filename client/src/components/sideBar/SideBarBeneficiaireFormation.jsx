{/*import { NavLink } from "react-router-dom";

function SideBarBeneficiaireFormation() {
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
     {/* <li className="menu-item active">
        <a href="index.html" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle" />
          <div data-i18n="Analytics">Dashboard</div>
        </a>
      </li>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Pages</span>
      </li>
      <NavLink to="/dashboard/coordinateurGeneral/Home">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Home</div>
          </a>
        </li>
      </NavLink>
      {/* Concerts */}
 {/*    <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Calendrier </span>
      </li>

      <NavLink to="/dashboard/beneficiaire/calandrier">
        <li className="menu-item">
          <a href="javascript:void(0);" className="menu-link menu-toggle">
            <i className="menu-icon tf-icons bx bx-dock-top" />
            <div data-i18n="Account Settings">Calendrier des formations</div>
          </a>
        </li>
      </NavLink>


     

      {/* gestion des compte */}
   {/*   <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Comptes</span>
      </li>

      <NavLink
        to="/dashboard/beneficiaraie/profile/parametresComptes"
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

export default SideBarBeneficiaireFormation;
*/}   