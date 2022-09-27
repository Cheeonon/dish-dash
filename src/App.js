import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import LoginPage from './pages/LoginPage/LoginPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import GamePage from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import RootPage from './pages/RootPage/RootPage';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage';
import UpgradePage from './pages/UpgradePage/UpgradePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/sign-up" element={<SignUpPage />}/>
        <Route path="/users/login" element={<LoginPage />}/>
        <Route path="/game" element={<GamePage />}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/leaderboard" element={<LeaderboardPage />}/>
        <Route path="/upgrade" element={<UpgradePage />}/>
        <Route path="/" element={<RootPage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
 