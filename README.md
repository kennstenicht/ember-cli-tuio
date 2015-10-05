# Ember-cli-tuio

[Tuio.js](http://fe9lix.github.io/Tuio.js/) Client which recives OSC/TUIO messages from a websocket and transforms those to touch events. The addon ships with a component mixin that integrates hammer.js gestures.

Available Gestures:
- tap
- doubletap
- press
- pan (only horizontal by default)
- swipe (only horizontal by default)
- pinch (disabled by default)
- rotate (disabled by default)


### Links

* [Getting Started with Hammer.js](http://hammerjs.github.io/getting-started/)
* [Tuio.js](http://fe9lix.github.io/Tuio.js/)
* [Tongseng (TUIO wrapper for Mac OS X multitouch events)](https://github.com/fajran/tongseng)


## Installation

Your Browser neads to allow touch input.
Chrome
Go to [chrome://flags/](chrome://flags) and set "Enable touch events" to enabled.

Firefox
Go to [about:config](about:config) and set "dom.w3c_touch_events.enabled" to enable=(1)


```
ember install ember-cli-tuio
```


## Setup

Add customEvents to application (if ember.js < 1.13.9)

```js
// app/app.js

customEvents: {
  objectadded: 'objectAdded',
  objectmoved: 'objectMoved',
  objectremoved: 'objectRemoved'
}
```

### Usage

Install and Start [Tuio.js Server](http://fe9lix.github.io/Tuio.js/)

```js
// app/components/touchable-component.js

import Ember from 'ember';
// Import mixin to get hammer.js gestures
import Gestures from 'ember-cli-tuio/mixins/gestures';

const {
  Component,
  computed
} = Ember;

export default Component.extend(Gestures, {
  // allowed gestures in this component (default: tap, doubletap, press, pan, swipe)
  // hammer gestures are lowercase (pinchstart NOT pinchStart)
  gestures: ['tap', 'press', 'pinch'],

  // change default recognizer settings
  // available options are documented in the hammer.js [documentation](http://hammerjs.github.io/recognizer-pan/)
  recognizers: {
    press: {time: 400},
    pinch: {enable: true}
  },

  tap: function(event) {
    // act on tap
    this.$().hide();
  },

  press: function(event) {
    // act on press
    console.log(event);
  },

  pinch: function(event) {
    // act on pinchstart, pinchmove & pinchend
    console.log(event);
  },


  // Object/Fiducial events don't need the gestures mixin
  objectAdded: function(e) {
    // act if a object is  added to the table
    if(e.symbolId === 1) {
      console.log('Object one is added');
    }
  },

  objectMoved: function() {
    // act on move
  },

  objectRemoved: function() {
    // act if a object is  removed from the table
  }
});
```

### Action helper

This triggers pressAction on press

<div {{action "pressAction" on='press'}}>Press Me!</div>


## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Publishing
```
ember release
npm publish
```