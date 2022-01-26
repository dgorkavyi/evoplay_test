import { doXTimes, getRandomInt } from "./helpers";

const POWER_MAX = 100;
const POWER_MIN = 10;
const GOAL_MAX = 6;

export class Team {
  static teamValue = 0;
  private goals: number;
  public goalHistory: number[];
  public power: number;
  public name: number;
  constructor() {
    this.name = Team.teamValue;
    this.power = getRandomInt(POWER_MAX, POWER_MIN);
    this.goals = 0;
    this.goalHistory = [];
    Team.teamValue += 1;
  }
  addGoals(goals: number): void {
    this.goalHistory.push(goals);
    this.goals += goals;
  }
  getGoals(): number {
    return this.goals;
  }
}

export class GameMatch {
  public winner: Team | null;
  public topPlaces: Team[];
  public teams: Team[];
  constructor(numberOfTeams: number) {
    if (numberOfTeams % 2 !== 0) {
      throw new Error("Invalid teams number should be even");
    }

    this.winner = null;
    this.topPlaces = [];
    this.teams = [];

    doXTimes(numberOfTeams, () => this.teams.push(new Team()));
  }

  private splitPairs(arr: Team[]): Array<Team[]> | any {
    if (arr.length === 2) return [arr];

    const result: Array<Team[]> = [];

    arr.forEach((el, i, arr) => {
      if (i++ % 2 === 0) result.push([arr[i], arr[i - 1]]);
    });

    return result;
  }

  private randomizeGoal(probability: number): boolean {
    const idx = Math.floor(Math.random() * 10);

    return idx <= probability ? true : false;
  }

  private getProbabilitie(first: Team, second: Team): number {
    return Math.floor(10 * (first.power / (first.power + second.power)));
  }

  public getMatchWinners(teams: Team[]): Team[] {
    if (teams.length === 1) return [];

    let pairs = this.splitPairs(teams);

    pairs = pairs.map((p: Team[]) => {
      const pairGoals = [0, 0];
      const firstProb = this.getProbabilitie(p[0], p[1]);
      const seconProb = this.getProbabilitie(p[1], p[0]);

      while (pairGoals[0] === pairGoals[1]) {
        doXTimes(GOAL_MAX, () => {
          if (this.randomizeGoal(firstProb)) pairGoals[0]++;
        });
        doXTimes(GOAL_MAX, () => {
          if (this.randomizeGoal(seconProb)) pairGoals[1]++;
        });
      }

      p[0].addGoals(pairGoals[0]);
      p[1].addGoals(pairGoals[1]);

      return pairGoals[0] > pairGoals[1] ? p[0] : p[1];
    });

    return pairs;
  }
  public play(teams: Team[] = this.teams): Array<Team[]> {
    let tournament: Array<Team[]> = [];
    let currMatch = teams;

    while (currMatch.length >= 1) {
      tournament.push(currMatch);
      currMatch = this.getMatchWinners(currMatch);
    }
    return tournament;
  }
}
