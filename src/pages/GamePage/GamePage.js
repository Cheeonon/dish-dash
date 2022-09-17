import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from '../../utils/axios';
import './GamePage.scss';

const GamePage = () => {
  const [hearts, setHearts] = useState(0);
  const [isGamePage, setIsGamePage] = useState(false);
  const location = useLocation();
  const token = sessionStorage.getItem(`token${location.state.userName}`);

  useEffect(() => {
    getUserProfile(token)
    .then(resolve => {
      setHearts(resolve.data.userProfile.hearts)
      setIsGamePage(true)
    }) 
    .catch(error => {
      alert("failed to get game page")
      setIsGamePage(false)
    })
  }, [])

  if(!isGamePage) {
    return <h1>Loading...</h1>;
  } 

  return (
    <>
      <div>GamePage hearts: {hearts}</div>
    </>
  )
}

export default GamePage