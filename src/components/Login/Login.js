import { useState } from 'react';
import './Login.scss';
import { postLogin } from '../../utils/axios';
import GamePage from '../../pages/GamePage/GamePage';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // sign up when the form is submitted
    const handleSubmit = (event) => {

        // send post request
        postLogin({
            userName: event.target.userName.value,
            password: event.target.password.value
        })
        .then(resolve => {
            sessionStorage.token = resolve.data.token;
            setIsLoggedIn(true);
        })
        .catch(error => {
            console.log(error);
            alert("Failed to login");
        })

        event.preventDefault();
        event.target.reset();
    }

    if(isLoggedIn){
        return <GamePage />
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