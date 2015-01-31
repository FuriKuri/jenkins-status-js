var http = require('http');

var colorToStatus = {
  notbuilt: 'notbuilt',
  blue: 'success',
  green: 'success',
  yellow: 'warning',
  red: 'error'
}

function status(options, path, cb) {
  var internOptions = {
    host: options.host,
    port: options.port,
    path: path,
    auth: options.user + ':' + options.token
  };
  var callback = function(response) {
    var str = '';
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      cb(str);
    });
  }

  http.request(internOptions, callback).end();
}

module.exports.all = function(options, cb) {
  status(options, '/api/json', function(result) {
    var overview = JSON.parse(result);
    var jobs = [];
    overview.jobs.forEach(function(job) {
      jobs.push({
        name: job.name,
        status: colorToStatus[job.color]
      });
    });
    cb(jobs);
  });
}

module.exports.view = function(options, cb) {
  status(options, '/view/' + options.name + '/api/json', function(result) {
    var view = JSON.parse(result);
    var jobs = [];
    view.jobs.forEach(function(job) {
      jobs.push({
        name: job.name,
        status: colorToStatus[job.color]
      });
    });
    cb(jobs);
  });
};

module.exports.build = function(options, cb) {
  status(options, '/job/' + options.name + '/api/json', function(result) {
    var job = JSON.parse(result);
    cb({
      name: job.name,
      status: colorToStatus[job.color]
    });
  });
};