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
    <form
      style={ {
        border: '1px solid',
        borderRadius: '5px',
        borderWidth: '2px',
        padding: '20px',
      } }
    >
      <div className="col-mb-3">
        <label htmlFor="email" className="form-label">
          Email
          <input
            type="email"
            className="form-control form-group"
            id="email"
            placeholder="Email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>
      </div>

      <div className="col-mb-3">
        <label htmlFor="password" className="form-label">
          Password
          <input
            type="password"
            className="form-control form-group"
            id="password"
            placeholder="Password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </div>

      <div className="d-grid gap-6 d-md-inline mr-3">
        <button
          type="button"
          className="btn btn-info"
          onClick={ () => ValidateLogin() }
          style={ {
            marginRight: '1rem',
          } }
        >
          SignIn
        </button>
      </div>

      <div className="d-grid gap-6 d-md-inline">
        <Link to="signup">
          <button
            type="button"
            className="btn btn-warning"
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
