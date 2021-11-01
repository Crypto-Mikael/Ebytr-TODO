import React, { useState } from 'react';

function LoginForms() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <div>
        <label htmlFor="email">
          Email
          <input
            type="email"
            id="email"
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
        >
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForms;
