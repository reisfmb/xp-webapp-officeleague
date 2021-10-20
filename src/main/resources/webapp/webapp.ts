const thymeleaf = require('/lib/thymeleaf')
const router = require('/lib/router')()

import { EnonicFoosService } from "./enonicFoosService";

const enonicFoosService = new EnonicFoosService()

router.get('/', function() {
    return  { body: thymeleaf.render(resolve('./views/welcome.html'), {}) }
});

router.get('/leaguePlayers', function() {
    return  { body: thymeleaf.render(resolve('./views/leaguePlayers.html'), {
        data: enonicFoosService.getLeaguePlayers()
    }) }
});

router.get('/leaguePlayer/{id}', function(req: any) {
    const id = req.pathParams.id

    return  { body: thymeleaf.render(resolve('./views/leaguePlayer.html'), {
        data: enonicFoosService.getLeaguePlayerById(id)
    }) }
});

router.get('/leagueTeams', function() {
    return  { body: thymeleaf.render(resolve('./views/leagueTeams.html'), {
        data: enonicFoosService.getLeagueTeams()
    }) }
});

router.get('/leagueTeam/{id}', function(req: any) {
    const id = req.pathParams.id

    return  { body: thymeleaf.render(resolve('./views/leagueTeam.html'), {
        data: enonicFoosService.getLeagueTeamById(id)
    }) }
});

exports.all = function(req: Request) {
    return router.dispatch(req)
};



