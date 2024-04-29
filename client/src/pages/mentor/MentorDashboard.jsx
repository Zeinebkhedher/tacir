import React from 'react'
import SideBarMentor from '../../components/sideBarMentor/SideBarMentor'
import Navbar1 from '../../components/navBar1/NavBar1'
import HomePage from '../home/HomePage'

const MentorDashboard = (props) => {
  return (
    <div>
  <div>
  {/* Layout wrapper */}
  <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      {/* Menu */}
      <aside
              id="layout-menu"
              className="layout-menu menu-vertical menu bg-menu-theme"
            >
              <SideBarMentor />
            </aside>
            <Navbar1 />
            {props.load === "home" && <HomePage />}
             
     
    </div>
    {/* Overlay */}
    <div className="layout-overlay layout-menu-toggle" />
  </div>
  {/* / Layout wrapper */}
  
</div>


    </div>
  )
}

export default MentorDashboard