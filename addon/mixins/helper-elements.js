import Ember from 'ember';

const {
  Mixin
} = Ember;

export default Mixin.create({
  getElement: function(cursor) {
    return document.elementFromPoint(
      this.getPageX(cursor.xPos),
      this.getPageY(cursor.yPos)
    );
  },

  getPageX: function(point) {
    return this.getClientX(point) + $(window).scrollLeft();
  },

  getPageY: function(point) {
    return this.getClientY(point) + $(window).scrollTop();
  },

  getClientX: function(point) {
    return Math.round( point * $(window).innerWidth() );
  },

  getClientY: function(point) {
    return Math.round( point * $(window).innerHeight() );
  },

  getScreenX: function(point) {
    return Math.round( point * screen.width );
  },

  getScreenY: function(point) {
    return Math.round( point * screen.height );
  },

});
