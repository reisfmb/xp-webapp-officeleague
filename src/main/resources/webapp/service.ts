import { ILeague, ILeaguePlayer, IPlayer, ILeagueTeam, ITeam } from './types'

const httpClient = require('/lib/http-client')

class Service {
    private API_URL = 'https://officeleague.rocks/app/api/graphql'

    private REQUEST_BODY = JSON.stringify({"query":"{league(name:\"Enonic Foos\") {id name leaguePlayers { id rating ranking player { id name nationality stats { gameCount winningGameCount goalCount } } } leagueTeams { id rating ranking team { id name stats { gameCount winningGameCount goalCount } } } } }"})

    private leagueData = {} as ILeague

    constructor(){
        const response = httpClient.request({
            url: this.API_URL,
            method: 'POST',
            body: this.REQUEST_BODY,
            contentType: 'application/json'
        });
    
        const responseBody = JSON.parse(response.body) || {}
        
        const league: ILeague = ((responseBody.data || {}).league || {} as ILeague) 
    
        this.leagueData = league
    }

    public getLeaguePlayers(): ILeaguePlayer[]{
        return this.leagueData.leaguePlayers
    }

    public getLeaguePlayerById(playerId: string): IPlayer {
    
        const leaguePlayers: ILeaguePlayer[] = this.getLeaguePlayers()

        const filteredPlayers = leaguePlayers.filter(leaguePlayer => (
            leaguePlayer.player.id === playerId
        ))

        if(filteredPlayers.length === 0) return {} as IPlayer

        return filteredPlayers[0].player
    }

    public getLeagueTeams(): ILeagueTeam[] {
        return this.leagueData.leagueTeams
    }

    public getLeagueTeamById(teamId: string): ITeam {
    
        const leagueTeams: ILeagueTeam[] = this.getLeagueTeams()

        const filteredTeams = leagueTeams.filter(leagueTeam => (
            leagueTeam.team.id === teamId
        ))

        if(filteredTeams.length === 0) return {} as ITeam

        return filteredTeams[0].team
    }
}

export { Service }