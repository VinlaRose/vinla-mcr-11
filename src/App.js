import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './Pages/LandingPage/LandingPage';
import { TopNav } from './componnents/TopNav/TopNav';

function App() {
  return (
    <div className="App">
   <TopNav/>
  <Routes>
    <Route path="/" element={<LandingPage/>}/>
  </Routes>
    </div>
  );
}

export default App;
