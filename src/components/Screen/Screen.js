import { useEffect, useState } from 'react';
import Customer from '../Customer/Customer';
import Player from '../Player/Player';
import './Screen.scss';

function Platform ({positionY}){
    return(
        <div className="platform" style={{top: positionY}}></div>
    )
}

const Screen = () => {
    const platformNum = 4;
    const platformArr = [];
    const platformHeightArr = [];
    const [customerCount, setCustomerCount] = useState(0);
    const [customerArr, setCustomerArr] = useState([]);
    const [customersCurrentPosition, setCustomersCurrentPosition] = useState(null);

    for(let i = 1; i <= platformNum; i++){
        // screen height: 750px
        // platform height: 70px
        const height = (750 - 70) / platformNum;
        const platformHeight = height * i;

        platformArr.push(<Platform key={i} positionY = {platformHeight}/>)
        platformHeightArr.push(platformHeight);
    }
 
    // new customer appears every 5 seconds
    useEffect(()=>{
        // setNewCustomer();
    }, [])

    const setNewCustomer = () => {
        setInterval(()=>{
            setCustomerCount(customerCount => customerCount + 1);
        }, 5000);
    }

    // executes code to create a customer when new customer is added to the array
    useEffect(()=>{
        const newArr = [...customerArr]
        const randomPlatform = Math.floor(Math.random() * platformNum);
        const customerPositionY = platformHeightArr[randomPlatform];
        newArr.push({customerPositionY, customerCount});
        setCustomerArr(newArr);
    }, [customerCount])


    const detectCollision = () => {
        if(customerArr.length){
            
            for(let i = 0; i < customerArr.length; i++){
                const currentCustomer = customerArr[i];

                let customer = document.querySelector(`.customer${currentCustomer.customerCount}`);
                let customerCount = currentCustomer.customerCount;

                // if reactDOM renders div.dish --> this is to avoid executing code on a variable with null
                if(customer){
                    const screen = document.querySelector(".screen");
                    const screenSize = screen.getBoundingClientRect().right - 70;
                    const customerCurrentPosition = customer.getBoundingClientRect().x;
                    setCustomersCurrentPosition(customer.getBoundingClientRect().x);

                    // get customer's current position and pass it to player
                    // const newCustomersPosition = [...customersCurrentPosition]
                    // newCustomersPosition.push({customerCount : customerCurrentPosition});
                    // setCustomersCurrentPosition(newCustomersPosition)
                    console.log(customersCurrentPosition) 

                    // if customer is at the end of the screen
                    if(customerCurrentPosition >= screenSize){
                        const survivedCustomers = customerArr.filter(customer => customer.customerCount != customerArr[i].customerCount);
                        setCustomerArr(survivedCustomers);
                    } 
                    // else if(){
                    //     // or if the customer is hit by dish

                    // }
                }
            }

            window.requestAnimationFrame(detectCollision);
        }
    }
   
    detectCollision();


  return (
    <div className='screen'>
        {platformArr.map(platform => {return platform})}
        <Player platformHeightArr={platformHeightArr} platformNum={platformNum} />
        {customerArr.map(customer => ( <Customer customersCurrentPosition={customersCurrentPosition} key={customer.customerCount} customerCount={customer.customerCount} customerPositionY={customer.customerPositionY}/>))}
    </div>
  )
}

export default Screen