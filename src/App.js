import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { TopNav } from './componnents/TopNav/TopNav';
import { StarPage } from './Pages/StarredPage/StarredPage';
import { MovieCard } from './Pages/SinglePage/SingleMovie';

function App() {
  return (
    <div className="App">
   <TopNav/>
  <Routes>
    <Route path="/" element={<LandingPage/>}/>
    <Route path="/:movieId" element={<MovieCard/>}/>
    <Route path="/starmovies" element={<StarPage/>}/>
  </Routes>
    </div>
  );
}

export default App;
