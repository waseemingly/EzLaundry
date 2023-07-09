import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from './RegisterScreen';

describe('RegisterScreen', () => {
  test('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('New Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register');

    // Perform assertions as needed
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(confirmPasswordInput).toBeDefined();
    expect(registerButton).toBeDefined();
  });

  test('handles registration', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen />);

    const emailInput = getByPlaceholderText('Email');
    const passwordInput = getByPlaceholderText('New Password');
    const confirmPasswordInput = getByPlaceholderText('Confirm Password');
    const registerButton = getByText('Register');

    // Simulate user interactions
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'password123');
    fireEvent.changeText(confirmPasswordInput, 'password123');
    fireEvent.press(registerButton);

    // Perform assertions or async checks if necessary
    // For example, you can assert that the registration process was successful
  });
});
