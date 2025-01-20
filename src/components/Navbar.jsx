import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-netflix-black/90 py-4 px-8 flex justify-between items-center">
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-netflix-red text-3xl font-bold">CinéStream</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-gray-300">Accueil</Link>
          <Link to="/recherche" className="hover:text-gray-300">Recherche</Link>
          <Link to="/ajouter" className="hover:text-gray-300">Ajouter Film</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;