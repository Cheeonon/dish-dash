
import './Instruction.scss';

const Instruction = ({displayScreen}) => {
  return (
    <>
        <div className="instruction">
            <div className="instruction__content">
                <div className="instruction__item">
                  ⬆⬇ Arrow Key to move
                </div>
                <div className="instruction__item">
                  X to grab a sushi
                </div>
                <div className="instruction__item">
                  Z to deliver the plate
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