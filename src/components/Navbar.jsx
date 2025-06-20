import { NavLink } from 'react-router-dom';

function Navbar() {
  const activeClassName = "text-netflix-red";
  const inactiveClassName = "text-white hover:text-gray-300";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-netflix-black/90 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <NavLink to="/" className="text-netflix-red text-3xl font-bold">CinéStream</NavLink>
        <div className="space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            Accueil
          </NavLink>
          <NavLink to="/recherche" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            Recherche
          </NavLink>
          <NavLink to="/ajouter" className={({ isActive }) => isActive ? activeClassName : inactiveClassName}>
            Ajouter Film
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;