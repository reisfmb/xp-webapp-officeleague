import { ILeague, ILeaguePlayer, IPlayer, IPlayerPlus, ILeagueTeam, ITeam, ITeamPlus, IPlayerStats, IPlayerStatsPlus } from './types'

const httpClient = require('/lib/http-client')

class Service {
    private API_URL = 'https://officeleague.rocks/app/api/graphql'

    private QUERY_STRING = `{
        league(name:\"Enonic Foos\") 
        { id name leaguePlayers 
            { id rating ranking player 
                { id name nationality stats 
                    { gameCount winningGameCount goalCount } 
                } 
            } leagueTeams { id rating ranking team 
                { id name stats 
                    { gameCount winningGameCount goalCount } 
                } 
            } 
        } 
    }`

    private REQUEST_BODY_JSON = { query: this.QUERY_STRING }

    private REQUEST_BODY = JSON.stringify(this.REQUEST_BODY_JSON)

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

    private calculateStatsPlus(stats: IPlayerStats): IPlayerStatsPlus {
        if(stats.gameCount === 0){
            return { ...stats, winningPercentage: '0.0', lossPercentage: '0.0', goalsPerGame: '0.0' } 
        }

        return {
            ...stats,
            winningPercentage: (100 * stats.winningGameCount / stats.gameCount).toFixed(1),
            lossPercentage: ((100 * (stats.gameCount - stats.winningGameCount)) / stats.gameCount).toFixed(1),
            goalsPerGame: (stats.goalCount / stats.gameCount).toFixed(1)
        }
    }

    ///

    public getLeaguePlayers(): ILeaguePlayer[]{
        return this.leagueData.leaguePlayers
    }

    public getLeaguePlayerById(playerId: string): IPlayerPlus {
    
        const leaguePlayers: ILeaguePlayer[] = this.getLeaguePlayers()

        const filteredPlayers = leaguePlayers.filter(leaguePlayer => (
            leaguePlayer.player.id === playerId
        ))

        if(filteredPlayers.length === 0) return {} as IPlayerPlus

        const player = filteredPlayers[0].player

        return { ...player, stats: { ...this.calculateStatsPlus(player.stats) } }

    }

    public getLeagueTeams(): ILeagueTeam[] {
        return this.leagueData.leagueTeams
    }

    public getLeagueTeamById(teamId: string): ITeamPlus {
    
        const leagueTeams: ILeagueTeam[] = this.getLeagueTeams()

        const filteredTeams = leagueTeams.filter(leagueTeam => (
            leagueTeam.team.id === teamId
        ))

        if(filteredTeams.length === 0) return {} as ITeamPlus
       
        const team = filteredTeams[0].team

        return { ...team, stats: { ...this.calculateStatsPlus(team.stats) } }
    }
}

export { Service }