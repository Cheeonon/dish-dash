import './Login.scss';
import { postLogin } from '../../utils/axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    // sign up when the form is submitted
    const handleSubmit = (event) => {
        setIsSubmitted(true);
        setUserName(event.target.userName.value);
        setPassword(event.target.password.value);

        event.preventDefault();
        event.target.reset();
    }

    useEffect(()=>{
        if(isSubmitted){
            // send post request
            postLogin({
                userName: userName,
                password: password
            })
            .then(resolve => {
                const tokenLocation =  `token${userName}`;
                sessionStorage.setItem(tokenLocation, resolve.data.token);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.log(error);
                alert("Failed to login");
            })
        }
    }, [isSubmitted])


    if(isLoggedIn){
        // pass currentUser as a parameter so that GamePage can use it for auth header
        navigate('/game', {state: {userName: userName}});
    }


  return (
    <>
        <form className="login" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>Username: <input type="text" name="userName"/></label>
            <label>Password: <input type="password" name="password"/></label>
            <button>Login</button>
        </form>
    </>
  )
}

export default Login