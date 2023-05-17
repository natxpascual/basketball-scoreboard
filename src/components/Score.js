import React from 'react';
import "./Scoreboard.css";

function Score(props) {
  const { score, teamName, onScoreChange, onFoulsChange, fouls } = props;
  return (
    <div>
      <h3>Fouls </h3>
      <div className='foul-count'>
        {fouls}
      </div>

      <div className='team-name'>
        {teamName}
      </div>
      
      <div className='score-count'>
        {score}
      </div>
      {/* <audio ref={audioRef} src={buzzerSound} /> */}
    </div>
  );
}

export default Score;
