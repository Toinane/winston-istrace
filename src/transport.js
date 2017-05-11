'use strict';

var util = require('util');
var Transport = require('winston').Transport;
var request = require('request');

function IsTraceLogger (options) {
  this.name             = 'isTraceLogger';
  this.payload          = {};
  this.options          = options               || {};
  this.host             = this.options.host     || 'localhost';
  this.payload.service  = this.options.service  || null;
  this.payload.message  = this.options.message  || null;
  this.payload.action   = this.options.action   || null;
  this.payload.scope    = this.options.scope    || null;
  this.payload.details  = this.options.details  || null;

  Transport.call(this, options);

  this.level = this.options.level ||'info';
}

util.inherits(IsTraceLogger, Transport);

IsTraceLogger.prototype.log = function (level, msg, meta, callback) {
  var params = ['service', 'code', 'action', 'scope', 'details'];
  var options = {
    url: this.host,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    json: {}
  };

  for (var param of Object.keys(this.payload)) {
    if (this.payload[param]) {
      options.json[param] = this.payload[param];
    }
  }

  for (var param of params) {
    if (typeof meta === Object){
      if (meta[param]){
        options.json[param] = meta[param];
      }
    }
  }

  if (!options.json.code) {
    switch (level) {
      case 'error': options.json.code = 520; break;
      case 'warn': options.json.code = 202; break;
      default: options.json.code = 200;
    }
  }

  options.json.message = msg;

  request(options, function (err, res, body) {
    if (body && (body.code === 200)) {
      callback(null, true);
    } else {
      callback(body, null);
    }
  });
}

module.exports = IsTraceLogger;
