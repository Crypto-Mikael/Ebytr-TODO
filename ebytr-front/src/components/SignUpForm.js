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

      { errorMenssage ? <p>{errorMenssage}</p> : null }

      <div className="d-grid gap-6 d-md-inline">
        <button
          disabled={ !email || !password || !name }
          className="btn btn-info btn-inline"
          type="button"
          data-testid="button-signup"
          style={ {
            marginTop: '1rem',
            marginRight: '1rem',
          } }
          onClick={ () => onClick() }
        >
          SingUp
        </button>
      </div>

      <div className="d-grid gap-6 d-md-inline">
        <Link to="/">
          <button
            className="btn btn-danger btn-inline"
            type="button"
            style={ {
              marginTop: '1rem',
              marginRight: '1rem',
            } }
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
