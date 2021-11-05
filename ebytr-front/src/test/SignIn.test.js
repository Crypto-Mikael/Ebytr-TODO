import React from 'react';
import '@testing-library/jest-dom';
import { SignIn } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Quando abrir a pagina', () => {
  it('O input "Email" deve existir na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<SignIn />);

    const email = getByPlaceholderText('Email');
    expect(email.placeholder).toBe('Email');
  });
  it('O input "Password" deve existir na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<SignIn />);

    const password = getByPlaceholderText('Password');
    expect(password.placeholder).toBe('Password');
  });
  it('O botão "SignIn" deve existir na tela', () => {
    const { getByTestId } = renderWithRouter(<SignIn />);
    const password = getByTestId('button-signin');
    expect(password.innerHTML).toBe('SignIn');
  });
  it('O botão "SignUp" deve existir na tela', () => {
    const { getByTestId } = renderWithRouter(<SignIn />);
    const password = getByTestId('button-signup');
    expect(password.innerHTML).toBe('SignUp');
  });
});
