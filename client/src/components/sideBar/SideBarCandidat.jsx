import { NavLink } from "react-router-dom";

function SidebarCandidat() {
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
      <li className="menu-item active">
        <a href="index.html" className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle" />
          <div data-i18n="Analytics">Dashboard</div>
        </a>
      </li>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Pages</span>
      </li>
      <NavLink to="/dashboard/candidat/home">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Home</div>
    </a>
  </li>
</NavLink>

{/* Projets */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Projets</span>
</li>

<NavLink to="/dashboard/candidat/ListeProjets/addProject">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Ajouter votre projet</div>
    </a>
  </li>
</NavLink>

{/* Cearthons */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Cearthons</span>
</li>

<NavLink to="/dashboard/candidat/creathonForm">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">S'inscrire creathon</div>
    </a>
  </li>
</NavLink>

{/* Gestion des comptes */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Comptes</span>
</li>

<NavLink to="/dashboard/candidat/profile/parametresComptes" onClick={goup}>
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

export default SidebarCandidat;
