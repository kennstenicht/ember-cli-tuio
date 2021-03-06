import Ember from 'ember';

const {
  Service,
  $,
  run: {
    bind,
    later
  }
} = Ember;

export default Service.extend({
  touches: [],

  setupClient: function() {
    let client = new Tuio.Client({
        host: "http://localhost:5000"
    });
    client.connect();

    // Tuio Cursors
    client.on('addTuioCursor', bind(this, function(cursor) {
      this.createTouchEvent("touchstart", cursor);
    }));

    client.on('updateTuioCursor', bind(this, function(cursor) {
      this.createTouchEvent('touchmove', cursor);
    }));

    client.on('removeTuioCursor', bind(this, function(cursor) {
      this.createTouchEvent('touchend', cursor);
    }));

    // Tuio Objects
    client.on('addTuioObject', bind(this, function(object) {
      this.createObjectEvent("objectadded", object);
    }));

    client.on('updateTuioObject', bind(this, function(object) {
      this.createObjectEvent('objectmoved', object);
    }));

    client.on('removeTuioObject', bind(this, function(object) {
      this.createObjectEvent('objectremoved', object);
    }));
  },

  createTouchEvent: function(eventName, cursor) {
    let touch = this.createTouch(cursor);
    let evt = document.createEvent('Event');

    evt.initEvent(eventName, true, true);
    evt.touches = this.createTouchList(touch, eventName);
    evt.targetTouches = this.getTargetTouches(touch.target);
    evt.changedTouches = [touch];

    touch.target.dispatchEvent(evt);


    // Tuio touch debug mode
    let config = this.container.lookupFactory('config:environment');

    if( config.tuioTouchDebug ) {
      this.updateDebugTouches(touch, eventName);
    }
  },

  createTouch: function(cursor) {
    const data = {
      identifier: cursor.sessionId,
      screenX: this.getScreenX(cursor.xPos),
      screenY: this.getScreenY(cursor.yPos),
      pageX: this.getPageX(cursor.xPos),
      pageY: this.getPageY(cursor.yPos),
      clientX: this.getClientX(cursor.xPos),
      clientY: this.getClientY(cursor.yPos),
      target: this.getElement(cursor)
    };

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


  // Triggers objects (fiducial) events
  createObjectEvent: function(eventName, object) {
    $(this.getElement(object)).trigger({
      type: eventName,
      screenX: this.getScreenX(object.xPos),
      screenY: this.getScreenY(object.yPos),
      clientX: this.getClientX(object.xPos),
      clientY: this.getClientY(object.yPos),
      pageX: this.getPageX(object.xPos),
      pageY: this.getPageY(object.yPos),
      symbolId: object.symbolId,
      tuioObject: object
    });
  },


  // HELPER
  getElement: function(cursor) {
    let elements = document.elementsFromPoint(
      this.getPageX(cursor.xPos),
      this.getPageY(cursor.yPos)
    );

    return ( $(elements[0]).hasClass('touch') ) ? elements[1] : elements[0];;
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
      $('body').append('<div class="touch" id="touch' + touch.identifier + '" style="transform: translate(' + (touch.pageY - 15) + 'px,' + (touch.pageX - 15) + 'px); background: rgba(215,61,47,0.3); width: 30px; height: 30px; border-radius: 50%; z-index:999;"></div>');
    } else if(eventName === 'touchmove') {
      $('#touch'+touch.identifier).css({
        'transform': 'translate(' + (touch.pageX - 15) + 'px, ' + (touch.pageY - 15) + 'px)'
      });
    } else if(eventName === 'touchend') {
      $('#touch'+touch.identifier).remove();
    }
  }
});
