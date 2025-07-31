import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the Layout component to avoid router issues in tests
jest.mock('./components/layout/Layout', () => {
  return function MockLayout() {
    return <div data-testid="layout">Mock Layout Component</div>;
  };
});

test('renders app with layout', () => {
  render(<App />);
  const layoutElement = screen.getByTestId('layout');
  expect(layoutElement).toBeInTheDocument();
});
