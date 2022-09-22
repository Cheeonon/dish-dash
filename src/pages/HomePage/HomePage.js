import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getUserProfile } from '../../utils/axios';

import './HomePage.scss';

const HomePage = () => {
    const [isHomePage, setIsHomePage] = useState(false);
    const [isStart, setIsStart] = useState(false);
    const [isLogout, setIsLogout] = useState(false);
    const [userProfile, setUserProfile] = useState(null)
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      if(location.state){
        const token = sessionStorage.getItem(`token${location.state.userName}`);
        getUserProfile(token)
        .then(resolve => {
          setUserProfile(resolve.data.userProfile)
          setIsHomePage(true)
        }) 
        .catch(error => {
          setIsHomePage(false)
        })
      } 
    }, [])

    const handleLogout = () => {
      sessionStorage.removeItem(`token${location.state.userName}`);
      navigate('/', {state: {userProfile: userProfile}});
    }

    if(!isHomePage || !userProfile) {
      return <h1>Loading...</h1>
    } 
    if(isStart){
      // pass currentUser as a parameter so that GamePage can use it for auth header
      navigate('/game', {state: {userProfile: userProfile}});
  }
    return (
      <div className="homepage">
            <div className="homepage__bg">
                <div className="homepage__content">
                    {isLogout 
                      ? <>
                          <span className="homepage__logout">Are you sure to log out?</span>
                          <span onClick={handleLogout} className="homepage__logout yes-no">Yes</span>
                          <span onClick={()=>{setIsLogout(false)}} className="homepage__logout yes-no">No</span>
                        </>
                      : <>
                          <div className="homepage__title">DISH DASH</div>
                          <ul className="homepage__list">
                              <li onClick={()=>{setIsStart(true)}} className="homepage__item">Start</li>
                              <Link to="/game" className="homepage__item">Upgrade</Link>
                              <Link to="/leaderboard" className="homepage__item">Leaderboard</Link>
                              <li onClick={()=>{setIsLogout(true)}} className="homepage__item">Logout</li>
                          </ul>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}



export default HomePage