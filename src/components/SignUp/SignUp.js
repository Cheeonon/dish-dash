import { useState } from 'react';
import './SignUp.scss';
import { postSignUp } from '../../utils/axios';
import { Link, Navigate } from 'react-router-dom';


const SignUp = () => {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
 
    // sign up when the form is submitted
    const handleSubmit = (event) => {

        // send post request
        postSignUp({
            userName: event.target.userName.value,
            password: event.target.password.value
        })
        .then(resolve => {
            setIsSignedUp(true);
        })
        .catch(error => {
            setIsError(true);
            setErrorMsg(error.response.data.message);
        })


        event.preventDefault();
        event.target.reset();
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <Link to="/" className="signup__back"></Link>
            <div className="signup__bg">
                <div className="signup__content">
                {isSignedUp 
                ? <>
                    <span className="signup__msg">Successfully signed up!</span>
                    <span className="signup__msg">Please login to play dish dash.</span>
                    <Link to="/users/login"  className='signup__btn'>To the login page -{`>`}</Link>
                  </>
                : <>
                    <h1 className="signup__title">Sign Up</h1>
                    <label><input className="signup__input" type="text" name="userName" placeholder='User name'/></label>
                    <label><input className="signup__input" type="password" name="password" placeholder='Password'/></label>
                    {isError && <span className="signup__error">{errorMsg}</span>}
                    <button className='signup__btn'>Sign Up -{`>`}</button>   
                  </>
                }
                </div>
            </div>
        </form>
    )
}

export default SignUp