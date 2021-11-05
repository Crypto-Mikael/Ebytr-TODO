import React from 'react';
import '@testing-library/jest-dom';
import { Tasks } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Tasks Page', () => {
  it('Quando abrir pagina de tasks o input "Tasks" exista na tela', () => {
    const { getByText } = renderWithRouter(<Tasks />);
    const task = getByText('Bem vindo!');
    expect(task.innerHTML).toBe('Bem vindo!');
  });
});
