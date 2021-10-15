import { Service } from './service'

const thymeleaf = require('/lib/thymeleaf')
const router = require('/lib/router')()

const service = new Service()

router.get('/', function() {
    return  { body: thymeleaf.render(resolve('./views/welcome.html'), {}) }
});

router.get('/leaguePlayers', function() {
    return  { body: thymeleaf.render(resolve('./views/leaguePlayers.html'), {
        data: service.getLeaguePlayers()
    }) }
});

router.get('/leaguePlayer/{id}', function(req: any) {
    const id = req.pathParams.id

    return  { body: thymeleaf.render(resolve('./views/leaguePlayer.html'), {
        data: service.getLeaguePlayerById(id)
    }) }
});

router.get('/leagueTeams', function() {
    return  { body: thymeleaf.render(resolve('./views/leagueTeams.html'), {
        data: service.getLeagueTeams()
    }) }
});

router.get('/leagueTeam/{id}', function(req: any) {
    const id = req.pathParams.id

    return  { body: thymeleaf.render(resolve('./views/leagueTeam.html'), {
        data: service.getLeagueTeamById(id)
    }) }
});

exports.all = function(req: Request) {
    return router.dispatch(req)
};



