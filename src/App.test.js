import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hydration tracker title', () => {
  render(<App />);
  const titleElement = screen.getByText(/hydration tracker/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders water intake buttons', () => {
  render(<App />);
  const button100ml = screen.getByText('+100ml');
  const button250ml = screen.getByText('+250ml');
  const button500ml = screen.getByText('+500ml');
  const button750ml = screen.getByText('+750ml');
  
  expect(button100ml).toBeInTheDocument();
  expect(button250ml).toBeInTheDocument();
  expect(button500ml).toBeInTheDocument();
  expect(button750ml).toBeInTheDocument();
});

test('renders daily goal input', () => {
  render(<App />);
  const goalInput = screen.getByLabelText(/daily goal/i);
  expect(goalInput).toBeInTheDocument();
});

test('renders reset button', () => {
  render(<App />);
  const resetButton = screen.getByText(/reset day/i);
  expect(resetButton).toBeInTheDocument();
});