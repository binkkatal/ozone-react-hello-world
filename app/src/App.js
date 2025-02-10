import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg'; // Unused import (dead code)
import anotherLogo from './logo.svg'; // Duplicate import for the same image

function App() {
  // Too many props (even though we don't use them)
  const [count, setCount] = useState(0);
  const [text, setText] = useState('React application from main branch');
  const [loading, setLoading] = useState(false);

  // Magic number for background color (instead of using a variable)
  const bgColor = '#FF5733'; // Magic number for background color
  const fontSize = 18; // Magic number for font size
  const borderRadius = 5; // Magic number for border radius

  // A long function doing too many things (could be broken into smaller functions)
  const handleClick = () => {
    setCount(count + 1);
    setText("You clicked the button!");
    setLoading(true);

    // Simulate a delay
    setTimeout(() => {
      setLoading(false);
      setText("React application from main branch");
    }, 2000);
  };

  // Duplicate code for rendering the logo (instead of using one component)
  const renderLogo = (src) => {
    return <img src={src} className="App-logo" alt="logo" />;
  };

  return (
    <div className="App" style={{ backgroundColor: bgColor }}>
      <header className="App-header">
        {renderLogo(logo)}
        <p style={{ fontSize: fontSize }}>This is a demo with intentional code smells</p>
        {renderLogo(anotherLogo)} {/* Duplicate code: same image, rendered twice */}
        <button
          onClick={handleClick}
          style={{ borderRadius: borderRadius }}
        >
          Click me
        </button>
        <p>{text}</p>
        {loading && <p>Loading...</p>}
      </header>
    </div>
  );
}

export default App;
