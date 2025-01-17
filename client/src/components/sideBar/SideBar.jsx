import { NavLink } from "react-router-dom";
import TacirLogo from "../../assets/img/tacir_logo.jpg";
function Sidebar() {
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
      
      <img
        src={TacirLogo}
        alt="Tacir Logo"
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
      <NavLink to="/dashboard/admin/Home" className="menu-item">
  <li className="menu-item">
    <a className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Home</div>
    </a>
  </li>
</NavLink>

      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Candidatures</span>
      </li>
      <NavLink to="/dashboard/admin/listesCandidats" className="menu-item">
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des candidtures</div>
    </div>
  </li>
</NavLink>


      <li className="menu-header small text-uppercase">
        <span className="menu-header-text">Cearthons</span>
      </li>
      <NavLink to="/dashboard/admin/creathonForm" className="menu-item">
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Lancer créathons</div>
    </div>
  </li>
</NavLink>

<NavLink to="/dashboard/admin/creathonList" className="menu-item">
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Générer un planning des créathons</div>
    </div>
  </li>
</NavLink>

<NavLink to="/dashboard/admin/demande_candidature_creathon" className="menu-item">
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Demande candidature créathons</div>
    </div>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Formations</span>
</li>

<NavLink to="/dashboard/admin/formations" className="menu-item">
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Gérer Formations</div>
    </div>
  </li>
</NavLink>

{/* Membres de TACIR */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Membres de TACIR</span>
</li>

<NavLink to="/dashboard/admin/PorteurProjetListe" className="menu-item" onClick={goup}>
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des porteurs de projets</div>
    </div>
  </li>
</NavLink>

<NavLink to="/dashboard/admin/mentorList" className="menu-item" onClick={goup}>
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des mentors</div>
    </div>
  </li>
</NavLink>

<NavLink to="/dashboard/admin/CoordinateurGeneraleInterface" className="menu-item" onClick={goup}>
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des coordinateurs généraux</div>
    </div>
  </li>
</NavLink>

<NavLink to="/dashboard/admin/coordinateurRegionalListe" className="menu-item" onClick={goup}>
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des coordinateurs régionaux</div>
    </div>
  </li>
</NavLink>

{/* Gestion des comptes */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Comptes</span>
</li>

<NavLink to="/dashboard/admin/accounts/register" className="menu-item" onClick={goup}>
  <li className="menu-item">
    <div className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Création des comptes</div>
    </div>
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
