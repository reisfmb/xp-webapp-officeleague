import { ILeague, ILeaguePlayer, IPlayerPlus, ILeagueTeam, ITeamPlus, IStats, IStatsPlus } from './interfaces'
import { Stats } from './stats'
const httpClient = require('/lib/http-client')

/**
 * Get the data of "Enonic Foos" in the officeLeague API
 * and provide some getters related to that data.
 */
class ServiceEnonicFoosLeague {
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

    private REQUEST_BODY = JSON.stringify({ query: this.QUERY_STRING })

    public ERROR_MESSAGE = '' 

    private leagueData = {} as ILeague

    constructor(){
        const response = httpClient.request({
            method: 'POST',
            url: this.API_URL,
            body: this.REQUEST_BODY,
            contentType: 'application/json'
        });

        const responseBody = JSON.parse(response.body) || {}

        if(response.status !== 200){
            this.ERROR_MESSAGE = responseBody.message
        }
        
        this.leagueData = ((responseBody.data || {}).league || {} as ILeague)
    }

    /**
     * Calculate some additional statistics based on the default statistics: gameCount, winningGameCount and goalCount.
     * 
     * The additional ones are: winningPercentage, lossPercentage and goalsPerGame.
     */
    private calculateStatsPlus(stats: IStats): IStatsPlus {

        const statsInstance = new Stats(stats)

        return {
            ...stats,
            winningPercentage: statsInstance.getWinningPercentage(),
            lossPercentage: statsInstance.getLossPercentage(),
            goalsPerGame: statsInstance.getGoalsPerGame()
        }
    }

    ///

    /**
     * Get all the Enonic Foos league players.
     */
    public getLeaguePlayers(): ILeaguePlayer[]{
        return this.leagueData.leaguePlayers
    }

    /**
     * Get, by id, a specific Enonic foos league player with some additional statistics.
     */
    public getLeaguePlayerById(playerId: string): IPlayerPlus {
    
        const leaguePlayers: ILeaguePlayer[] = this.getLeaguePlayers()

        const filteredPlayers = leaguePlayers.filter(leaguePlayer => (
            leaguePlayer.player.id === playerId
        ))

        if(filteredPlayers.length === 0) return {} as IPlayerPlus

        const player = filteredPlayers[0].player

        return { ...player, stats: { ...this.calculateStatsPlus(player.stats) } }

    }

    /**
     * Get all the Enonic Foos league teams.
     */
    public getLeagueTeams(): ILeagueTeam[] {
        return this.leagueData.leagueTeams
    }

    /**
     * Get, by id, a specific Enonic foos league team with some additional statistics.
     */
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

export { ServiceEnonicFoosLeague }