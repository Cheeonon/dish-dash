import { useEffect, useState } from 'react';
import DishCustomer from '../DishCustomer/DishCustomer';
import Food from '../Food/Food';
import Platform from '../Platform/Platform';
import Player from '../Player/Player';
import GameOverModal from '../GameOverModal/GameOverModal';

import './Screen.scss';

const TestScreen = ({userProfile, difficulty}) => {
    // platform
    const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
    const platformNum = 4;
    const platformHeightArr = []
    const screenHeight = 750;
    // get height for each platform
    for(let i = 0; i < platformNum; i++){
        platformHeightArr.push(screenHeight / platformNum * i + 100); 
    }

    const foodList = ["egg", "masago", "salmon", "shirimp"];
    const [grabbedFood, setGrabbedFood] = useState(null);
    const [grabDish, setGrabDish] = useState(false);
    const [shootDish, setShootDish] = useState(false);
    
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState(-50);
    const [miliSec, setMiliSec] = useState(0);
    const [time, setTime] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [timeChecker, setTimeChecker] = useState(0);

    const [userHeart, setUserHeart] = useState(userProfile.hearts);
    const [isDoubled, setIsDoubled] = useState(userProfile.double_score);

    const setShootFalse = () => {
        setShootDish(false);
    }

    const handleScore = () => {
        if(isDoubled){
            setScore(score + 100);
        } else{
            setScore(score + 50);
        }
    }

    const minusUserHeart = () => {
        if(userHeart !== 1){
            setUserHeart(userHeart - 1);
        } else{
            setIsGameOver(true);
        }
    }

    useEffect(() => {
        displayTime();
    }, [])

    useEffect(() => {
        if(!isPaused){
            setMiliSec(miliSec => miliSec + 1)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeChecker])

    useEffect(() => {
        if(!isPaused){
            setTime(format(miliSec));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [miliSec])

    const displayTime = () => {
        setInterval(() => {
            setTimeChecker(timeChecker => timeChecker + 1)
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
            setIsPaused(false);

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
            } else if (event.key === " "){
                setIsPaused(true);
            }
        };
    
        //  add eventlistener only once
        window.addEventListener("keydown", handleMove);
        
        return () => {
            window.removeEventListener("keydown", handleMove);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPlatformIndex]);


    
    if(isGameOver){
        return <GameOverModal userProfile={userProfile} score={score} time={time}/>
    } 




    return (
        <>
            {isPaused && <div className='screen__paused'>GAME PAUSED</div>}
            <div className="userProfile">
                    <div className="userProfile__heart">♥x{userHeart}</div>   
                    <div className="userProfile__score">💰{score}</div>
                    <div className="userProfile__time">{time}</div>
            </div>
            {platformHeightArr.map((platform, index) => (<Platform key = {index} height = {platform}/>))}
            <Player grabDish={grabDish} platformHeightArr={platformHeightArr} currentPlatformIndex={currentPlatformIndex} grabbedFood={grabbedFood}/>
            <DishCustomer setIsDoubled={setIsDoubled} difficulty={difficulty} isPaused={isPaused} foodList={foodList} handleScore={handleScore} grabbedFood={grabbedFood} isGameOver = {isGameOver} minusUserHeart = {minusUserHeart} setShootFalse = {setShootFalse} currentPlatformIndex={currentPlatformIndex} platformHeightArr={platformHeightArr} shootDish={shootDish}/>
            {foodList.map((food, index) => ( <Food key = {index + 100} height={platformHeightArr[index]} food={food}/>))}
           
        </>
    )
    
}

export default TestScreen

// indice
// platform 1-4
// food 100~
// dish 200~
// customer 300~
// grabbedFood 400~