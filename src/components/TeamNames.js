import React, { useState } from 'react';
import './Scoreboard.css';

const TeamNames = ({ team1, team2, onTeamNameChange }) => {
  const [editingTeam, setEditingTeam] = useState(null);
  
  const handleTeamClick = (team) => {
    setEditingTeam(team);
  }

  const handleTeamNameChange = (event) => {
    onTeamNameChange(editingTeam, event.target.value);
  }

  const handleBlur = () => {
    setEditingTeam(null);
  }

  return (
    <div className="team-names">
      <div className="team-name">
        {editingTeam === 'team1' ? (
          <input type="text" value={team1} onChange={handleTeamNameChange} onBlur={handleBlur} />
        ) : (
          <h2 onClick={() => handleTeamClick('team1')}>{team1}</h2>
        )}
      </div>
      <div className="team-name">
        {editingTeam === 'team2' ? (
          <input type="text" value={team2} onChange={handleTeamNameChange} onBlur={handleBlur} />
        ) : (
          <h2 onClick={() => handleTeamClick('team2')}>{team2}</h2>
        )}
      </div>
    </div>
  );
}

export default TeamNames;
