var bitrefill = require("./bitrefill.js");

// look up a number in Panama and try to place an order for it
// bitrefill.lookup_number('50762000001', 'digicel-panama', function(err, res) {
  // pack = res['operator']['packages'][0]["value"];
  // console.log(res)
// });

// place a fake test order for Digicel Panama
bitrefill.place_order('50762000001', 'digicel-panama', 5, 'example@deginner.com', function(error, result) {
  console.log(error);
  console.log(result);
});

// look up a fake order id
// bitrefill.order_status("550528e417b8390300fb4734", function(err, res) {
  // console.log(err);
  // console.log(res);
// });