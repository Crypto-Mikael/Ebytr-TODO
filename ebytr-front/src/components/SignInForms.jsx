/* eslint-disable max-len */
import React, { useState } from 'react';
import axios from 'axios';

function SignInForms() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const ValidateLogin = async () => {
    const data = { email, password };
    const validation = await axios.post('http://localhost:4000/employees/login', data);
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
    </form>
  );
}

export default SignInForms;
