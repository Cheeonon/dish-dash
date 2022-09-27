import "./Dish.scss";

const Dish = ({isPaused, height, dishNum, grabbedFood, foodNum}) => {

    return (
        // <div className={`dish-test dish${dishNum}`} style={{bottom: height}}></div>

        <div
            className=
            {(isPaused) 
                ?`dish-test paused dish${dishNum}`
                :`dish-test dish${dishNum}`}
            style={{ bottom: height }}
        >
            <div
                className={`dish-test__food food-test__${grabbedFood}`}
                key={foodNum}
            ></div>
        </div>
    );
}; 

export default Dish;
