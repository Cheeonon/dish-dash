import './LoginPage.scss';
import { postLogin } from '../../utils/axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const LoginPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [userName, setUserName] = useState(null);
    const [password, setPassword] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (event) => {

        setUserName(event.target.userName.value.toUpperCase());
        setPassword(event.target.password.value.toUpperCase());
        event.preventDefault();
        event.target.reset();

        setIsSubmitted(true);
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
                setIsError(true);
                setErrorMsg(error.response.data.message);
            })
        }
    }, [isSubmitted])

    if(isLoggedIn){
        // pass currentUser as a parameter so that GamePage can use it for auth header
        navigate('/home', {state: {userName: userName}});
    }


  return (
    <form className="login" onSubmit={(event) => {handleSubmit(event)}}>
        <Link to="/" className="signup__back"></Link>
        <div className="login__bg">
            <div className="login__content">
                <h1 className="login__title">Login</h1>
                <label><input className="login__input" type="text" name="userName" placeholder='User name'/></label>
                <label><input className="login__input" type="password" name="password" placeholder='Password'/></label>
                {isError && <span className="login__error">{errorMsg}</span>}
                <button className="login__btn">Login</button>
            </div>
        </div>
    </form>
  )
}

export default LoginPage
