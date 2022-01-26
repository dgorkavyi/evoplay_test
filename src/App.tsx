import React, { FC } from "react";
import "./App.css";
import { GameMatch, Team } from "./entities";

interface TeamBoxProps {
  team: Team;
  index: number;
  historyIndex: number;
}
const TeamBox: FC<TeamBoxProps> = ({ team, index, historyIndex }) => (
  <div className={index % 2 !== 0 ? "team_box" : "team_box left_box"}>
    <div className="team__name">Team #{team.name}</div>
    <div className="team_goals_now">{team.goalHistory[historyIndex]}</div>
  </div>
);
interface MatchProps {
  teams: Team[];
  historyIndex: number;
}
const MatchBox: FC<MatchProps> = ({ teams, historyIndex }) => (
  <div className="match_box">
    {teams.map((elem, index) => (
      <TeamBox
        team={elem}
        index={index}
        key={`teamBox${index}`}
        historyIndex={historyIndex}
      />
    ))}
  </div>
);

interface BestThreeProps {
  teams: Team[];
}
const BestThree: FC<BestThreeProps> = ({ teams }) => {
  return (
    <div className="best_three">
      {teams.map((elem, index) => (
        <div className="best_one" key={`best_one_${index}`}>
          <div className="team__name">Team #{elem.name}</div>
          <div className="team_goals_now">{elem.getGoals()}</div>
        </div>
      ))}
    </div>
  );
};

interface TournamentProps {
  tournament: Array<Team[]>;
}
const Tournament: FC<TournamentProps> = ({ tournament }) => (
  <div className="tournament">
    {tournament.map((elem, index) => (
      <MatchBox teams={elem} key={`matchBox${index}`} historyIndex={index} />
    ))}
  </div>
);
function App() {
  const teamsNumber = 16;
  const game = new GameMatch(teamsNumber);
  const tournament = game.play();
  const bestThree = [...game.teams]
    .sort((a, b) => a.getGoals() - b.getGoals())
    .reverse()
    .slice(0, 3);

  return (
    <div className="App">
      <h1>Tournament:</h1>
      <Tournament tournament={tournament} />
      <h2>Best three winners:</h2>
      <BestThree teams={bestThree} />
    </div>
  );
}

export default App;
