import React from 'react';
import { render, screen } from '@testing-library/react';
import App, { AppWithStoreAuth0Povider } from './App';

test('renders To begin', () => {
  render(<AppWithStoreAuth0Povider />);
  const linkElement = screen.getByText(/login/i);
  expect(linkElement).toBeInTheDocument();
});
