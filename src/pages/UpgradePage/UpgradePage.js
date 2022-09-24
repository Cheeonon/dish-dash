import './UpgradePage.scss';
import {useNavigate} from 'react-router-dom';

const UpgradePage = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
      };

    return (
        <div className='upgrade'>
            <span onClick={handleBack} className="upgrade__back"></span>
            <div className="upgrade__bg">
                <div className="upgrade__content">
                    <div className="upgrade__item upgrade__item--dish"></div>
                    <div className="upgrade__item upgrade__item--heart"></div>
                    <div className="upgrade__item upgrade__item--doublescore"></div>
                </div>
            </div>
        </div>
    )
}

export default UpgradePage