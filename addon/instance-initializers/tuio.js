export function initialize(application) {
  application.container.lookup('service:tuio').setupClient();
}

export default {
  name: 'tuio-connect',
  initialize: initialize
};
