import React, { useState, useEffect, useRef } from 'react';
import Timer from './Timer';
import ShotClock from './ShotClock';
import TeamNames from './TeamNames';
import buzzerSound from './buzzer-long.mp3';
import Score from './Score';
import Fouls from './Fouls';
import "./Scoreboard.css";

function Scoreboard() {
  
  const [team1Name, setTeam1Name] = useState('Home');
  const [team2Name, setTeam2Name] = useState('Away');
  const teamNames = { team1Name, team2Name };
  const [team1Score, setTeam1Score] = useState(0);
  const [team2Score, setTeam2Score] = useState(0);
  const [team1Fouls, setTeam1Fouls] = useState(0);
  const [team2Fouls, setTeam2Fouls] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [gameClockTime, setGameTime] = useState(600); // 10 minutes in seconds
  const [gameClockPaused, setGameClockPaused] = useState(true);
  const [shotClockTime, setShotClock] = useState(24); // 24 seconds
  const [shotClockPaused, setShotClockPaused] = useState(true);
  const audioRef = useRef(null);
  


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'q') {
        setTeam1Score((prevScore) => prevScore + 1);
      } else if (event.key === 'a') {
        setTeam1Score((prevScore) => prevScore - 1);
      } else if (event.key === 'w') {
        setTeam2Score((prevScore) => prevScore + 1);
      } else if (event.key === 's') {
        setTeam2Score((prevScore) => prevScore - 1);
      }

      else if (event.key === 'e') {
        setTeam1Fouls((prevFouls) => prevFouls + 1);
      } else if (event.key === 'd') {
        setTeam1Fouls((prevFouls) => prevFouls - 1);
      } else if (event.key === 'r') {
        setTeam2Fouls((prevFouls) => prevFouls + 1);
      } else if (event.key === 'f') {
        setTeam2Fouls((prevFouls) => prevFouls - 1);
      }

      else if (event.key === 'Shift') {
        audioRef.current.play();
        audioRef.current.currentTime = 0;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleReset = () => {
    setTeam1Score(0);
    setTeam2Score(0);
    setTeam1Fouls(0);
    setTeam2Fouls(0);
    setGameTime(600000);
    setShotClock(24000);
    setIsTimerRunning(false);
  };

  const handleStartStopTimer = () => {
    setIsTimerRunning((prevState) => !prevState);
  };

  const handleBuzzer = () => {
    const audio = new Audio('/buzzer-long.mp3');
    audio.play();
  };

  const handleTimeUp = () => {
    setGameClockPaused(true);
    setShotClockPaused(true);
    handleBuzzer();
  };

  const Button = () => {
    const [isPressed, setIsPressed] = useState(false);
  
    const handleClick = () => {
      setIsPressed((prev) => !prev);
    };
  
    return (
      <button
        className={isPressed ? "circle-button red" : "circle-button"}
        onClick={handleClick}
      ></button>
    );
  };

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-heading">
        {/* <TeamNames teamNames={teamNames} onTeamNameChange={handleTeamNameChange} /> */}
      </div>

      <div className="scoreboard-main">
        <div className="team-container-L">
          <Score
            teamName={"Home"}
            score={team1Score}
            fouls={team1Fouls}
          />
        </div>

        <div className="container-mid">
          <Timer />
          
          <div className="button-container">
            <Button />
            <Button />
            <Button />
            <Button /><br/>
            <b>PERIOD</b>
          </div>
          
          <ShotClock/>
        </div>


        <div className="team-container-R">
          <Score
            teamName={"Away"}
            score={team2Score}
            fouls={team2Fouls}
          />
        </div>
      </div>
      <div className="scoreboard__controls">
          <button onClick={handleReset}>Reset</button>
      </div>

        <audio ref={audioRef} src={buzzerSound} />
    </div>
  );

}

export default Scoreboard;