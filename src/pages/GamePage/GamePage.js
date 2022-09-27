
import { useLocation } from 'react-router-dom';
import Screen from '../../components/Screen/Screen';
import './GamePage.scss';

const GamePage = () => {

  const location = useLocation();
  const userProfile = location.state.userProfile;


  return(
    <div className="game-page-test">
        <Screen userProfile={userProfile}/>
    </div>
  )
}

export default GamePage