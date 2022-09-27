import { useEffect, useState } from "react";
import "./Customer.scss";

const Customer = ({ isPaused, resetStatus, height, customerNum, isGameOver, wantFood, customerStatus, customerDeadPosition, randomCustomer}) => {
    const [customerBackground, setCustomerBackground] = useState("") 
    useEffect(()=>{
      if(isGameOver){

      }
    }, [isGameOver])

    useEffect(()=>{
      if(customerStatus === "angry"){
        setCustomerBackground("angry");
        resetStatus();
      } else if (customerStatus === "happy"){
        setCustomerBackground("happy");
        resetStatus()
      }
    }, [customerBackground])
    
    // console.log(wantFood)
 
    return (
        <div
            className={
                (customerBackground === "angry" || isPaused)
                    ? `customer-test paused customer-test__customer-${randomCustomer+1} customer${customerNum}`
                    : `customer-test customer-test__customer-${randomCustomer+1} customer${customerNum}`
            }
            style={
              (customerBackground === "angry")
                    ? { bottom: height, left: customerDeadPosition}
                    : { bottom: height}
            }
        >
          <div className={
            (customerBackground === "angry")
              ? ""
              : "customer-test__want"
            }>
            <div className={
              (customerBackground === "happy")
              ? `customer-test__food  food-test__${wantFood} food-test__happy`
              : `customer-test__food food-test__${wantFood}`
              }>
              
            </div>
        </div>
        </div>
    );
};

export default Customer;
