import React, { useState, useEffect, useRef } from "react";
import buzzerSound from './buzzer-long.mp3';
import Timer from './Timer';
import './timer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRedo } from "@fortawesome/free-solid-svg-icons";

function ShotClock() {
  const [time, setTime] = useState(24000); // 24s in milliseconds
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
      <Timer
      
      />
    }
    const handleKeyPress = (event) => {
      if (event.code === "Enter" && isRunning) {
        handlePause();
      }
      if (event.code === "Enter" && !isRunning) {
        handleStart();
      }
      if (event.code === "ArrowLeft" && !isRunning) {
        setTime(prevTime => prevTime - 100);
      }
      if (event.code === "ArrowRight" && !isRunning) {
        setTime(prevTime => prevTime + 100);
      }
      if (event.code === "PageUp") {
        setTime(24900);
        handleStart();
      }
      if (event.code === "PageDown") {
        setTime(14900);
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
    setTime(24500); // 24s in milliseconds
  }

  function formatTime(time) {
    //const minutes = Math.floor((time / (60 * 1000)) % 60).toString().padStart(2, '0');
    const seconds = Math.floor((time / 1000) % 60).toString().padStart(2, '0');
    //const milliseconds = Math.floor(time % 1000).toString().padStart(3, '0').slice(0,-2);

    return `${seconds}`;
  }

  return (

    <div className="timer-container">
      
      <h1>SHOT CLOCK</h1>
      <div className={`shotClock ${isExpired ? 'expired' : ''}`}>
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

        <button className="timer-button" onClick={handleReset}>
          <FontAwesomeIcon icon={faRedo} />
        </button>

      </div>
      <audio ref={audioRef} src={buzzerSound} />
    </div>
  );
}

export default ShotClock;
