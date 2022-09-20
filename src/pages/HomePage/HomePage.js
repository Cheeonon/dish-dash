import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getUserProfile } from '../../utils/axios';

import './HomePage.scss';

const HomePage = () => {
    const [isHomePage, setIsHomePage] = useState(false);
    const [userProfile, setUserProfile] = useState(null)
    const location = useLocation();
    const token = sessionStorage.getItem(`token${location.state.userName}`);
  
    useEffect(() => {
      getUserProfile(token)
      .then(resolve => {
        setUserProfile(resolve.data.userProfile)
        setIsHomePage(true)
      }) 
      .catch(error => {
        alert("failed to get game page")
        setIsHomePage(false)
      })
    }, [])
  
    if(!isHomePage || !userProfile) {
      return <h1>Loading...</h1>;
    } 

    return (
      <>
        <h1>DishDash</h1>
        <ul>
            <li>
                <Link to="/game" state={{userProfile: userProfile}}>Start</Link>
            </li>
            <li>Upgrade</li>
            <li>Setting</li>
        </ul>
      </>
    )
}

export default HomePage