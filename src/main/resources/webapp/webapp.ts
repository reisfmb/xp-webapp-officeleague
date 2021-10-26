const thymeleaf = require('/lib/thymeleaf')
const router = require('/lib/router')()

import { ServiceEnonicFoosLeague } from "./serviceEnonicFoosLeague";

const serviceEnonicFoosLeague = new ServiceEnonicFoosLeague()
const errorMessage = serviceEnonicFoosLeague.ERROR_MESSAGE
const model = { errorMessage, data: {} }

router.get('/', function() {
    return  { body: thymeleaf.render(resolve('./views/welcome.html'), model) }
});

router.get('/leaguePlayers', function() {
    model.data = serviceEnonicFoosLeague.getLeaguePlayers()
    return  { body: thymeleaf.render(resolve('./views/leaguePlayers.html'), model) }
});

router.get('/leaguePlayer/{id}', function(req: any) {
    const id = req.pathParams.id
    model.data = serviceEnonicFoosLeague.getLeaguePlayerById(id)
    return  { body: thymeleaf.render(resolve('./views/leaguePlayer.html'), model) }
});

router.get('/leagueTeams', function() {
    model.data = serviceEnonicFoosLeague.getLeagueTeams()
    return  { body: thymeleaf.render(resolve('./views/leagueTeams.html'), model) }
});

router.get('/leagueTeam/{id}', function(req: any) {
    const id = req.pathParams.id
    model.data = serviceEnonicFoosLeague.getLeagueTeamById(id)
    return  { body: thymeleaf.render(resolve('./views/leagueTeam.html'), model) }
});

exports.all = function(req: Request) {
    return router.dispatch(req)
};



