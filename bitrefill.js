var assert = require('assert')
var request = require('request')

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

var handleResponse = function(cb) {
  return function(error, response, body) {
    if (error) {
      return cb(error);
    } else if (response.statusCode != 200) {
      var bodyJSON;
      try {
        bodyJSON = JSON.parse(body);
      } catch (e) { }
      return cb(bodyJSON || response.statusText);
    } else {
      body = typeof body == 'object' ? body : JSON.parse(body);
      return cb(body.error || body.errorMessage, body);
    }
  };
};

Bitrefill.prototype.inventory = function(cb) {
  request.get({ 
    url: this.authurl + "/inventory/"
  }, handleResponse(cb));
};

Bitrefill.prototype.lookup_number = function(number, operator, cb) {
  var args = {
    number: number,
    operatorSlug: operator
  };
  
  request.get({ 
    url: this.authurl + "/lookup_number",
    qs: args
  }, handleResponse(cb));
};

Bitrefill.prototype.place_order = function(number, operator, pack, email, cb) {
  var args = {
    number: number,
    valuePackage: pack,
    operatorSlug: operator,
    email: email
  };

  request.post({ 
    url: this.authurl + "/order",
    body: args,
    json: true
  }, handleResponse(cb));
};

Bitrefill.prototype.order_status = function(order_id, cb) {
  request.get({ 
    url: this.authurl + "/order/" + order_id
  }, handleResponse(cb));
};