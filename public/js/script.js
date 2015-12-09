var host = '';
var sendRoute = host + '/send';
var messagesRoute = host + '/messages';

function sendMessage (user, content, callback) {
  $.post(sendRoute, {user: user, content: content})
  .fail(function(data) {
    alert(data.responseText);
  })
  .done(callback);
}

function getMessages (callback) {
  $.get(messagesRoute)
  .done(callback);
}


$('#submit-message').submit(function (e) {
  e.preventDefault();

  var username = $('#submit-user').val();
  var content = $('#submit-content').val();

  sendMessage(username, content);
});

var giphyCache = {};
function giphySearch(term) {
  if (giphyCache[term]) {
    return giphyCache[term];
  }
  var img = '';
  var giphyApiUrl = 'https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=';
  $.ajax({
    url: giphyApiUrl + term,
    dataType: 'json',
    async: false,
    success: function(data) {
      img = data['data'][0]['images']['fixed_width']['url'];
    }
  });
  giphyCache[term] = img;
  return img;
}

function formatMessage(message) {
  var tokens = message.content.split(' ');
  // check commands
  var validCommands = ['/giphy'];
  if (validCommands.indexOf(tokens[0]) >= 0) {
    tokens[0] = giphySearch(tokens[1]);
  }

  // check for img url
  var validExtensions = ['.gif', '.png', '.jpg'];
  for (var i = 0; i < tokens.length; i++) {
    var beginning = tokens[i].substr(0, 4);
    var extension = tokens[i].substr(-4);
    if (beginning === 'http' && (validExtensions.indexOf(extension) >= 0)) {
      // replace token with <img> tag
      var imgStr = '<img src="' + tokens[i] + '">';
      tokens[i] = imgStr;
    }
  }
  // join the tokens back together
  message.content = tokens.join(' ');

  var timeString = new Date(message.timestamp).toLocaleTimeString();
  return '<li><div class="avatar"></div><span class="timestamp">' + timeString + '</span> ' + '<span class="username">' + message.user + '</span>' + ': ' + message.content + '</li>';
}

/* use setInterval to periodically get new messages and update the list */
function updateMessages() {
  var getMessagesCallback = function (messages) {
    // empty message log
    $('.messages').empty();

    for (var i = 0; i < messages.length; i++) {
      var message = messages[i];
      $('.messages').append(formatMessage(message));
    }
  };

  getMessages(getMessagesCallback);
}
window.setInterval(updateMessages, 500);
