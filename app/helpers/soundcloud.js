'use strict';

(function () {

  var SoundCloud = require ('soundcloud-node');
  var client_id = process.env.SOUNDCLOUD_ID;
  var client_secret = process.env.SOUNDCLOUD_SECRET;
  var redirect_uri = 'http://mixtape93.herokuapp.com'
    + process.env.SOUNDCLOUD_OAUTH_REDIRECT_PATH;

  // Instantiate client.
  var client = new SoundCloud(client_id, client_secret, redirect_uri);

  module.exports = {
    // Connect user.
    oauthInit: function oauthInit (req, res) {
      var url = client.getConnectUrl();

      res.writeHead(301, Location: url);
      res.end();
    },

    // Get OAuth Token
    // callback function from the connect url
    oauthHandleToken: function oauthHandleToken (req, res) {
      var query = req.query;

      client.getToken(query.code, function(err, tokens) {
        if (err)
          callback(err);
        else {
          callback(null, tokens);
        }
      });
    }
  };
}());