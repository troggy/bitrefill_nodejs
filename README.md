# Bitrefill NodeJS client
A NodeJS client for the Bitrefill API. Bitrefill lets you pay phone bills in 127 countries.

## Website
https://www.bitrefill.com/

## Documentation

http://docs.bitrefill.apiary.io/#

## Install
```bash
$ npm install bitrefill
```

## Test
The tests are run using mocha, and expect active API keys to be present in a file named cfg.json. This cfg.json file should be one level above the test directory. Usage:

Currently all tests pass most of the time, but sometimes there are timeouts. Last results:

```bash
$ mocha -t 5000

  bitrefill
    ✓ get inventory (1690ms)
    ✓ look up a Digicel Panama number (1450ms)
    ✓ Get a quote for a Digicel Panama number (2305ms)
    ✓ look up a Digicel Panama order status (3840ms)


  4 passing (9s)
```

## Configuration
To configure, pass options to the Bitrefill function formatted like shown in example_cfg.json. Note that it should not actually be json encoded. Example:

```
Bitrefill = require(bitrefill);
cfg = {"key":"", "secret":"", "url": "api.bitrefill.com/v1/"};
bitrefill = Bitrefill(cfg);
```
