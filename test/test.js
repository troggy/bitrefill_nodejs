var fs = require('fs');
var path = require('path');
var querystring = require("querystring");
var request = require('request');
var should = require('should');

var Bitrefill = require("../bitrefill.js");
dir = __dirname.substring(0, __dirname.length - 4);
var cfg = JSON.parse(fs.readFileSync(path.resolve(dir, 'cfg.json')).toString());

bitrefill = Bitrefill(cfg);

describe('bitrefill', function() {
  it('get inventory', function(done) {
    bitrefill.inventory(function(err, res) {
      if (err != undefined) {
        return done(err);
      }
      should.exist(res);
      res.should.have.property("AF");
      res["AF"].should.have.property("operators");
      done();
    });
  });

  it('look up a Digicel Panama number', function(done) {
    bitrefill.lookup_number('50760000001', 'digicel-panama', function(err, res) {
      if (err != undefined) {
        return done(err);
      }
      should.exist(res);
      res.should.have.property("operator");
      res["operator"].should.have.property("packages");
      res['operator']['packages'][0].should.have.property("value");
      done();
    });
  });

  it('Get a quote for a Digicel Panama number', function(done) {
    bitrefill.place_order('50760000001', 'digicel-panama', "5", 'example@deginner.com', function(err, res) {
      if (err != undefined) {
        return done(err);
      }
      should.exist(res);
      res.should.have.property("btcPrice");
      res.should.have.property("orderId");
      res.should.have.property("payment");
      res['payment'].should.have.property("address");
      res['payment'].should.have.property("human");
      res['payment'].should.have.property("satoshiPrice");
      done();
    });
  });

  it('look up a Digicel Panama order status', function(done) {
    bitrefill.place_order('50760000001', 'digicel-panama', "5", 'example@deginner.com', function(err, res) {
      if (err != undefined) {
        return done(err);
      }
      bitrefill.order_status(res['orderId'], function(err, res) {
        if (err != undefined) {
          return done(err);
        }
        should.exist(res);
        res.should.have.property("delivered");
        res.should.have.property("paymentReceived");
        done();
      });
    });
  });
});
