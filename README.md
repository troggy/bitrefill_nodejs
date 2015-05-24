# Bitrefill NodeJS client
A NodeJS client for the Bitrefill API. Bitrefill lets you pay phone bills in 127 countries.

https://www.bitrefill.com/

## Install
```bash
$ npm install bitrefill
```

## Test
The tests are run using mocha, and expect active API keys to be present in a file named cfg.json. This cfg.json file should be one level above the test directory. Usage:

```bash
$ mocha
```

Currently 2 tests pass most of the time but sometimes time out, and 2 tests always fail. Last results:

```bash
$ mocha

  bitrefill
    ✓ get inventory (1691ms)
    ✓ look up a Digicel Panama number (1580ms)
    1) Get a quote for a Digicel Panama number
    2) look up a Digicel Panama order status


  2 passing (5s)
  2 failing

  1) bitrefill Get a quote for a Digicel Panama number:
     Error: done() invoked with non-Error: HTTP error: 404 body: <html><head><meta charset='utf-8'><title>Error</title><script type="text/javascript">
//<![CDATA[
try{if (!window.CloudFlare) {var CloudFlare=[{verbose:0,p:0,byc:0,owlid:"cf",bag2:1,mirage2:0,oracle:0,paths:{cloudflare:"/cdn-cgi/nexp/dok3v=1613a3a185/"},atok:"dc8dfdfd7180cc12c8fe2287c9fd55a1",petok:"83f5f4694d5a8b4a030bc919060ccf10e0e1b772-1432495500-1800",zone:"bitrefill.com",rocket:"0",apps:{"dakwak":{"to_lang":"ru","domain_id":"8422774","from_lang":"en","account_id":"71878"}}}];!function(a,b){a=document.createElement("script"),b=document.getElementsByTagName("script")[0],a.async=!0,a.src="//ajax.cloudflare.com/cdn-cgi/nexp/dok3v=7e13c32551/cloudflare.min.js",b.parentNode.insertBefore(a,b)}()}}catch(e){};
//]]>
</script>
<link rel='stylesheet' href='/keystone/styles/error.css'></head><body><div class='error'><h1 class='error-title'>Sorry, no page could be found at this address (404)</h1><div class="error-message"></div></div></body></html>
      at test/test.js:42:16
      at Request._callback (bitrefill.js:82:7)
      at _stream_readable.js:944:16

  2) bitrefill look up a Digicel Panama order status:
     Error: done() invoked with non-Error: HTTP error: 404 body: <html><head><meta charset='utf-8'><title>Error</title><script type="text/javascript">
//<![CDATA[
try{if (!window.CloudFlare) {var CloudFlare=[{verbose:0,p:0,byc:0,owlid:"cf",bag2:1,mirage2:0,oracle:0,paths:{cloudflare:"/cdn-cgi/nexp/dok3v=1613a3a185/"},atok:"dc8dfdfd7180cc12c8fe2287c9fd55a1",petok:"f823f06c980e5227147f45b596273fd5e42f7fe5-1432495501-1800",zone:"bitrefill.com",rocket:"0",apps:{"dakwak":{"to_lang":"ru","domain_id":"8422774","from_lang":"en","account_id":"71878"}}}];!function(a,b){a=document.createElement("script"),b=document.getElementsByTagName("script")[0],a.async=!0,a.src="//ajax.cloudflare.com/cdn-cgi/nexp/dok3v=7e13c32551/cloudflare.min.js",b.parentNode.insertBefore(a,b)}()}}catch(e){};
//]]>
</script>
<link rel='stylesheet' href='/keystone/styles/error.css'></head><body><div class='error'><h1 class='error-title'>Sorry, no page could be found at this address (404)</h1><div class="error-message"></div></div></body></html>
      at test/test.js:58:16
      at Request._callback (bitrefill.js:105:7)
      at _stream_readable.js:944:16
```

## Configuration
To configure, pass options to the Bitrefill function formatted like shown in example_cfg.json. Example:

```
Bitrefill = require(bitrefill);
cfg = {"bitrefill":{"key":"", "secret":"", "url": "api.bitrefill.com/v1/"}};
bitrefill = Bitrefill(cfg);
```
