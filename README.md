# Tasks

:white_check_mark: Fetch data from the endpoint https://officeleague.rocks/app/api/graphql 

**Done**.

:white_check_mark: Parse response and convert it into Typescript data objects which will then be rendered by the app 

**Done and also had the opportunity to use the "Omit" utility type when defining one of the interfaces!**.

:white_check_mark: The endpoint returns JSON which contains leaguePlayers and leagueTeams arrays, which is what we are interested in. 

**Ok**.

:white_check_mark: /leaguePlayers - to display a simple list of all league players. It should be possible to click a specific player and get to its details page 

**Done**.

:white_check_mark: /leaguePlayers/{0} (where {0} is leaguePlayer.id) - to display details on specific league player 

**Done**.

:white_check_mark: /leagueTeams - to display a specific league team. It should be possible to click a specific team and get to its details page 

**Done**.

:white_check_mark: /leagueTeams/{0} - (where {0} is leagueTeam.id) - to display details on specific league team 

**Done**.

:white_check_mark: Additional bonus for implementing a decent navigation to switch between the pages :) 

**Implemented the navigation and just a basic css with boostrap**.

# How to run

Considering that you have the enonic CLI installed locally, just clone the repo, enter the project folder, run ``enonic project deploy``. Finally run:

```
enonic sandbox start
```

and then access: http://localhost:8080/webapp/xp.webapp.officeleague/

# Preview

https://user-images.githubusercontent.com/67838246/137557684-d577e6c8-d5a5-4509-971b-5a4b3648eff2.mp4
