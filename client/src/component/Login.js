import React from 'react';
import './RegisterPage.css';
import { Link, useNavigate,  } from 'react-router-dom';
import axios from 'axios';
 function Login() {

     const navigate=useNavigate();
     //form handler
  const onFinishHandler = async(event) => {

     event.preventDefault();
    const { email, password } = event.target.elements;
    // console.log('Email:', email.value);
    // console.log('Password:', password.value);

       const values={
        email: email.value,
        password:password.value
       }

      try{
        const res =await axios.post('/api/v1/user/login',values)
        if(res.data.success)
        {
          localStorage.setItem('token',res.data.token);
          window.alert("login  successfull")
          navigate('/')
        }
        else{
          window.alert(res.data.message)
        }
      }catch(error)
      {
        window.alert("something went wrong")
      }



  };

  return (
    <div className="form">
      <form className="form-body" onSubmit={onFinishHandler}>
        <h1>Login Form</h1>

        <div className="email">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            placeholder="Email"
          />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <Link to="/register">Not a user? Register here</Link>
        {/* <navigate to="./register">Not a user? Register here</navigate> */}
        <div className="footer">
          <button type="submit" className="btn">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
 export default Login;