interface IPlayer {
    id: string;
    name: string;
    nationality: string;
    stats: {
        gameCount: number;
        winningGameCount: number;
        goalCount: number;
    }
}

type ITeam = Omit<IPlayer, 'nationality'>

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
    ITeam,
    ILeaguePlayer,
    ILeagueTeam,
    ILeague
}