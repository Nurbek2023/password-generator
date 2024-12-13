import { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8); // Default length for password
  const [strength, setStrength] = useState(''); // Define strength state

  // Function to generate password
  const generatePassword = () => {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
    evaluateStrength(generatedPassword); // Corrected this to pass the generated password
  };

  // Function to evaluate password strength
  const evaluateStrength = (password) => {
    let strengthLevel = 'Weak';

    // Check for different criteria
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password);

    // Password strength rules
    if (password.length >= 12 && hasUppercase && hasLowercase && hasNumber && hasSpecialChar) {
      strengthLevel = 'Strong';
    } else if (password.length >= 8 && (hasUppercase || hasLowercase) && hasNumber) {
      strengthLevel = 'Medium';
    }

    setStrength(strengthLevel); // Update strength state
  };

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(
      () => alert('Password copied to clipboard!'),
      (err) => alert('Failed to copy password: ', err)
    );
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <div>
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          min="1"
          max="50"
          placeholder="Password Length"
        />
        <button onClick={generatePassword}>Generate Password</button>
      </div>
      <div className="password-result">
        <p>{password}</p>
        {password && (
          <>
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
            <p>Password Strength: {strength}</p> {/* Display password strength */}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
