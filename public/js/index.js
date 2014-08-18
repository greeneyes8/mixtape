// Bind click to connect-soundcloud.

function init () {
  var button = document.getElementById('connect-soundcloud');
  button.onclick = function (e) {
    // initialize client with app credentials
    SC.connect(function() {

      // SC.get('/me', function(me) {
      //   alert('Hello, ' + me.username);
      // });
    });
  };
}

SC.initialize({
  client_id: '0482da9ad987e87ba383f481c357f403',
  redirect_uri: 'http://mixtape93.herokuapp.com/api/oauth'
});