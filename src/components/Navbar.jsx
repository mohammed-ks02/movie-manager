// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Gestionnaire de Films</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Accueil</Link>
          <Link to="/recherche" className="hover:text-blue-200">Recherche</Link>
          <Link to="/ajouter" className="hover:text-blue-200">Ajouter Film</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;