import React from 'react';
import { Link, useNavigate } from "react-router-dom";

function Navbar({ loggedIn, onLogout }) {
  const navigate = useNavigate();
  //logout navigation requires this
  const logoutLogout = () => {
    onLogout(); 
    navigate("/");
  };
  return (
    <nav className="nav-bar">
      <div className='nav-container'>
        <div className='nav-item'>
          <Link to='/'>Etusivu</Link>
        </div>
        <div className='nav-item'>
          <Link to='/comparing'>Vertaa</Link>
        </div>
        {/* <div className='nav-item'>
          <Link to='/proof'>proof of concept yritysten data</Link>
        </div> */}
        <div className='nav-item'>
          {loggedIn ? (
            <Link to='/profile'>Profiili</Link>
          ) : (
            null
          )}
        </div>
        <div className='nav-item'>
          {loggedIn ? (
            <button onClick={logoutLogout}>Kirjaudu ulos</button>
          ) : (
            <Link to='/login'>Kirjaudu</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;