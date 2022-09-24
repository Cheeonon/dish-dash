import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import GamePage from './pages/GamePage/GamePage';
import HomePage from './pages/HomePage/HomePage';
import RootPage from './pages/RootPage/RootPage';
import LeaderboardPage from './pages/LeaderboardPage/LeaderboardPage';
import UpgradePage from './pages/UpgradePage/UpgradePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/sign-up" element={<SignUp />}/>
        <Route path="/users/login" element={<Login />}/>
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
 