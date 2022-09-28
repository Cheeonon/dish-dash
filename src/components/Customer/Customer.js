import { useEffect, useState } from "react";
import "./Customer.scss";

const Customer = ({ removeCustomer, status, isPaused, height, customerNum, wantFood, customerDeadPosition, randomCustomer}) => {

  if(status === "happy"){
    setTimeout(()=>{
      removeCustomer()
    }, 200)
  }

    return (
        <div
            className={
                (status === "angry" || isPaused)
                    ? `customer-test paused customer-test__customer-${randomCustomer+1}-angry customer${customerNum}`
                    : `customer-test customer-test__customer-${randomCustomer+1} customer${customerNum}`
            }
            style={
              (status === "angry")
                    ? { bottom: height, left: customerDeadPosition}
                    : { bottom: height}
            }
        >
          <div className={
            (status === "angry")
              ? ""
              : "customer-test__want"
            }>
              <div className={
                (status === "happy")
                ? `customer-test__food customer-test__happy`
                : `customer-test__food food-test__${wantFood}`
                }>
                
              </div>
          </div>
        </div>
    );
};

export default Customer;
