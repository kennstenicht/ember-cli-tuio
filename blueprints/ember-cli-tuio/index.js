'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addBowerPackagesToProject([
      { name: 'lodash', target: '3.10.1' },
      { name: 'hammerjs', target: '2.0.4' },
      { name: 'jquery-hammerjs', target: '~2.0.0' }
    ]);
  }
};