import './Customer.scss';

const Customer = ({customerPositionY, customerCount}) => {
  return (
    <div  className={`customer customer${customerCount}`} style={{top: customerPositionY}}> {customerCount} </div>
  )
}

export default Customer