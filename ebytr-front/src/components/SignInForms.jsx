/* eslint-disable react/no-multi-comp */
import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function SignInForms() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successesLogIn, setSuccessesLogIn] = useState(false);
  const [isValidLogin, setIsValidLogin] = useState(false);

  const ValidateLogin = async () => {
    try {
      const data = { email, password };
      const validation = await axios.post('http://localhost:4000/employees/login', data);
      localStorage.setItem('token', validation.data.token);
      setSuccessesLogIn(true);
      setIsValidLogin(false);
      return validation;
    } catch (err) {
      setIsValidLogin(true);
    }
  };

  return (
    <form
      style={ {
        border: '1px solid',
        boxShadow: '0px 0px 10px 5px #f5f5f5',
        borderRadius: '5px',
        borderWidth: '2px',
        backgroundColor: '#b1b1b1',
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
        <label htmlFor="validationServer01" className="form-label">
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
        { isValidLogin && <p>Email or password wrong.</p> }
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
