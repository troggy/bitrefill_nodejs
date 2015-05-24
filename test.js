var bitrefill = require("./bitrefill.js");

// look up a number in Panama and try to place an order for it
bitrefill.lookup_number('50762000001', 'digicel-panama', function(err, res) {
  pack = res['operator']['packages'][0]["value"];
  bitrefill.place_order('50762000001', 'digicel-panama', pack, 'example@deginner.com', function(error, result) {
    console.log(error);
    console.log(result);
  });
});
