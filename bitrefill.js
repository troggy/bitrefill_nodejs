var fs = require('fs')
var path = require('path')
var request = require('request')
var querystring = require("querystring");
var cfg = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'cfg.json')).toString());

var apiKey = cfg.bitrefill.key;
var apiSecret = cfg.bitrefill.secret;
var base_url = cfg.bitrefill.url;

exports.inventory = function(cb) {
  request.get({url: "https://" + base_url + "inventory/",
    'headers': {
      "Authorization": "Basic " + new Buffer(apiKey + ":" + apiSecret).toString("base64")
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

exports.lookup_number = function(number, operator, cb) {
  var args = {'number': number};
  if (operator != undefined) {
    args['operatorSlug'] = operator;
  }
  var qs = querystring.stringify(args);
  request.get({url: "https://" + base_url + "lookup_number/?" + qs,
    'headers': {
      "Authorization": "Basic " + new Buffer(apiKey + ":" + apiSecret).toString("base64")
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

exports.place_order = function(number, operator, pack, email, cb) {
  var args = {'number': number, 'package': pack,
              'operatorSlug': operator, 'email': email}
  var qs = querystring.stringify(args)
  var url = "https://" + base_url + "/order/order_id"
  request.post({url: url,
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Basic " + new Buffer(apiKey + ":" + apiSecret).toString("base64")
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
  });//.form(args);
};
