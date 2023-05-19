import React, { useState, useEffect, useRef } from 'react';
import Scoreboard from "./components/Scoreboard";
import "./App.css";

function App() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        toggleTooltip();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTooltip = () => {
    setShowTooltip((prevShowTooltip) => !prevShowTooltip);
  };





  return (
    <div className="App">
      <Scoreboard />
    </div>
  );
}

export default App;
