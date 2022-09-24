import { Children, useEffect, useState } from 'react';
import TestCustomer from '../TestCustomer/TestCustomer';
import TestDish from '../TestDish/TestDish';
import './TestDishCustomer.scss';

const TestDishCustomer = ({foodList, platformHeightArr, grabbedFood, shootDish, setShootFalse, currentPlatformIndex, setGameOver, isGameOver}) => {

    const [dishArr, setDishArr] = useState([]);
    const [dishNum, setDishNum] = useState(300);

    const [customerArr, setCustomerArr] = useState([]);
    const [customerNum, setCustomerNum] = useState(400);

    const [foodNum, setFoodNum] = useState(500);
    const [wantFood, setWantFood] = useState(null);
   
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
        
    }, [shootDish])
    

    // new customer appears every 5 seconds
    useEffect(()=>{
        setNewCustomer();
    }, [])

    const setNewCustomer = () => {
        setInterval(()=>{
            setCustomerNum(customerNum => customerNum + 1);
        }, 7000);
    }

    // executes code to create a customer once new customer is added to the array
    useEffect(()=>{
        const newCustomerArr = [...customerArr]
        const randomIndex = Math.floor(Math.random() *  platformHeightArr.length);
        const randomIndexForFood = Math.floor(Math.random() *  platformHeightArr.length);
        const randomFood = foodList[randomIndexForFood];
        const height = platformHeightArr[randomIndex];
        setWantFood(randomFood)

        newCustomerArr.push({customerNum, height, wantFood});
        setCustomerArr(newCustomerArr);
    }, [customerNum])

    const [collideDishIndex, setCollideDishIndex] = useState(null);
    const [collideCustomerIndex, setCollideCustomerIndex] = useState(null);
    const [checkGrabbedFood, setCheckGrabbedFood] = useState(null);
    const [checkWantFood, setCheckWantFood] = useState(null);
    const [isNewArr, setIsNewArr] = useState(false);
    const [customerDeadPosition, setCustomerDeadPosition] = useState(null);

 setInterval(() => {
        // dish collision
        if(dishArr.length){

            for(let i = 0; i < dishArr.length; i++){
                const dish = document.querySelector(`.dish${dishArr[i].dishNum}`);
                if(dish){
                    const dishPosition = dish.getBoundingClientRect().x;

                    // if dish is at the end of the screen
                    if(dishPosition < 0){
                        // setGameOver();
                    }

                    // customer collision
                    if(customerArr.length){
                        for(let j = 0; j < customerArr.length; j++){

                            const customer = document.querySelector(`.customer${customerArr[j].customerNum}`);
                            if(customer){
                                const customerPosition = customer.getBoundingClientRect().x;
                                
                                if (dishPosition - customerPosition <= 80 && dishArr[i].height === customerArr[j].height) {

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

    console.log(customerDeadPosition)

    const [customerStatus, setCustomerStatus] = useState("");

    // set new array with survived customers/dishes
    useEffect(()=>{
        

        if(checkWantFood !== checkGrabbedFood){
            console.log("gameOver")
            setCustomerStatus("angry")
        } else{
            const survivedCustomers = customerArr.filter((customer) => customer.customerNum !== collideCustomerIndex);
            const survivedDishes = dishArr.filter((dish) => dish.dishNum !== collideDishIndex);
            
            setCustomerStatus("happy")
            setCustomerArr(survivedCustomers);
            setDishArr(survivedDishes);
        }
    
        setIsNewArr(false);
        
    }, [isNewArr])

    


    return (
        <>
            {dishArr.map(dish => (<TestDish key={dish.dishNum} height={dish.height} dishNum = {dish.dishNum} setGameOver={setGameOver} grabbedFood={dish.grabbedFood} foodNum={foodNum}/>))} 
            {customerArr.map(customer => ( <TestCustomer key={customer.customerNum} customerStatus={customerStatus} height={customer.height} customerNum = {customer.customerNum} setGameOver={setGameOver} isGameOver={isGameOver} wantFood={customer.wantFood} customerDeadPosition={customerDeadPosition}/>))}
        </>
    )
}

export default TestDishCustomer