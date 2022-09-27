import { useEffect, useState } from 'react';
import TestDishCustomer from '../TestDishCustomer/TestDishCustomer';
import TestFood from '../TestFood/TestFood';
import TestPlatform from '../TestPlatform/TestPlatform';
import TestPlayer from '../TestPlayer/TestPlayer';
import GameOverModal from '../../components/GameOverModal/GameOverModal';

import './TestScreen.scss';

const TestScreen = ({userProfile}) => {
    // platform
    const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
    const platformNum = 4;
    const platformHeightArr = []
    const screenHeight = 750;
    // get height for each platform
    for(let i = 0; i < platformNum; i++){
        platformHeightArr.push(screenHeight / platformNum * i + 100); 
    }

    const heartsArr = []
    for(let i = 0; i < userProfile.hearts; i++){
        heartsArr.push(i);
    } 

    const foodList = ["egg", "masago", "salmon", "shirimp"];
    const [grabbedFood, setGrabbedFood] = useState(null);
    const [grabDish, setGrabDish] = useState(false);
    const [shootDish, setShootDish] = useState(false);
    
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(-50);
    const [miliSec, setMiliSec] = useState(0);
    const [time, setTime] = useState(0);
    const [isTicking, setIsTicking] = useState(true);

    const setShootFalse = () => {
        setShootDish(false);
    }

    const setGameOver = () => {
        setIsGameOver(true);
    }

    const handleScore = () => {
        setScore(score + 50)
    }

    useEffect(() => {
        if(isTicking){
            tick();
        }
    }, [])

    useEffect(() => {
        if(isTicking){
            setTime(format(miliSec));
        }
    }, [miliSec])

    const tick = () => {
        setInterval(() => {
            setMiliSec(miliSec => miliSec + 1);
        }, 10)
    }

    const format = (miliSec) => {
        const mm = Math.floor(miliSec / 6000) % 60
        const ss = Math.floor(miliSec / 100) % 60
        const ms = miliSec % 100

        
        return `${mm<10?'0'+mm:mm}:${ss<10?'0'+ss:ss}:${ms<10?'0'+ms:ms}`
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
        return <GameOverModal userProfile={userProfile} score={score} time={time}/>
    } 

    return (
        <>
            <div className="userProfile">
                    {heartsArr.map(heart => <div className="userProfile__heart"></div>)}
                    <div className="userProfile__score">💰{score}</div>
                    {(isTicking) && <div className="userProfile__time">{time}</div>}
            </div>
            {platformHeightArr.map((platform, index) => (<TestPlatform key = {index} height = {platform}/>))}
            <TestPlayer platformHeightArr={platformHeightArr} currentPlatformIndex={currentPlatformIndex} grabbedFood={grabbedFood}/>
            <TestDishCustomer foodList={foodList} handleScore={handleScore} grabbedFood={grabbedFood} isGameOver = {isGameOver} setGameOver = {setGameOver} setShootFalse = {setShootFalse} currentPlatformIndex={currentPlatformIndex} platformHeightArr={platformHeightArr} shootDish={shootDish}/>
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