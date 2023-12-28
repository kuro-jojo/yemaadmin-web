import React from 'react'
import './assets/styles/navbar.css'
function NavBar() {
  return (
    <>
      <nav className="nav">
        <div className="logo">
          <img src="/src/assets/yema_logo.svg" alt="Yema image" />
          <span className="title">Yema Dashboard</span>
          <span className="settings">Settings</span>
          <span>Flag</span>
        </div>
      </nav>
    </>
  )
}

export default NavBar