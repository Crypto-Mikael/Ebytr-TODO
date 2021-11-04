/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function SignInForms() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successesLogIn, setSuccessesLogIn] = useState(false);

  const ValidateLogin = async () => {
    const data = { email, password };
    const validation = await axios.post('http://localhost:4000/employees/login', data);
    localStorage.setItem('token', validation.data.token);
    setSuccessesLogIn(true);
    return validation;
  };

  return (
    <form>
      <div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
      </div>
      <div>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </div>

      <div>
        <button
          type="button"
          onClick={ () => ValidateLogin() }
        >
          SignIn
        </button>
      </div>

      <div>
        <Link to="signup">
          <button
            type="button"
          >
            SignUp
          </button>
        </Link>
      </div>

      { successesLogIn && <Redirect to="/tasks" /> }
    </form>
  );
}

export default SignInForms;
