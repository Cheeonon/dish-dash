import { useState } from "react";
import { Link } from "react-router-dom";
import "./RootPage.scss";

const RootPage = () => {
    const [isSignUp, setIsSignUp] = useState(false);

    const handleSignUp = () => {
        setIsSignUp(!isSignUp);
    };

    return (
        <div className="root">
                <div className="root__bg">
                    <div className="root__content">
                        <div className="root__title">DISH DASH</div>
                        <ul className="root__list">
                            <Link to="/users/sign-up" className="root__item" onClick={handleSignUp}>Sign up</Link>
                            <Link to="/users/login" className="root__item">Login</Link>
                        </ul>
                    </div>
                </div>
        </div>
    );
};

export default RootPage;
