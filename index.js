/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-tuio',

  included: function(app) {
    // Hammer.js
    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
    app.import(app.bowerDirectory + '/jquery-hammerjs/jquery.hammer.js');

    // Tuio
    app.import('vendor/socket.io.js');
    app.import('vendor/Tuio.js');
  }
};
