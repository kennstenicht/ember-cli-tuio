export function initialize(application) {
  application.container.lookup('service:tuio').setupClient();
  let customEvents = application.get('customEvents') || {};

  customEvents['objectadded'] = 'objectAdded';
  customEvents['objectmove'] = 'objectMove';
  customEvents['objectremoved'] = 'objectRemoved';

  application.set('customEvents', customEvents);
}

export default {
  name: 'tuio-connect',
  initialize: initialize
};
