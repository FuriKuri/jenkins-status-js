var http = require('http');

var options = {
    host: 'localhost',
    port: 8080,
    path: '/api/json',
    auth: '' + ':' + ''
};

callback = function(response) {
  var str = ''
  response.on('data', function (chunk) {
    str += chunk;
  });

  response.on('end', function () {
    console.log(str);
  });
}

var req = http.request(options, callback);
req.end();