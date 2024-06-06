import React, { useState } from 'react';
import Style from './LoginSignupStyle.module.css';
import { Navigate } from 'react-router-dom';

const LoginSignup = ({setEndPoint}) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  const [routeToTasktacker, setrouteToTasktacker] = useState(false)
  const [routeToLogin, setrouteToLogin] = useState(false)
  const [Email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [errorMessage, seterrorMessage] = useState('')
  const [Name, setName] = useState('')
  
 
  const handleNameChange = (e) => {
    setName(e.target.value)
  }

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
      const newCredential = { Name, Email, password }
      try {
        await fetch('http://localhost:5000/credentials', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newCredential)
        })
        await fetch('http://localhost:3002/add-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            endpoint: Email, 
            data: [] 
          }),
        });
        sessionStorage.setItem('myvalue', Email)
        setEmail('')
        setName('')
        setpassword('')
        setrouteToTasktacker(true)
      } catch (error) {
        console.error('Error:', error);
      }
    } else if (!regex.test(Email) && !passwordRegex.test(password)) {
      seterrorMessage('Please enter a valid email address and password');
    } else if (!regex.test(Email)) {
      seterrorMessage('Please enter a valid email address');
    } else if (!passwordRegex.test(password)) {
      seterrorMessage('Please enter a password having 8 characters including atleast 1 uppercase,1 lowercase,1 special character and 1 digit');
    }
  };

  if (routeToTasktacker) {
    return <Navigate to='/tasktracker' />;
  }

  if (routeToLogin) {
    return <Navigate to='/' />;
  }

  return (
    <div className={Style.body}>
      <div className={Style.container}>
        <div className={Style.header}>
          <div className={Style.text}>Sign Up</div>
          <div className={Style.underline}></div>
        </div>
        {errorMessage.length > 0 && (<div style={{ color: 'red', marginBottom: '-8px', marginTop: '16px', maxWidth: '245px' }}>{errorMessage}</div>)}
        <div className={Style.inputs}>
          <div className={Style.input}>
            <input className={Style.input} type='text' placeholder='Name' value={Name} onChange={handleNameChange}></input>
          </div>
          <div className={Style.input}>
            <input className={Style.input} type='email' placeholder='Email' value={Email} onChange={handleEmailChange}></input>
          </div>
          <div className={Style.input}>
            <input className={Style.input} type='password' placeholder='Password' value={password} onChange={handlePasswordChange}></input>
          </div>
        </div>
        <div className={Style.forgetpassword}>
          existing user? please<span style={{ color: 'blue' }} onClick={() => setrouteToLogin(true)}> Log in</span>
        </div>
        <div className={Style.submitcontainer}>
          <button className={Style.submit} onClick={handleValidation}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
