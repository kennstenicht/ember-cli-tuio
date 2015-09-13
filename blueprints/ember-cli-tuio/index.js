'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: "hammerjs", target: "2.0.4" },
      { name: "jquery-hammerjs", target: "~2.0.0"}
    ]);
  }
};