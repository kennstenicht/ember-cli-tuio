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

[Getting Started with Hammer.js](http://hammerjs.github.io/getting-started/)
[Tuio.js](http://fe9lix.github.io/Tuio.js/)


## Installation

```
ember install ember-cli-tuio
```

### Usage

Install and Start [Tuio.js Server](http://fe9lix.github.io/Tuio.js/)

```js
// app/components/touchable-component.js

import Ember from 'ember';
// Import mixin to get hammer.js gestures
import HammerMixin from 'ember-cli-tuio/mixins/hammer';

const {
  Component,
  computed
} = Ember;

export default Component.extend(HammerMixin, {
  recognizers: [
    // define the recognizers you would like to use in this component
    // - first value is the hammer.js recognizer name
    // - second value is a hammer.js options hash (leave it blank to use default)
    ['tap', {threshold: 40}],
	['press'],
	// hammer.js disable pinch and rotate by default, so you have to enable pinch and rotate
	['pinch', {enable: true}]
  ],

  tap: function(event) {
    // act on tap
	this.$().hide();
  },

  press: function(event) {
    // act on press
    console.log(event);
  },

  pinch: function(event) {
    // act on pinch
    console.log(event);
  }
});
```


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