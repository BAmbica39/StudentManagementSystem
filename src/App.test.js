import { render, screen } from '@testing-library/react';
import { MemoryRouter } from  'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  render(<MemoryRouter initialEntries={'/login'}>
  <App />
  </MemoryRouter>
 );
  const loginHeading = screen.getByText(/login/i);
  expect(loginHeading).toBeInTheDocument();
});
