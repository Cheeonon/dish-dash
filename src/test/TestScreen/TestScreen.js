import { useEffect, useState } from 'react';
import TestDishCustomer from '../TestDishCustomer/TestDishCustomer';
import TestFood from '../TestFood/TestFood';
import TestPlatform from '../TestPlatform/TestPlatform';
import TestPlayer from '../TestPlayer/TestPlayer';
import './TestScreen.scss';

const TestScreen = () => {
    // platform
    const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
    const platformNum = 4;
    const platformHeightArr = []
    const screenHeight = 750;
    // get height for each platform
    for(let i = 0; i < platformNum; i++){
        platformHeightArr.push(screenHeight / platformNum * i + 100); 
    }

    const foodList = ["sushi", "hamburger", "beef", "apple"];
    const [grabbedFood, setGrabbedFood] = useState(null);
    const [grabDish, setGrabDish] = useState(false);
    const [shootDish, setShootDish] = useState(false);
    
    const [isGameOver, setIsGameOver] = useState(false);

    const setShootFalse = () => {
        setShootDish(false);
    }

    const setGameOver = () => {
        setIsGameOver(true);
    }

    //  player movement
  useEffect(() => {   
        
    const handleMove = (event) => {
        const lastPlatformIndex = platformNum - 1;

        if (event.key === "ArrowUp") {

            // plus one index of platform
            if (currentPlatformIndex < lastPlatformIndex) {
                setCurrentPlatformIndex(currentPlatformIndex + 1);
            } else{
                setCurrentPlatformIndex(0);
            }    
        } 
        else if (event.key === "ArrowDown"){

            // minus one index of platform
            if(currentPlatformIndex > 0){
                setCurrentPlatformIndex(currentPlatformIndex - 1);

            } else{
                setCurrentPlatformIndex(lastPlatformIndex);
            }
        } else if (event.key === "z"){

                setShootDish(true);
        } else if (event.key === "x"){

                setGrabDish(true)
                setGrabbedFood(foodList[currentPlatformIndex])
        }
    };
    
    //  add eventlistener only once
    window.addEventListener("keydown", handleMove);
    
    return () => {
        window.removeEventListener("keydown", handleMove);
    };
}, [currentPlatformIndex]);

if(isGameOver){
    console.log("GameOver")
    return <h1>gameover</h1>
}

    return (
        <>
            {platformHeightArr.map((platform, index) => (<TestPlatform key = {index} height = {platform}/>))}
            <TestPlayer platformHeightArr={platformHeightArr} currentPlatformIndex={currentPlatformIndex} grabbedFood={grabbedFood}/>
            <TestDishCustomer foodList={foodList} grabbedFood={grabbedFood} isGameOver = {isGameOver} setGameOver = {setGameOver} setShootFalse = {setShootFalse} currentPlatformIndex={currentPlatformIndex} platformHeightArr={platformHeightArr} shootDish={shootDish}/>
            {foodList.map((food, index) => ( <TestFood key = {index + 100} height={platformHeightArr[index]} food={food}/>))}
           
        </>
    )
}

export default TestScreen

// platform 1-4
// food 100~
// dish 200~
// customer 300~
// grabbedFood 400~