import React, { useState } from 'react';
import LoginStyle from './LoginStyle.module.css';
import { Navigate } from 'react-router-dom';


const LoginPage = () => {

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const [routeToTaskTracker, setrouteToTaskTracker] = useState(false)
  const [routeToSignup, setrouteToSignup] = useState(false)
  const [Email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [errorMessage, seterrorMessage] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const validate = () => {
    if (regex.test(Email) && passwordRegex.test(password)) {
      return true
    } else {
      return false
    }
  }
  const handleValidation = async () => {

    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/credentials');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let checker = data.some((datum) => datum.Email === Email && datum.password === password)
        let mailChecker = data.some((datum) => datum.mail === Email)
        if (checker) {
          sessionStorage.setItem('myvalue', Email)
          setrouteToTaskTracker(true)
        } else if (mailChecker) {
          seterrorMessage('Wrong password')
        }
        else {
          seterrorMessage('Sign up before login')
        }

      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    } else if (!regex.test(Email) && !passwordRegex.test(password)) {
      seterrorMessage('Please enter a valid email address and password');
    } else if (!regex.test(Email)) {
      seterrorMessage('Please enter a valid email address');
    } else if (!passwordRegex.test(password)) {
      seterrorMessage('Please enter a password having 8 characters including atleast 1 uppercase,1 lowercase,1 special character and 1 digit');
    }
  };

  if (routeToTaskTracker) {
    return <Navigate to='/tasktracker' />;
  }
  if (routeToSignup) {
    return <Navigate to='/signuploginpage' />;
  }

  return (
    <div className={LoginStyle.body}>
      <div className={LoginStyle.container}>
        <div className={LoginStyle.header}>
          <div className={LoginStyle.text}>Log in</div>
          <div className={LoginStyle.underline}></div>
        </div>
        {errorMessage.length > 0 && (<div style={{ color: 'red', marginBottom: '-8px', marginTop: '16px', maxWidth: '245px' }}>{errorMessage}</div>)}
        <div className={LoginStyle.inputs}>
          <div className={LoginStyle.input}>
            <input className={LoginStyle.input} type='email' placeholder='E-mail' value={Email} onChange={handleEmailChange}></input>
          </div>
          <div className={LoginStyle.input}>
            <input className={LoginStyle.input} type='password' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
          </div>
        </div>
        <div className={LoginStyle.forget - password}>
          New User? <span style={{ color: 'blue' }} onClick={() => setrouteToSignup(true)}> Create account</span>
        </div>
        <div className={LoginStyle.submitcontainer}>
          <button className={LoginStyle.submit} onClick={handleValidation}>Log In</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
