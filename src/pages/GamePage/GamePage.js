
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Instruction from '../../components/Instruction/Instruction';
import Screen from '../../components/Screen/Screen';
import './GamePage.scss';

const GamePage = () => {

  const location = useLocation();
  const userProfile = location.state.userProfile;
  const[isInstruction, setIsInstruction] = useState(true);
  const[difficulty, setDifficulty] = useState(null);

  const displayScreen = () =>{
    setIsInstruction(false);
  } 

  const pickDifficulty = (level) =>{
    setDifficulty(level);
  } 

  if(isInstruction){
    return <Instruction displayScreen={displayScreen} pickDifficulty={pickDifficulty} difficulty={difficulty}/>
  }

  return(
    <div className="game-page-test">
        <Screen userProfile={userProfile} difficulty={difficulty}/>
    </div>
  )
}

export default GamePage