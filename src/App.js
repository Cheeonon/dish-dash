import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './styles/App.scss';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import GamePage from './pages/GamePage/GamePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/users/sign-up" element={<SignUp />}/>
        <Route path="/users/login" element={<Login />}/>
        <Route path="/game" element={<GamePage />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
