import './UpgradePage.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import {updateHearts, getUserProfile, buyDoubleScore} from '../../utils/axios';
import { useState } from 'react';
import { useEffect } from 'react';

const UpgradePage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [displayHeartDetail, setDisplayHeartDetail] = useState(false);
    const [displayDoubleDetail, setDisplayDoubleDetail] = useState(false);
    const [displayError, setDisplayError] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    const [userCoin, setUserCoin] = useState(null);
    const [userHeart, setUserHeart] = useState(null);
    const [userDoubleScore, setUserDoubleScore] = useState(null);
    
    const token = sessionStorage.getItem(`token${location.state.userProfile.user_name}`);

    const handleBack = () => {
        navigate(-1);
      };

    if(!userCoin && !userHeart && !userDoubleScore){
        setUserCoin(location.state.userProfile.coins);
        setUserHeart(location.state.userProfile.hearts);
        setUserDoubleScore(location.state.userProfile.double_score);
    }

    useEffect(()=>{
        getUserProfile(token)
        .then(resolve => {
            setUserCoin(resolve.data.userProfile.coins);
            setUserHeart(resolve.data.userProfile.hearts);
        }) 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displaySuccess])

    const handleBuyHeart = () => {
        setDisplayHeartDetail(!displayHeartDetail);
    }

    const handleUpdateHeart = () => {
        if(userCoin < 1000){
            setDisplayError(!displayError);
        } else{
            const updateHeartBody = {userId: location.state.userProfile.user_id}
            updateHearts(updateHeartBody)
            .then(resolve => {
                setDisplaySuccess(true);
            });
        }
    }

    const handleBuyDoubleScore = () => {
        setDisplayDoubleDetail(!displayDoubleDetail);
    }

    const handleUpdateDoubleScore = () => {
        if(userCoin < 3000){
            setDisplayError(!displayError);
        } else{
            const updateDoubleScoreBody = {userId: location.state.userProfile.user_id}
            buyDoubleScore(updateDoubleScoreBody)
            .then(resolve => {
                setDisplaySuccess(true);
            });
        }
    }

    return (
        <div className='upgrade'>
            <span onClick={handleBack} className="upgrade__back"></span>
            <span className="upgrade__coins">💰{userCoin}</span>
            <span className="upgrade__double-score">{userDoubleScore ? "X2 double score" : "No item"}</span>
            <div className="upgrade__hearts">♥X{userHeart}</div>
            <div className="upgrade__desc">
                Click to buy
            </div>

            <div className="upgrade__bg">
                <div className="upgrade__content">
                    <div className="upgrade__item upgrade__item--heart" onClick={handleBuyHeart}>
                        <span className="upgrade__item-title">Heart</span> 
                    </div>
                    <div className="upgrade__item upgrade__item--doublescore" onClick={handleBuyDoubleScore}>
                        <span className="upgrade__item-title">Double Score</span> 
                    </div>
                </div>
            </div>

            {displayHeartDetail 
            ?   <div className="upgrade__modal">
                    <div className="upgrade__modal-content">
                        {
                        displayError
                            ?   <div className="heart__error">
                                    <span className="heart__error-msg">You don't have enough gold to purchase a heart!</span>
                                    <span className="heart__error-btn" onClick={()=>{setDisplayError(!displayError)}}>OK</span>
                                </div>
                            :  null
                        }

                        {
                        displaySuccess
                            ?   <div className="heart__success">
                                    <span className="heart__success-msg">Successfully purchased a heart!</span>
                                    <span className="heart__success-btn" onClick={()=>{setDisplaySuccess(!displaySuccess)}}>OK</span>
                                </div>
                            :  null
                        }

                        <div className="heart__img"></div>
                        <div className="heart__detail">
                            <div className="heart__desc">
                                Add one heart.
                            </div>
                            <span className="heart__price">💰1000</span>
                            <div className="heart__btn">
                                <span className="heart__btn--item" onClick={handleUpdateHeart}>Buy</span>
                                <span className="heart__btn--item" onClick={handleBuyHeart}>Cancel</span>
                            </div>
                        </div>
                    </div>
                </div>
            : null
            }

            {displayDoubleDetail 
            ?   <div className="upgrade__modal">
                    <div className="upgrade__modal-content">
                        {
                        displayError
                            ?   <div className="double__error">
                                    <span className="double__error-msg">You don't have enough gold to purchase a double score item!</span>
                                    <span className="double__error-btn" onClick={()=>{setDisplayError(!displayError)}}>OK</span>
                                </div>
                            :  null
                        }

                        {
                        displaySuccess
                            ?   <div className="double__success">
                                    <span className="double__success-msg">Successfully purchased a double score item!</span>
                                    <span className="double__success-btn" onClick={()=>{setDisplaySuccess(!displaySuccess)}}>OK</span>
                                </div>
                            :  null
                        }

                        <div className="double__img"></div>
                        <div className="double__detail">
                            <div className="double__desc">
                                Add one double.
                            </div>
                            <span className="double__price">💰1000</span>
                            <div className="double__btn">
                                <span className="double__btn--item" onClick={handleUpdateDoubleScore}>Buy</span>
                                <span className="double__btn--item" onClick={handleBuyDoubleScore}>Cancel</span>
                            </div>
                        </div>
                    </div>
                </div>
            : null
            }
            
        </div>
    ) 
}

export default UpgradePage 