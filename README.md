# Tasks

- :white_check_mark: Fetch data from the endpoint https://officeleague.rocks/app/api/graphql
- :white_check_mark: Parse response and convert it into Typescript data objects which will then be rendered by the app. 
- :white_check_mark: The endpoint returns JSON which contains leaguePlayers and leagueTeams arrays, which is what we are interested in.
- :white_check_mark: /leaguePlayers - to display a simple list of all league players. It should be possible to click a specific player and get to its details page.
- :white_check_mark: /leaguePlayers/{0} (where {0} is leaguePlayer.id) - to display details on specific league player.
- :white_check_mark: /leagueTeams - to display a specific league team. It should be possible to click a specific team and get to its details page.
- :white_check_mark: /leagueTeams/{0} - (where {0} is leagueTeam.id) - to display details on specific league team.
- :white_check_mark: Additional bonus for implementing a decent navigation to switch between the pages :)

# How to run

Considering that you have the enonic CLI installed locally, just clone the repo, enter the project folder, run ``enonic project deploy``. Finally run:

```
enonic sandbox start
```

and then access: http://localhost:8080/webapp/xp.webapp.officeleague/

# Preview
https://user-images.githubusercontent.com/67838246/137475039-6ba3e9ac-49b7-4a80-b264-02ca1b38e884.mov
