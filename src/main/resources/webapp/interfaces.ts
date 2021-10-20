export interface IStats {
    gameCount: number;
    winningGameCount: number;
    goalCount: number;  
}

export interface IStatsPlus extends IStats {
    winningPercentage: string;
    lossPercentage: string;
    goalsPerGame: string;  
}

export interface IPlayer {
    id: string;
    name: string;
    nationality: string;
    stats: IStats
}

export interface IPlayerPlus extends Omit<IPlayer, 'stats'> {
    stats: IStatsPlus
}

export type ITeam = Omit<IPlayer, 'nationality'>

export type ITeamPlus = Omit<IPlayerPlus, 'nationality'>

export interface ILeaguePlayer {
    id: string;
    rating: number;
    ranking: number;
    player: IPlayer
}

export interface ILeagueTeam {
    id: string;
    rating: number;
    ranking: number;
    team: ITeam
}

export interface ILeague {
    id: string;
    name: string;
    leaguePlayers: ILeaguePlayer[],
    leagueTeams: ILeagueTeam[]
}