import { IStats } from './interfaces'

export class Stats {
    
    private gameCount = 0
    private winningGameCount = 0
    private goalCount = 0

    constructor(stats: IStats){

        this.gameCount = stats.gameCount
        this.winningGameCount = stats.winningGameCount
        this.goalCount = stats.goalCount
    }

    public getWinningPercentage():string{
        return this.gameCount > 0
            ? (100 * this.winningGameCount / this.gameCount).toFixed(1)
            : '0.0'
    }

    public getLossPercentage():string{
        return this.gameCount > 0
            ? ((100 * (this.gameCount - this.winningGameCount)) / this.gameCount).toFixed(1)
            : '0.0'
    }

    public getGoalsPerGame():string{
        return this.gameCount > 0
            ? (this.goalCount / this.gameCount).toFixed(1)
            : '0.0'
    }
}