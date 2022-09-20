import GamePlay from '../GamePlay/GamePlay';
import './Screen.scss';

// render each platform
function Platform ({positionY}){
    return(
        <div className="platform" style={{top: positionY}}></div>
    )
}

const Screen = () => {
    // declare platforms
    const platformCount = 4;
    const platformArr = [];

    // variables
    const screenHeight = 750;
    const platformHeight = 70;

    // calculate position for each platform and make it as an array
    for(let i = 1; i <= platformCount; i++){
        const height = (screenHeight - platformHeight) / platformCount;
        const platformPosition = height * i;

        platformArr.push({index: i, platformPosition})
    }

  return (
    <div className='screen'>
        {/* render platforms */}
        {platformArr.map(platform => (<Platform key = {platform.index} positionY = {platform.platformPosition}/>))}
        <GamePlay platformArr={platformArr}/>
    </div>
  )
}

export default Screen