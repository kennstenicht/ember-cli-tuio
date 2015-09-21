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
    let client = new Tuio.Client({
        host: "http://localhost:5000"
    });
    client.connect();

    client.on('addTuioCursor', bind(this, function(cursor) {
      this.createTouchEvent("touchstart", cursor);
    }));

    client.on('updateTuioCursor', bind(this, function(cursor) {
      this.createTouchEvent('touchmove', cursor);
    }));

    client.on('removeTuioCursor', bind(this, function(cursor) {
      this.createTouchEvent('touchend', cursor);
    }));
  },

  createTouchEvent: function(eventName, cursor) {
    let config = this.container.lookupFactory('config:environment'),
      touch = this.createTouch(cursor),
      evt = document.createEvent('Event');

    evt.initEvent(eventName, true, true);
    evt.touches = this.createTouchList(touch, eventName);
    evt.targetTouches = this.getTargetTouches(touch.target);
    evt.changedTouches = [touch];

    touch.target.dispatchEvent(evt);

    if( config.tuioTouchDebug ) {
      this.updateDebugTouches(touch, eventName);
    }
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

  createTouchList: function(touch, eventName) {
    let touches = this.get('touches');

    if(eventName === 'touchstart') {
      touches.push(touch);
    } else if(eventName === 'touchmove') {
      touches[_.findIndex(touches, 'identifier', touch.identifier)] = touch;
    } else if(eventName === 'touchend') {
      touches.splice(_.findIndex(touches, 'identifier',  touch.identifier), 1);
    }

    return touches;
  },


  getTargetTouches: function(element) {
    var targetTouches = [];
    for (var i = 0; i < this.touches.length; i++) {
      var touch = this.touches[i];
      if (touch.target === element) {
        targetTouches.push(touch);
      }
    }
    return targetTouches;
  },

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


  // Debug
  updateDebugTouches: function(touch, eventName) {
    if(eventName === 'touchstart') {
      $('body').append('<div id="touch' + touch.identifier + '" style="position: absolute; background: rgba(215,61,47,0.3); width: 30px; height: 30px; border-radius: 50%; z-index:999; top: '+touch.pageY+'px; left: '+ touch.pageX+'px;"></div>');
    } else if(eventName === 'touchmove') {
      $('#touch'+touch.identifier).css({
        'top': touch.pageY,
        'left': touch.pageX
      });
    } else if(eventName === 'touchend') {
      $('#touch'+touch.identifier).remove();
    }
  }
});
