import './Customer.scss';

const Customer = ({customerPositionY, customerCount, customersCurrentPosition}) => {
    console.log(customersCurrentPosition)
  return (
    <div  className={`customer customer${customerCount}`} style={{top: customerPositionY}}> {customerCount} </div>
  )
}

export default Customer