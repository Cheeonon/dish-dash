import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Customer from '../Customer/Customer';
import { postScores } from '../../utils/axios';


import playerBackgroundURL from '../../assets/player/op.gif';
import playerBackgroundDefaultURL from '../../assets/player/dish-white.svg';

import './GamePlay.scss';

const GamePlay = ({platformArr}) => {
    const location = useLocation();
    const userProfile = location.state.userProfile;
    // console.log(userProile)

    const [shootDish, setShootDish] = useState(false);

    const [currentPlatformIndex, setCurrentPlatformIndex] = useState(0);
    const [playerY, setPlayerY] = useState(platformArr[currentPlatformIndex].platformPosition);
    const [dishY, setDishY] = useState(platformArr[currentPlatformIndex].platformPosition);
    const [score, setScore] = useState(0);
    const [playerBackground, setPlayerBackground] = useState(false);

    // array for rendering
    const [dishArr, setDishArr] = useState([]);
    const [customerArr, setCustomerArr] = useState([]);
    
    // get unique key for each element. It always icreases
    const [customerCount, setCustomerCount] = useState(0);
    const [dishCount, setDishCount] = useState(0);

    //  player movement
    useEffect(() => {

        const handleMove = (event) => {
            const lastPlatformIndex = platformArr.length - 1;

            if (event.key === "ArrowDown") {

                // plus one index of platform
                if (currentPlatformIndex < lastPlatformIndex) {
                    setCurrentPlatformIndex(currentPlatformIndex + 1);
                } else{
                    setCurrentPlatformIndex(0);
                }    
            } 
            else if (event.key === "ArrowUp"){

                // minus one index of platform
                if(currentPlatformIndex > 0){
                    setCurrentPlatformIndex(currentPlatformIndex - 1);

                } else{
                    setCurrentPlatformIndex(lastPlatformIndex);

                }
            } 

            // 이거 해야됨!!!
            else if(event.key === "z"){
                // 업데이트된 dishY로 렌더해야함
                // setShootDish한 다음에
                setDishY(playerY);
                setShootDish(true);

                // const newDishes = [...dishArr];
                // setDishCount(dishCount + 1);
                // const dishIndex = dishCount + 1

                // newDishes.push({dishIndex, dishY, dishCount});
                // setDishArr(newDishes);
                
                // set player background,
                // after 3 seconds, set player background to default
                // setPlayerBackground(playerBackground => !playerBackground);

                // setTimeout(() => {
                //     setPlayerBackground(playerBackground => !playerBackground);
                // }, 500);
            }
        };

        // set player y to current platform
        setPlayerY(platformArr[currentPlatformIndex].platformPosition);

        if(shootDish){
            const newDishes = [...dishArr];
            setDishCount(dishCount + 1);
            const dishIndex = dishCount + 1
            newDishes.push({dishIndex, dishY, dishCount});
            setDishArr(newDishes);
            setPlayerBackground(playerBackground => !playerBackground);
            setShootDish(false);
        }

        //  add eventlistener only once
        window.addEventListener("keydown", handleMove);

        return () => {
            window.removeEventListener("keydown", handleMove);
        };
    }, [currentPlatformIndex, dishArr]);


    

    // useEffect(() => {

    //     const handleDish = (event) => {

    //         if(event.key === "z"){
    //             // set new dish array
    //             const dishY = playerY
    //             const newDishes = [...dishArr];
    //             const dishIndex = dishCount + 1
    //             newDishes.push({dishIndex, dishY, dishCount});
    //             setDishArr(newDishes);
    //             setPlayerBackground(playerBackground => !playerBackground);
    //             setTimeout(() => {
    //                 setPlayerBackground(playerBackground => !playerBackground);
    //             }, 500);
    //         }
    //     }

    //     window.addEventListener("keydown", handleDish);

    //     return () => {
    //         window.removeEventListener("keydown", handleDish);
    //     };
        
    // }, [dishArr]) 

    // new customer appears every 5 seconds
    useEffect(()=>{
        // setNewCustomer();
    }, [])

    const setNewCustomer = () => {
        setInterval(()=>{
            setCustomerCount(customerCount => customerCount + 1);
        }, 3000);
    }

    // executes code to create a customer once new customer is added to the array
    useEffect(()=>{
        const newArr = [...customerArr]
        const randomPlatform = Math.floor(Math.random() *  platformArr.length);
        const customerPositionY = platformArr[randomPlatform].platformPosition;
        
        newArr.push({customerPositionY, customerCount});
        setCustomerArr(newArr);


    }, [customerCount])


    const detectCollision = () => {

        // if dish array is not empty, check each dish's current position
        if(dishArr.length){

            for(let i = 0; i < dishArr.length; i++){
                let selectedDish = document.querySelector(`.dish${dishArr[i].dishIndex}`);
                // if DOM renders div.dish --> this is to avoid executing code on a variable with null
                if(selectedDish){
                    if(selectedDish.getBoundingClientRect().x <= 0){
                        const survivedDishes = dishArr.filter(dish => dish.dishIndex !== dishArr[i].dishIndex);
                        setDishArr(survivedDishes);

                    }
                }
            }
        }

        // if customer array is not empty, check each customer's current position
        if(customerArr.length){
            for(let i = 0; i < customerArr.length; i++){
                const currentCustomer = customerArr[i];
                let customer = document.querySelector(`.customer${currentCustomer.customerCount}`);

                // if reactDOM renders div.dish --> this is to avoid executing code on a variable with null
                if(customer){
                    const screen = document.querySelector(".screen");
                    const screenSize = screen.getBoundingClientRect().right - 70;
                    const customerCurrentPosition = customer.getBoundingClientRect().x;

                    // if customer is at the end of the screen
                    if(customerCurrentPosition >= screenSize){
                        const survivedCustomers = customerArr.filter(customer => customer.customerCount !== customerArr[i].customerCount);
                        setCustomerArr(survivedCustomers);
                    } else if(dishArr.length){
                        for(let j = 0; j < dishArr.length; j++){
                            let selectedDish = document.querySelector(`.dish${dishArr[j].dishIndex}`);
                            
                            // compare position of dish and customer
                            if(selectedDish){

                                // compare x and y with the dish
                                // height difference -> customer transform: translateY(-120px);
                                const heightDifferenct =selectedDish.getBoundingClientRect().y - customer.getBoundingClientRect().y
                                const customerSize = 145;

                                if(selectedDish.getBoundingClientRect().x - customerCurrentPosition <= customerSize &&  heightDifferenct == 120){
                                    const survivedCustomers = customerArr.filter(customer => customer.customerCount !== customerArr[i].customerCount);
                                    if(customerArr.length){
                                        setCustomerArr(survivedCustomers);
                                    }
                                    const survivedDishes = dishArr.filter(dish => dish.dishIndex !== dishArr[j].dishIndex);
                                    setDishArr(survivedDishes);

                                    setScore(score + 50);
                                }
                            }
                        }
                    }
                }
            }
        }

        window.requestAnimationFrame(detectCollision);
    }
   
    detectCollision();

    if(false){

        const body = {
            user_id: userProfile.user_id,
            userName: userProfile.user_name,
            score: score
        }

        postScores(body)
        .then(resolve => {
            console.log(resolve.data)
        })
    }

    // console.log(playerY)

  return (
    <>
        <div className="score">{score}</div>   
        <div className='player' 
            style={playerBackground 
            ? {top: playerY, background: `url(${playerBackgroundURL})`}
            : {top: playerY, background: `url(${playerBackgroundDefaultURL})`}
            }
        ></div>
        {dishArr.map(dish => {
            return <div key={dish.dishCount} className={`dish dish${dish.dishIndex}`} style={{top: dish.dishY}}></div>})}
        {customerArr.map(customer => ( <Customer key={customer.customerCount} customerCount={customer.customerCount} customerPositionY={customer.customerPositionY}/>))}
    </>
  )
}

export default GamePlay
