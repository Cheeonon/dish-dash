import './Instruction.scss';
import servingURL from '../../assets/instruction/serving.png';
import patienceURL from '../../assets/instruction/patience.png';
import brokenPlateURL from '../../assets/instruction/brokenPlate.png';


const Instruction = ({displayScreen}) => {
  return (
    <>
        <div className="instruction">
            <div className="instruction__content">
                <div className="instruction__title">How to play</div>
              <div className="instruction__gallery">
              <div className="instruction__gallery-section">
                  <div className="instruction__gallery-item">
                    <img className="instruction__img" src={servingURL}/>
                    <p className="font">Keep customers happy by serving the food they want.</p>
                  </div>
                  <div className="instruction__gallery-item">
                    <img className="instruction__img scaleUp" src={patienceURL}/>
                    <p className="font">If the customers wait too long, they'll get upset and leave.</p>
                  </div>
                  <div className="instruction__gallery-item">
                    <img className="instruction__img" src={brokenPlateURL}/>
                    <p className="font">If the plate is deliver to an empty lane, plate whill be broken.</p>
                  </div>
                </div>
                <div className="instruction__gallery-section">
                <div className="instruction__gallery-item">
                    <p>⬆⬇</p>
                    <p className="font">to move</p>
                  </div>
                  <div className="instruction__gallery-item">
                    <p>X</p>
                    <p className="font"> to grab a dish</p>
                  </div>
                  <div className="instruction__gallery-item">
                    <p>Z</p>
                    <p className="font">to deliver the plate</p>
                  </div>
                  <div className="instruction__gallery-item">
                    <p>00:00</p>
                    <p className="font">service them as long as you can</p>
                  </div>
                  <div className="instruction__gallery-item">
                    <p>♥♥♥</p>
                    <p className="font">service them as long as you can</p>
                  </div>
                </div>
              </div>
                
                

                <div
                    onClick={() => {displayScreen()}}
                    className="instruction__button"
                >
                    Start!
                </div>
            </div>
        </div>
    </>
  )
}

export default Instruction