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
  this.authstring = "Basic " + new Buffer(this.cfg.key + ":" + this.cfg.secret).toString("base64");
}

Bitrefill.prototype.inventory = function(cb) {
  request.get({url: "https://" + this.cfg.url + "inventory/",
    headers: {
      Authorization: this.authstring
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
  request.get({url: "https://" + this.cfg.url + "lookup_number/?" + qs,
    headers: {
      Authorization: this.authstring
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
  var args = {'number': number, 'package': pack,
              'operatorSlug': operator, 'email': email}
  // var qs = querystring.stringify(args)
  var url = "https://" + this.cfg.url + "/order/order_id/";
  request.post({url: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.authstring
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
  var url = "https://" + this.cfg.url + "/order/" + order_id;
  request.post({url: url,
    headers: {
      'Content-Type': 'application/json',
      Authorization: this.authstring
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