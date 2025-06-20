import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import AddMoviePage from './pages/AddMoviePage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-netflix-black text-white">
        <Toaster position="top-right" toastOptions={{
          style: { background: '#333', color: '#fff' }
        }} />
        <Navbar />
        <div className="container mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recherche" element={<SearchPage />} />
            <Route path="/ajouter" element={<AddMoviePage />} />
            <Route path="/film/:id" element={<MovieDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;