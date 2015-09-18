import Ember from 'ember';

const {
  Mixin,
  on,
  run: {
    bind
  }
} = Ember;

export default Mixin.create({
  gestures: ['tap', 'doubletap', 'press', 'pan', 'swipe'],

  recognizers: {
    tap: {threshold: 40},
    press: {time: 400},
    pan: {threshold: 30, direction: Hammer.DIRECTION_ALL},
    swipe: {threshold: 120, velocity: 3, direction: Hammer.DIRECTION_ALL},
    rotate: {enable: true},
    pinch: {enable: true}
  },

  setup: on('didInsertElement', function() {
    if (!this.get('gestures')) {
      return;
    }

    this.$().hammer();

    this.get('gestures').forEach((gesture) => {
      let options = this.get('recognizers')[gesture];

      if (options) {
        this.$().data('hammer').get(gesture).set(options);
      }

      if (typeof this[gesture] === 'function') {
        this.$().hammer().on(gesture, bind(this, gesture));
      }
    });
  }),

  teardown: on('willDestroyElement', function() {
    if (!this.get('gestures')) {
      return;
    }

    this.get('gestures').forEach((gesture) => {
      if (typeof this[gesture] === 'function') {
        this.$().hammer().off(gesture, bind(this, gesture));
      }
    });
  })
});
