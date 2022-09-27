import './Player.scss';

const Player = ({platformHeightArr, currentPlatformIndex, grabbedFood}) => {


  return (
    <div 
        className='test-player' 
        style={ {bottom: platformHeightArr[currentPlatformIndex]} }>    
        <div className="test-player__dish">
          <div className={`test-player__food food-test__${grabbedFood}`}>
            
          </div>
        </div>
    </div>
  )
}

export default Player 