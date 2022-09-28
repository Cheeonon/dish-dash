import { useNavigate } from "react-router-dom";
import "./GameOverModal.scss";
import { postScores } from '../../utils/axios';
import { useEffect } from "react";

const GameOverModal = ({userProfile, score, time}) => {
    
    const navigate = useNavigate();

    useEffect(()=>{
        const body = {
            user_id: userProfile.user_id,
            userName: userProfile.user_name,
            score: score,
            time: time
        }
    
        postScores(body)
        .then(resolve => {
            console.log(resolve.data)
        })
    }, [])

    return (
        <>
            <div className="upload-modal">
                <div className="upload-modal__content">
                    <div className="upload-modal__title">
                        Customer was unhappy with the service.
                    </div>
                    <div className="upload-modal__buttons">
                        <button
                            onClick={() => navigate(-1)}
                            className="upload-modal__button upload-modal__button--primary"
                        >
                            Home
                        </button>
                        <li
                            onClick={() => navigate(0)}
                            className="upload-modal__button upload-modal__button--white"
                        >
                            Play again
                        </li>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GameOverModal;
