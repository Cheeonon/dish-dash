
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Instruction from '../../components/Instruction/Instruction';
import Screen from '../../components/Screen/Screen';
import './GamePage.scss';

const GamePage = () => {

  const location = useLocation();
  const userProfile = location.state.userProfile;
  const[isInstruction, setIsInstruction] = useState(true);

  const displayScreen = () =>{
    setIsInstruction(false);
  } 

  if(isInstruction){
    return <Instruction displayScreen={displayScreen}/>
  }

  return(
    <div className="game-page-test">
        <Screen userProfile={userProfile}/>
    </div>
  )
}

export default GamePage