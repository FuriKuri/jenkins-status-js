var http = require('http');

function status(options, path, cb) {
  var internOptions = {
    host: options.host,
    port: options.port,
    path: path,
    auth: options.auth
  };
  var callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      cb(str);
    });
  }

  var req = http.request(internOptions, callback);
  req.end();
}

module.exports.all = function(options, cb) {
  status(options, '/api/json', cb);
}

module.exports.view = function(options, cb) {
  status(options, '/view/' + options.name + '/api/json', cb);
};

module.exports.build = function(options, cb) {
  status(options, '/job/' + options.name + '/api/json', cb);
};