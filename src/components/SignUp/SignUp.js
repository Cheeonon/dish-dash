import { useState } from 'react';
import './SignUp.scss';
import { postSignUp } from '../../utils/axios';
import { Navigate } from 'react-router-dom';


const SignUp = () => {
    const [isSignedUp, setIsSignedUp] = useState(false);

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
            console.log(error);
            alert("Failed to signup");
        })


        event.preventDefault();
        event.target.reset();
    }

    if(isSignedUp){
        return <Navigate to="/users/login" />;
    }

    return (
        <>
            <form className="signup" onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <label>Username: <input type="text" name="userName"/></label>
                <label>Password: <input type="password" name="password"/></label>
                <button>Sign Up</button>
            </form>
        </>
    )
}

export default SignUp