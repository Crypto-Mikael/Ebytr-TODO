import React from 'react';
import { SignUpForm } from '../components';

function SignUp() {
  return (
    <div>
      <div
        className="container"
        style={ {
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
        } }
      >
        <div
          className="form-div"
          style={ {
            height: '40vh',
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
          } }
        >
          <h2>Sign Up</h2>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
