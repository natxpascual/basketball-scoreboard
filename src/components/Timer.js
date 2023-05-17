import React, { useState, useEffect, useRef } from 'react';
import buzzerSound from './buzzer-long.mp3';
import './timer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";

function Timer() {
  const [time, setTime] = useState(600000); // 10 minutes in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let intervalId = null;

    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime - 100);
      }, 100);
    } else if (time === 0) {
      setIsRunning(false);
      setIsExpired(true);
      audioRef.current.play();
    }
    
    const handleKeyPress = (event) => {
      if (event.code === "Space" && isRunning) {
        handlePause();
      }
      if (event.code === "Space" && !isRunning) {
        handleStart();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      clearInterval(intervalId);
      document.removeEventListener("keydown", handleKeyPress);
    };

  }, [isRunning, time]);

  function handleStart() {
    setIsRunning(true);
  }

  function handlePause() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setIsExpired(false);
    setTime(600000); // 10 minutes in milliseconds
    audioRef.current.play();
    audioRef.current.currentTime = 0;
  }

  function formatTime(time) {
    const minutes = Math.floor((time / (60 * 1000)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    const milliseconds = Math.floor(time % 1000).toString().padStart(3, '0').slice(0,-2);

    return `${minutes}:${seconds}.${milliseconds}`;
  }

  return (
    <div className="timer-container">
      <div className={`timer ${isExpired ? 'expired' : ''}`}>
        {formatTime(time)}
      </div>
      <div className="timer-controls">
        {!isRunning ? (
          <button className="timer-button" onClick={handleStart} disabled={isRunning}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        ) : (
          <button className="timer-button" onClick={handlePause} disabled={!isRunning}>
            <FontAwesomeIcon icon={faPause} />
          </button>
        )}
        <button className="timer-button" onClick={handleReset} disabled={isRunning}>
          <FontAwesomeIcon icon={faRedo} />
        </button>
      </div>
      <audio ref={audioRef} src={buzzerSound} />


    </div>
  );
}

export default Timer;
