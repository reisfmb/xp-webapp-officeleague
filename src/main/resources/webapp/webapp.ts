const thymeleaf = require('/lib/thymeleaf')
const router = require('/lib/router')()

import { ServiceEnonicFoosLeague } from "./serviceEnonicFoosLeague";

const serviceEnonicFoosLeague = new ServiceEnonicFoosLeague()

router.get('/', function() {
    return  { body: thymeleaf.render(resolve('./views/welcome.html'), {}) }
});

router.get('/leaguePlayers', function() {
    return  { body: thymeleaf.render(resolve('./views/leaguePlayers.html'), {
        data: serviceEnonicFoosLeague.getLeaguePlayers()
    }) }
});

router.get('/leaguePlayer/{id}', function(req: any) {
    const id = req.pathParams.id

    return  { body: thymeleaf.render(resolve('./views/leaguePlayer.html'), {
        data: serviceEnonicFoosLeague.getLeaguePlayerById(id)
    }) }
});

router.get('/leagueTeams', function() {
    return  { body: thymeleaf.render(resolve('./views/leagueTeams.html'), {
        data: serviceEnonicFoosLeague.getLeagueTeams()
    }) }
});

router.get('/leagueTeam/{id}', function(req: any) {
    const id = req.pathParams.id

    return  { body: thymeleaf.render(resolve('./views/leagueTeam.html'), {
        data: serviceEnonicFoosLeague.getLeagueTeamById(id)
    }) }
});

exports.all = function(req: Request) {
    return router.dispatch(req)
};



