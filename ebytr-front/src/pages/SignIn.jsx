import React from 'react';
import { SignInForms } from '../components';

function SignIn() {
  return (
    <div
      className="container"
      style={ {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
      } }
    >
      <div
        className="div-form"
        style={ {
          height: '40vh',
          display: 'flex',
          flexDirection: 'column',
          alignSelf: 'center',
        } }
      >
        <SignInForms />
      </div>
    </div>
  );
}

export default SignIn;
