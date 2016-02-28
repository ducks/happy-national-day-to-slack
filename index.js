var config = require('./config');
var request = require('request');
var $ = require('cheerio');
var slackbot = require('slackbot');

var slackUrl = config.slackUrl;
var setTopic = config.setTopic;
var slackChannel = config.slackChannel;
var slackToken = config.slackToken;
var nationalUrl = 'http://nationaldaycalendar.com/latest-posts/';

request(nationalUrl, function(err, res, body) {
  if (!err && res.statusCode == 200) {
    var today = $('.post', body).first();
    var days = $('h2.entry-title a', today).text().split(' – ');
    days.shift();

    var _days = arrayToSentence(days); 

    var message = 'HAPPY ' + _days + '!';

    request(slackUrl + setTopic + slackToken + '&' + slackChannel + '&topic=' + message, function(error, response, body) {
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
