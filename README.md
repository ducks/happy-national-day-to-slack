## Description

A script that scrapes http://www.nationaldaycalendar.com/latest-posts/
and posts the "National day of" days to a slack channel.

Add a config.js file with the following vars:
 
    slackChannel
    slackToken  

You can find those by going to this page: 
    
    https://api.slack.com/methods/channels.list/test

and testing the method with your team. You will get a url and a 
test response with a list of channels. There you can find the slack
channel id. The url will contain the token.


## Running Daily
I use a cronjob to run this every morning but I'm sure that's
not the only method.
