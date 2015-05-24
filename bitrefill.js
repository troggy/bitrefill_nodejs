var assert = require('assert')
var request = require('request')
var querystring = require("querystring");

module.exports = Bitrefill

function Bitrefill(cfg) {
  if (!(this instanceof Bitrefill))
    return new Bitrefill(cfg)

  this.cfg = cfg

  assert(this.cfg, 'cfg is required')
  assert(this.cfg.key, 'cfg.key is required')
  assert(this.cfg.secret, 'cfg.secret is required')
  assert(this.cfg.url, 'cfg.url is required')
  this.authurl = "https://" + this.cfg.key + ":" + this.cfg.secret + "@" + this.cfg.url;
}

Bitrefill.prototype.inventory = function(cb) {
  request.get({url: this.authurl + "/inventory/",
    headers: {
      'Content-Type': 'application/json',
    }
  }, function (error, response, body) {
    if (error != undefined) {
      cb(error, undefined);
    } else if (response.statusCode != 200) {
      cb("HTTP error: " + response.statusCode + " body: " + body, undefined)
    } else {
      inventory = JSON.parse(body);
      if (inventory.hasOwnProperty('error')) {
        cb(inventory['error'], undefined)
      } else {
        cb(undefined, inventory);
      }
    }
  });
};

Bitrefill.prototype.lookup_number = function(number, operator, cb) {
  var args = {'number': number};
  if (operator != undefined) {
    args['operatorSlug'] = operator;
  }
  var qs = querystring.stringify(args);
  request.get({url: this.authurl + "/lookup_number/?" + qs,
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    if (error != undefined) {
      cb(error, undefined);
    } else if (response.statusCode != 200) {
      cb("HTTP error: " + response.statusCode + " body: " + body, undefined)
    } else {
      quote = JSON.parse(body);
      if (quote.hasOwnProperty('error')) {
        cb(quote['error'], undefined)
      } else {
        cb(undefined, quote);
      }
    }
  });
};

Bitrefill.prototype.place_order = function(number, operator, pack, email, cb) {
  var args = {'number': number, 'valuePackage': pack,
              'operatorSlug': operator, 'email': email}
  var url = this.authurl + "/order";
  request.post({url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(args)
  }, function (error, response, body) {
    if (error != undefined) {
      cb(error, undefined);
    } else if (response.statusCode != 200) {
      cb("HTTP error: " + response.statusCode + " body: " + body, undefined)
    } else {
      quote = JSON.parse(body);
      if (quote.hasOwnProperty('error')) {
        cb(quote['error'], undefined)
      } else {
        cb(undefined, quote);
      }
    }
  });
};

Bitrefill.prototype.order_status = function(order_id, cb) {
  var url = this.authurl + "/order/" + order_id;
  request.get({url: url,
    headers: {
      'Content-Type': 'application/json'
    }
  }, function (error, response, body) {
    if (error != undefined) {
      cb(error, undefined);
    } else if (response.statusCode != 200) {
      cb("HTTP error: " + response.statusCode + " body: " + body, undefined)
    } else {
      quote = JSON.parse(body);
      if (quote.hasOwnProperty('error')) {
        cb(quote['error'], undefined)
      } else if (quote.hasOwnProperty('errorMessage')) {
        cb(quote['errorMessage'], undefined)
      } else {
        cb(undefined, quote);
      }
    }
  });
};