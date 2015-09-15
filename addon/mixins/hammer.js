import Ember from 'ember';

const {
  Mixin,
  on,
  run: {
    bind
  }
} = Ember;

export default Mixin.create({
  gestures: ['tap', 'press'],

  recognizers: {
    tap: {threshold: 40},
    press: {time: 2000}
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
