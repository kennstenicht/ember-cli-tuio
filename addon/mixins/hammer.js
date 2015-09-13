import Ember from 'ember';

const {
  Mixin,
  on,
  run: {
    bind
  }
} = Ember;

export default Mixin.create({
  recognizers: [
    ['tap'],
    ['press'],
    ['pan'],
    ['swipe'],
    ['pinch']
  ],

  setup: on('didInsertElement', function() {
    if (!this.get('recognizers')) {
      return;
    }

    this.$().hammer();

    this.get('recognizers').forEach((item) => {
      if (item[1]) {
        this.$().data('hammer').get(item[0]).set(item[1]);
      }

      if (typeof this[item[0]] === 'function') {
        this.$().hammer().on(item[0], bind(this, item[0]));
      }
    });
  }),

  teardown: on('willDestroyElement', function() {
    if (!this.get('recognizers')) {
      return;
    }

    this.get('recognizers').forEach((item) => {
      if (typeof this[item[0]] === 'function') {
        this.$().hammer().off(item[0], bind(this, item[0]));
      }
    });
  })
});
