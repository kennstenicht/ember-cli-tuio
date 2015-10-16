import Ember from 'ember';

const {
  Mixin,
  $,
  on,
  run: {
    bind
  }
} = Ember;

export default Mixin.create({
  gestures: ['tap', 'doubletap', 'press', 'pan', 'swipe'],

  recognizers: {
    tap: {},
    press: {},
    pan: {direction: Hammer.DIRECTION_ALL},
    swipe: {direction: Hammer.DIRECTION_ALL},
    rotate: {enable: true},
    pinch: {enable: true}
  },

  setup: on('didInsertElement', function() {
    if (!this.get('gestures')) {
      return;
    }

    this.$().hammer();

    this.$().hammer({
      domEvents: true
    });

    this.get('gestures').forEach((gesture) => {
      let options = this.get('recognizers')[gesture];

      if (options) {
        this.$().data('hammer').get(gesture).set(options);
      }
    });
  })
});
