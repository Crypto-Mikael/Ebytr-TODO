import React, { useState } from 'react';

function RegisteForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  return (
    <form>
      <div>
        <label htmlFor="name">
          Name
          <input
            type="name"
            id="name"
            placeholder="Name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
      </div>
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
          onClick={ () => signUp() }
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default RegisteForm;
