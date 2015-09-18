import Ember from 'ember';

const {
  Service,
  $,
  run: {
    bind
  }
} = Ember;

export default Service.extend({
  touches: [],

  setupClient: function() {
    let config = this.container.lookupFactory('config:environment'),
      client = new Tuio.Client({
        host: "http://localhost:5000"
    });
    client.connect();

    client.on('addTuioCursor', bind(this, function(cursor) {
      let touch = this.createTouch(cursor);

      this.touches.push(touch);

      this.createTouchEvent("touchstart", touch);

      if( config.tuioTouchDebug ) this.addTouches(touch);
    }));

    client.on('updateTuioCursor', bind(this, function(cursor) {
      let touch = this.createTouch(cursor);

      this.touches[this.touches.indexOf(touch)] = touch;

      this.createTouchEvent('touchmove', touch);

      if( config.tuioTouchDebug ) this.updateTouches(touch);
    }));

    client.on('removeTuioCursor', bind(this, function(cursor) {
      let touch = this.createTouch(cursor);

      this.touches.splice(this.touches.indexOf(touch), 1);

      this.createTouchEvent('touchend', touch);

      if( config.tuioTouchDebug ) this.removeTouches(touch);
    }));
  },

  addTouches: function(touch) {
    $('body').append('<div id="touch' + touch.identifier + '" style="position: absolute; background: rgba(215,61,47,0.3); width: 30px; height: 30px; border-radius: 50%; z-index:999; top: '+touch.pageY+'px; left: '+ touch.pageX+'px;"></div>');
  },

  updateTouches: function(touch) {
    Ember.run.throttle(this, function() {
      $('#touch'+touch.identifier).css({'top': touch.pageY, 'left': touch.pageX});
    }, 100);
  },

  removeTouches: function(touch) {
    $('#touch'+touch.identifier).remove();
  },

  createTouch: function(cursor) {
    var data = {};

    data.identifier = cursor.sessionId;
    data.screenX = this.getScreenX(cursor.xPos);
    data.screenY = this.getScreenY(cursor.yPos);
    data.pageX = this.getPageX(cursor.xPos);
    data.pageY = this.getPageY(cursor.yPos);
    data.clientX = this.getClientX(cursor.xPos);
    data.clientY = this.getClientY(cursor.yPos);
    data.target = this.getElement(cursor);

    return data;
  },

  createTouchEvent: function(name, touch) {
    var evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
    evt.touches = this.touches;
    evt.targetTouches = this.getTargetTouches(touch.target);
    evt.changedTouches = [touch];

    if (touch.target) {
      touch.target.dispatchEvent(evt);
    } else {
      document.dispatchEvent(evt);
    }
  },

  getTargetTouches: function(element) {
    var targetTouches = [];
    for (var i = 0; i < this.touches.length; i++) {
      var touch = this.touches[i];
      if (touch.target == element) {
        targetTouches.push(touch);
      }
    }
    return targetTouches;
  },

  getElement: function(cursor) {
    return document.elementFromPoint(
      this.getClientX(cursor.xPos),
      this.getClientY(cursor.yPos)
    );
  },

  getPageX: function(point) {
    return this.getClientX(point) + $(window).scrollLeft();
  },

  getPageY: function(point) {
    return this.getClientY(point) + $(window).scrollTop();
  },

  getClientX: function(point) {
    return Math.round( point * $(window).width() );
  },

  getClientY: function(point) {
    return Math.round( point * $(window).height() );
  },

  getScreenX: function(point) {
    return Math.round( point * screen.width );
  },

  getScreenY: function(point) {
    return Math.round( point * screen.height );
  }
});
