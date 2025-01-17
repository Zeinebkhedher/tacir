import { NavLink } from "react-router-dom";

function SideBarBeneficiare() {
  /*function goup() {
    var scrollStep = -window.scrollY / (400 / 15),
      scrollInterval = setInterval(function () {
        if (window.scrollY != 0) {
          window.scrollBy(0, scrollStep);
        } else clearInterval(scrollInterval);
      }, 15);*/
  
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
      <NavLink to="/dashboard/beneficiaire/home">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Home</div>
    </a>
  </li>
</NavLink>

{/* Concerts */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Formations</span>
</li>

<NavLink to="/dashboard/beneficiaire/Formations/FormationList">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste Formation</div>
    </a>
  </li>
</NavLink>

<NavLink to="/dashboard/beneficiaire/formations">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Formations</div>
    </a>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Planning</span>
</li>

<NavLink to="/dashboard/beneficiaire/calendrier">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Calendrier</div>
    </a>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Compte</span>
</li>

<NavLink to="/dashboard/beneficiaire/Formations/FormationList">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Paramètres</div>
    </a>
  </li>
</NavLink>

    </ul>
  );
}

export default SideBarBeneficiare;
