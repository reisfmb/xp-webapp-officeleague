interface IPlayerStats {
    gameCount: number;
    winningGameCount: number;
    goalCount: number;  
}

interface IPlayerStatsPlus extends IPlayerStats {
    winningPercentage: string;
    lossPercentage: string;
    goalsPerGame: string;  
}

interface IPlayer {
    id: string;
    name: string;
    nationality: string;
    stats: IPlayerStats
}

interface IPlayerPlus extends Omit<IPlayer, 'stats'> {
    stats: IPlayerStatsPlus
}

type ITeam = Omit<IPlayer, 'nationality'>

type ITeamPlus = Omit<IPlayerPlus, 'nationality'>

interface ILeaguePlayer {
    id: string;
    rating: number;
    ranking: number;
    player: IPlayer
}

interface ILeagueTeam {
    id: string;
    rating: number;
    ranking: number;
    team: ITeam
}

interface ILeague {
    id: string;
    name: string;
    leaguePlayers: ILeaguePlayer[],
    leagueTeams: ILeagueTeam[]
}

export {
    IPlayer,
    IPlayerStats,
    IPlayerStatsPlus,
    IPlayerPlus,
    ITeam,
    ITeamPlus,
    ILeaguePlayer,
    ILeagueTeam,
    ILeague
}