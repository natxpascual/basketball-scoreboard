import React, { useState } from 'react';

function Buzzer() {
  const [isBuzzerActive, setIsBuzzerActive] = useState(false);

  function handleBuzzer() {
    setIsBuzzerActive(!isBuzzerActive);
  }

  return (
    <div>
      <h2>Buzzer</h2>
      <button onClick={handleBuzzer}>{isBuzzerActive ? 'Deactivate' : 'Activate'}</button>
    </div>
  );
}

export default Buzzer;
