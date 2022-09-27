import "./Dish.scss";

const Dish = ({height, dishNum, grabbedFood, foodNum}) => {

    return (
        // <div className={`dish-test dish${dishNum}`} style={{bottom: height}}></div>

        <div
            className={`dish-test dish${dishNum}`}
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
