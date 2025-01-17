import { NavLink } from "react-router-dom";

function SidebarCoordinateurComposante() {
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
      <NavLink to="/dashboard/coordinateurComposante/Home">
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Home</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Sessions Mentorats</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/planifierMentorat" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Créer session mentorat</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/ListMentorat" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des mentorats</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Projets</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/ListeProjets" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Evaluer Projets</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/ListeProjets/crea" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Projets CREA</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/ListeProjets/inov" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Projets INOV</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Formations</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/createFormation" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Créer formation</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/listeFormations" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des formations</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/upcomingFormation" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des prochaines formations</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/listeDemandesFormations" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des demandes</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Creathons</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/outputListe" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des outputs</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Membres de TACIR</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/ListeCandidats" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des candidats</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/mentorList" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des mentors</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Calendrier</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/calendrier" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Calendrier</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Rendus</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/demanderRendu" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Demander Rendu</div>
    </button>
  </li>
</NavLink>

<NavLink to="/dashboard/coordinateurComposante/ListRendu" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Liste des Rendus</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Meetings</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/planifierReunion" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Planifier Réunions</div>
    </button>
  </li>
</NavLink>

<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Contact</span>
</li>
<NavLink to="/dashboard/coordinateurComposante/contact" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Contacter membres</div>
    </button>
  </li>
</NavLink>

{/* Gestion des comptes */}
<li className="menu-header small text-uppercase">
  <span className="menu-header-text">Comptes</span>
</li>

<NavLink to="/dashboard/coordinateurComposante/profile/parametresComptes" onClick={goup}>
  <li className="menu-item">
    <button className="menu-link menu-toggle">
      <i className="menu-icon tf-icons bx bx-dock-top" />
      <div data-i18n="Account Settings">Paramètres</div>
    </button>
  </li>
</NavLink>

    </ul>
  );
}

export default SidebarCoordinateurComposante;
