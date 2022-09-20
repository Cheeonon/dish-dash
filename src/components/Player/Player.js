import { useEffect, useRef, useState } from 'react';
import './Player.scss';

const Player = ({platformHeightArr, platformNum}) => {
    const [currentPlatform, setCurrentPlatform] = useState(0);
    const [positionY, setPositionY] = useState(platformHeightArr[currentPlatform]);
    const [dishes, setDishes] = useState([]);

    // to get unique key for each dish element
    // always icreases
    const [count, setCount] = useState(0);

    useEffect(() => {
 
        // move character
        const handleMove = (event) => {
            const lastPlatform = platformNum - 1;
            if (event.key === "ArrowDown") {
                // plus one index of platform
                if (currentPlatform < lastPlatform) {
                    setCurrentPlatform(currentPlatform + 1);
                } else{
                    setCurrentPlatform(0);
                }    

            setPositionY(platformHeightArr[currentPlatform]);

            } else if (event.key === "ArrowUp"){
                if(currentPlatform > 0){
                    setCurrentPlatform(currentPlatform - 1);
                } else{
                    setCurrentPlatform(lastPlatform);
                }
                setPositionY(platformHeightArr[currentPlatform]);

            } // shot dish
            else if(event.key === "z"){
                setCount(count + 1)
                const dishIndex = dishes.length + 1;
                const newDishes = [...dishes];
                newDishes.push({dishIndex, positionY, count});
                setDishes(newDishes);
            }
        };

        //  add eventlistener only once
        window.addEventListener("keydown", handleMove);

        return () => {
            window.removeEventListener("keydown", handleMove);
        };
    }, [currentPlatform, dishes]);



    const detectCollision = () => {
        if(dishes.length){

            for(let i = 0; i < dishes.length; i++){
                let dish = document.querySelector(`.dish${dishes[i].dishIndex}`);

                // if reactDOM renders div.dish --> this is to avoid executing code on a variable with null
                if(dish){
    
                    if(dish.getBoundingClientRect().x <= 0){
                        const survivedDishes = dishes.filter(dish => dish.dishIndex != dishes[i].dishIndex);
                        setDishes(survivedDishes);
                    }
                }
            }
        }

        window.requestAnimationFrame(detectCollision);
    }
   
    detectCollision();
    
  return (
    <>
        <div className='player' style={{top: positionY}}></div>
        {dishes.map(dish => {return <div key={dish.count} className={`dish dish${dish.dishIndex}`} style={{top: dish.positionY}}></div>})}
    </>
  )
}

export default Player
