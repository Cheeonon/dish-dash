import { useEffect, useState } from 'react';
import Customer from '../Customer/Customer';
import Dish from '../Dish/Dish';
import './DishCustomer.scss';

const DishCustomer = ({minusUserHeart, difficulty, isPaused, handleScore, foodList, platformHeightArr, grabbedFood, shootDish, setShootFalse, currentPlatformIndex}) => {

    const [dishArr, setDishArr] = useState([]);
    const [dishNum, setDishNum] = useState(300);

    const [customerArr, setCustomerArr] = useState([]);
    const [customerNum, setCustomerNum] = useState(400);

    const [foodNum, setFoodNum] = useState(500);
    const [wantFood, setWantFood] = useState(null);
   
    let speed = 5000;

    if(difficulty === "easy"){
        speed = 5000;
    } else if (difficulty === "medium"){
        speed = 3000;
    } else if (difficulty === "hard"){
        speed = 1000;
    } 

    // when z is pressed, it shoots one dish
    useEffect(() => {
        if(shootDish){
            setDishNum(dishNum + 1);
            setFoodNum(foodNum + 1);
            const newDish = {dishNum, height: platformHeightArr[currentPlatformIndex], grabbedFood}
            const newDishArr = [...dishArr];
            newDishArr.push(newDish);
            setDishArr(newDishArr);
            setShootFalse();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shootDish])

    // new customer appears every 5 seconds
    useEffect(()=>{
        setNewCustomer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setNewCustomer = () => {
        setInterval(()=>{
            setCustomerNum(customerNum => customerNum + 1);
        }, speed);
    }

    // executes code to create a customer once new customer is added to the array
    useEffect(()=>{
        if(isPaused){
           return; 
        }
        
        const newCustomerArr = [...customerArr]
        const randomIndex = Math.floor(Math.random() *  platformHeightArr.length);
        const randomIndexForFood = Math.floor(Math.random() *  platformHeightArr.length);
        const randomCustomer = Math.floor(Math.random() *  platformHeightArr.length);
        const randomFood = foodList[randomIndexForFood];
        const height = platformHeightArr[randomIndex];
        setWantFood(randomFood)

        newCustomerArr.push({customerNum, height, wantFood, randomCustomer});
        setCustomerArr(newCustomerArr);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerNum])

    const [collideDishIndex, setCollideDishIndex] = useState(null);
    const [collideCustomerIndex, setCollideCustomerIndex] = useState(null);
    const [checkGrabbedFood, setCheckGrabbedFood] = useState(null);
    const [checkWantFood, setCheckWantFood] = useState(null);
    const [isNewArr, setIsNewArr] = useState(false);
    const [customerDeadPosition, setCustomerDeadPosition] = useState(null);

 setInterval(() => {

        // customer collision
        if(customerArr.length){
            for(let j = 0; j < customerArr.length; j++){

                const customer = document.querySelector(`.customer${customerArr[j].customerNum}`);
                const platform = document.querySelector(".test-platform");

                if(customer){
                    const customerPosition = customer.getBoundingClientRect().x;
                    const platformPosition = platform.getBoundingClientRect().right;

                    if(platformPosition - customerPosition <= 30){
                        setCollideCustomerIndex(customerArr[j].customerNum);
                        setCheckWantFood(customerArr[j].wantFood);
                        setCustomerDeadPosition(customerPosition);
                        setIsNewArr(true);
                    }
                }
            }
        }

        // dish collision
        if(dishArr.length){

            for(let i = 0; i < dishArr.length; i++){
                const dish = document.querySelector(`.dish${dishArr[i].dishNum}`);
                if(dish){
                    const dishPosition = dish.getBoundingClientRect().x;

                    // if dish is at the end of the screen
                    if(dishPosition < 0){
                        minusUserHeart();
                    }
 
                    // dish & customer collision
                    if(customerArr.length){
                        for(let j = 0; j < customerArr.length; j++){

                            const customer = document.querySelector(`.customer${customerArr[j].customerNum}`);

                            if(customer){
                                const customerPosition = customer.getBoundingClientRect().x;
                                
                                if (dishPosition - customerPosition <= 80 && dishArr[i].height === customerArr[j].height) {
                                    customerArr[j].status = "happy";
                                    
                                    setCollideDishIndex(dishArr[i].dishNum);
                                    setCollideCustomerIndex(customerArr[j].customerNum);
                                    setCheckGrabbedFood(dishArr[i].grabbedFood);
                                    setCheckWantFood(customerArr[j].wantFood);
                                    setCustomerDeadPosition(customerPosition);
                                    setIsNewArr(true);
                                }
                            }
                        }
                    }
                }
            }
        }

        
    }, 100); 


    // set new array with survived customers/dishes
    useEffect(()=>{
        if(!customerArr){
            return;
        }


        const targetCustomer = customerArr.filter((customer) => customer.customerNum === collideCustomerIndex);
        
        try{
            if(checkWantFood !== checkGrabbedFood){
                const survivedDishes = dishArr.filter((dish) => dish.dishNum !== collideDishIndex);
    
                customerArr.forEach((customer) => {
                    if(customer.customerNum === targetCustomer[0].customerNum){
                        customer.status = "angry";
                    }
                })
    
                setCustomerArr(customerArr);
                setDishArr(survivedDishes);
    
                setTimeout(()=>{
                    minusUserHeart();
                }, 1000)
    
            } else{
                // const survivedCustomers = customerArr.filter((customer) => customer.customerNum !== collideCustomerIndex);
                const survivedDishes = dishArr.filter((dish) => dish.dishNum !== collideDishIndex);
    
                customerArr.forEach((customer) => {
                    if(customer.customerNum === targetCustomer[0].customerNum){
                        customer.status = "happy";
                    }
                })    
                // setCustomerArr(survivedCustomers);
                setCustomerArr(customerArr);
                setDishArr(survivedDishes);
                handleScore();
            }
            
            setIsNewArr(false); 
        } catch{
            console.log("error in collision detection");
        }
      
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isNewArr])

    const [remove, setRemove] = useState(false);

    const removeCustomer = () => {
        setRemove(!remove);
    }

    useEffect(()=>{
        const survivedCustomers = customerArr.filter((customer) => customer.customerNum !== collideCustomerIndex);
        setCustomerArr(survivedCustomers);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remove])
        

    return (
        <>
            {dishArr.map(dish => (<Dish key={dish.dishNum} isPaused={isPaused} height={dish.height} dishNum = {dish.dishNum}grabbedFood={dish.grabbedFood} foodNum={foodNum}/>))} 
            {customerArr.map(customer => ( <Customer removeCustomer = {removeCustomer} key={customer.customerNum} isPaused={isPaused} height={customer.height} customerNum = {customer.customerNum} wantFood={customer.wantFood} customerDeadPosition={customerDeadPosition} randomCustomer={customer.randomCustomer} status={customer.status}/>))}
        </>
    )
}

export default DishCustomer