import "./TestDish.scss";

const TestDish = ({height, dishNum, grabbedFood, foodNum}) => {

    return (
        // <div className={`dish-test dish${dishNum}`} style={{bottom: height}}></div>

        <div
            className={`dish-test dish${dishNum}`}
            style={{ bottom: height }}
        >
            <div
                className={`dish-test__food dish__${grabbedFood}`}
                key={foodNum}
            ></div>
        </div>
    );
};

export default TestDish;
