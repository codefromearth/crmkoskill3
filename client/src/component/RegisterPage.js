import React from 'react';
import './RegisterPage.css';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';

export default function RegisterPage() {
  const navigate=useNavigate();
  const onFinishHandler = async (event) => {
    event.preventDefault();
    const { Name, email, password } = event.target.elements;
    const values = {
      name: Name.value,
      email: email.value,
      password: password.value,
    };
    console.log(values);

    try {
      const res = await axios.post('/api/v1/user/register', values, {
        referrerPolicy: 'no-referrer-when-downgrade',
      });

      if (res.data.success) {
        window.alert('Registered Successfully');
        navigate('/login');
      } else {
        window.alert('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      window.alert('An error occurred while registering.');
    }
  };

  return (
    <div className="form">
      <form className="form-body" onSubmit={onFinishHandler}>
        <h1>Register Form</h1>
        <div className="username">
          <label className="form__label" htmlFor="Name">
            Name
          </label>
          <input className="form__input" type="text" id="Name" placeholder="Name" />
        </div>

        <div className="email">
          <label className="form__label" htmlFor="email">
            Email
          </label>
          <input type="email" id="email" className="form__input" placeholder="Email" />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input className="form__input" type="password" id="password" placeholder="Password" />
        </div>

        <Link to="/login">Already a user? Login here</Link>
        <div className="footer">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
