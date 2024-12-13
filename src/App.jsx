import { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8); // Default length for password

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
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        )}
      </div>
    </div>
  );
}

export default App;

