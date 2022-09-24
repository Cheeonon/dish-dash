import { useEffect, useState } from "react";
import "./TestCustomer.scss";

const TestCustomer = ({ height, customerNum, isGameOver, wantFood, customerStatus, customerDeadPosition}) => {
    useEffect(()=>{
      if(isGameOver){

      }
    }, [isGameOver])

    if(customerStatus === "angry"){
      // console.log("customer angry")
    } else if (customerStatus === "happy"){
      // console.log("customer happy");
    }

 
    return (
        <div
            className={
                (customerStatus === "angry")
                    ? `customer-test customer${customerNum} customer-test__gameover`
                    : `customer-test customer${customerNum}`
            }
            style={
              (customerStatus === "angry")
                    ? { bottom: height, left: customerDeadPosition}
                    : { bottom: height}
            }
        >
          <div className={
            (customerStatus === "angry")
              ? ""
              : "customer-test__want"
            }>
            <div className={`customer-test__food food-test__${wantFood}`}>
              
            </div>
        </div>
        </div>
    );
};

export default TestCustomer;
