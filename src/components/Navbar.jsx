import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path 
      ? 'text-netflix-red' 
      : 'text-white hover:text-gray-300';
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-netflix-black/90 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-netflix-red text-3xl font-bold">CinéStream</Link>
        <div className="space-x-4">
          <Link to="/" className={`transition-colors duration-300 ${isActive('/')}`}>
            Accueil
          </Link>
          <Link to="/recherche" className={`transition-colors duration-300 ${isActive('/recherche')}`}>
            Recherche
          </Link>
          <Link to="/ajouter" className={`transition-colors duration-300 ${isActive('/ajouter')}`}>
            Ajouter Film
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;