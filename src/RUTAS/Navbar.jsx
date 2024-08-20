import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <header className="navbar">
            <div className="navbar-logo">
                <Link to="/">Celurancio</Link>
            </div>
            <input type="checkbox" id="navbar-toggle" className="navbar-toggle"/>
            <label htmlFor="navbar-toggle" className="navbar-icon">&#9776;</label>
            <nav className="navbar-links">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/Graficas">Gráficas</Link></li>
                </ul>
            </nav>
            <Outlet />
        </header>
    );
};

export default NavBar;
