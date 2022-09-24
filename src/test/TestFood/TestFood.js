import './TestFood.scss';

const TestFood = ({height, food}) => {
  return (
    <div className={`food-test food__${food}`} style={{bottom: height}}></div>
  )
}

export default TestFood