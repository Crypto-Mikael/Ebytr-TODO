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
      <div className="col-mb-3">
        <label htmlFor="name" className="form-label">
          Name
          <input
            type="name"
            className="form-control form-group"
            id="name"
            placeholder="Name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>
      </div>
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
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            className="form-control form-group"
            placeholder="Password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>
      </div>

      { errorMenssage ? <h3>{errorMenssage}</h3> : null }

      <div className="d-inline-mt gap-6 mt-2">
        <button
          disabled={ !email || !password || !name }
          className="btn btn-info btn-inline"
          type="button"
          onClick={ () => onClick() }
        >
          SingUp
        </button>
      </div>

      <div className="d-inline-mt gap-6">
        <Link to="/">
          <button
            className="btn btn-danger btn-inline"
            type="button"
          >
            Goback
          </button>
        </Link>
      </div>

      { errorMenssage === null ? <Redirect to="/" /> : null }
    </form>
  );
}

export default RegisteForm;
