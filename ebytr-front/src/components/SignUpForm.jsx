import React, { useState } from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';

function RegisteForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMenssage, setErrorMenssage] = useState('');

  const onClick = async () => {
    const data = { name, email, password };
    const validation = await axios.post('http://localhost:4000/employees/register', data);
    if (validation.data.message) return setErrorMenssage(validation.data.message);
    setErrorMenssage(null);
    return validation;
  };

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

      { errorMenssage ? <h3>{errorMenssage}</h3> : null }

      <div>
        <button
          disabled={ !email || !password || !name }
          type="button"
          onClick={ () => onClick() }
        >
          SingUp
        </button>
      </div>

      <div>
        <Link to="/">
          <button
            type="button"
          >
            Back
          </button>
        </Link>
      </div>

      { errorMenssage === null ? <Redirect to="/" /> : null }
    </form>
  );
}

export default RegisteForm;
