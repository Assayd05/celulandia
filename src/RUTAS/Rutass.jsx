import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from '../RUTAS/Inicio';
import Graficas from '../RUTAS/Graficas';
import NavBar from '../RUTAS/Navbar';

const Rutass = () => {
    return (
        <div className="app-layout">
            <NavBar />
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/Graficas" element={<Graficas />} />
            </Routes>
        </div>
    );
}

export default Rutass;
