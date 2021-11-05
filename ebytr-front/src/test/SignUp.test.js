import React from 'react';
import '@testing-library/jest-dom';
import { SignUp } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Sign Up Page', () => {
  it('Quando abrir pagina de login o input "Name" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<SignUp />);

    const password = getByPlaceholderText('Name');
    expect(password.placeholder).toBe('Name');
  });
  it('Quando abrir pagina de login o input "Email" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<SignUp />);

    const email = getByPlaceholderText('Email');
    expect(email.placeholder).toBe('Email');
  });
  it('Quando abrir pagina de login o input "Password" exista na tela', () => {
    const { getByPlaceholderText } = renderWithRouter(<SignUp />);

    const password = getByPlaceholderText('Password');
    expect(password.placeholder).toBe('Password');
  });
});
