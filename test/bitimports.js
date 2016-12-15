var System;
System = (function() {
  var importer = bitimports.config({
    "baseUrl": "../",
    "paths": {
      "chai": "../node_modules/chai/chai",
      "minimatch": "node_modules/minimatch/browser"
    },
    "urlArgs": 'bust=' + (new Date()).getTime()
  });

  // Add modules to exclude from pipeline processing
  importer.ignore(["dist/index"]);
  importer.logger.enableAll();
  return importer;
})();
