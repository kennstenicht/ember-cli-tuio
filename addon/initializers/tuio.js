import TuioService from 'ember-cli-tuio/services/tuio';

export default {
  name: 'tuio-service',

  initialize: function(container, application) {
    application.register('service:tuio', TuioService);
  }
};

