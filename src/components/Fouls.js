import React, { useState } from 'react';

function Fouls() {
  const [team1Fouls, setTeam1Fouls] = useState(0);
  const [team2Fouls, setTeam2Fouls] = useState(0);

  function handleTeam1FoulsChange(event) {
    setTeam1Fouls(parseInt(event.target.value));
  }

  function handleTeam2FoulsChange(event) {
    setTeam2Fouls(parseInt(event.target.value));
  }

  return (
    <div>
      <h2>Fouls</h2>
      <div>
        <label htmlFor="team1-fouls">Team 1:</label>
        <input type="number" id="team1-fouls" value={team1Fouls} onChange={handleTeam1FoulsChange} />
      </div>
      <div>
        <label htmlFor="team2-fouls">Team 2:</label>
        <input type="number" id="team2-fouls" value={team2Fouls} onChange={handleTeam2FoulsChange} />
      </div>
    </div>
  );
}

export default Fouls;
