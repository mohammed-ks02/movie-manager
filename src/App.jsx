// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import AddMoviePage from './pages/AddMoviePage';
import MovieDetailPage from './pages/MovieDetailPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen w-full bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recherche" element={<SearchPage />} />
            <Route path="/ajouter" element={<AddMoviePage />} />
            <Route path="/film/:id" element={<MovieDetailPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;