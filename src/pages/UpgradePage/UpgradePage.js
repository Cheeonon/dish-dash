import './UpgradePage.scss';
import {useLocation, useNavigate} from 'react-router-dom';
import {updateHearts} from '../../utils/axios';
import { useState } from 'react';

const UpgradePage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [hoverDesc, setHoverDesc] = useState("");
    const handleBack = () => {
        navigate(-1);
      };

    const handleUpdateHeart = () => {
        const updateHeartBody = {heartCount: location.state.userProfile.hearts, userId: location.state.userProfile.user_id}

        updateHearts(updateHeartBody);
    }

    const handleDishDesc = () => {

        setHoverDesc("dish")
    }
    const handleHeartDesc = () => {

        setHoverDesc("heart")
    }
    const handleDDDesc = () => {

        setHoverDesc("DD")
    }

    return (
        <div className='upgrade'>
            <span onClick={handleBack} className="upgrade__back"></span>
            {/* (hoverDesc === "dish" ? <div className="upgrade__desc"></div>)
            (hoverDesc === "heart" ? <div className="upgrade__desc"></div>)
            (hoverDesc === "DD" ? <div className="upgrade__desc"></div>) */}
            <div className="upgrade__bg">
                <div className="upgrade__content">
                    <div className="upgrade__item upgrade__item--dish" onMouseOver={handleDishDesc}></div>
                    <div className="upgrade__item upgrade__item--heart" onClick={handleUpdateHeart} onMouseOver={handleHeartDesc}></div>
                    <div className="upgrade__item upgrade__item--doublescore" onMouseOver={handleDDDesc}></div>
                </div>
            </div>
        </div>
    )
}

export default UpgradePage 