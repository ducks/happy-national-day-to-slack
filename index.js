var config = require('./config'),
    request = require('request'),
    $ = require('cheerio'),
    slackbot = require('slackbot');

var slackUrl = 'https://slack.com/api/',
    setTopic = 'channels.setTopic',
    slackChannel = config.slackChannel,
    slackToken = config.slackToken,
    nationalUrl = 'http://nationaldaycalendar.com/latest-posts/',
    slackPostUrl = slackUrl + setTopic + slackToken + '&' + slackChannel;

request(nationalUrl, function(err, res, body) {
  if (!err && res.statusCode == 200) {
    var today = $('.post', body).first();
    var days = $('h2.entry-title a', today).text().split(' – ');
    days.shift();

    var _days = arrayToSentence(days); 

    var message = 'HAPPY ' + _days + '!';

    request(slackPostUrl + '&topic=' + message, 
      function(error, response, body) {
      if (error) {
        console.log(error);
      }
    });
  }
});

function arrayToSentence(arr) {
  var last = arr.pop();

  if (arr.length > 0) {
    return arr.join(', ') + ', and ' + last;
  } else {
    return last;
  }
}
