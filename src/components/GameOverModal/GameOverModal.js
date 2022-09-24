import { useNavigate } from "react-router-dom";
import "./GameOverModal.scss";

const GameOverModal = ({handleUploadAgain }) => {
    const navigate = useNavigate();

    return (
        <div className="upload-modal">
            <div className="upload-modal__content">
                <div className="upload-modal__buttons">
                    <button
                        onClick={handleUploadAgain}
                        className="upload-modal__button upload-modal__button--white"
                    >
                        Upgrade
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="upload-modal__button upload-modal__button--primary"
                    >
                        Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverModal;
