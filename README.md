# Ember-cli-tuio

Tuio.js Client that transforms OSC/TUIO messages to touch events. The addon ships with a component mixin that integrates hammer.js gestures.


### Usage
http://hammerjs.github.io/getting-started/

```js
// app/components/hammer-component.js

import Ember from 'ember';
import HammerMixin from 'ember-cli-tuio/mixins/hammer';

const {
  Component,
  computed
} = Ember;

export default Component.extend(HammerMixin, {
  // define your recognizers
  // regosgnizers are an array of tupples:
  // - first value is the hammer.js recognizer name
  // - second value is an options hash

  recognizers: [
    ['tap', {threshold: 40}]
  ],

  tap: function(event) {
    // act on tap
	this.$().hide();
  },

  press: function(event) {
    // act on press
    console.log(event);
  }
});
```




## Installation

```
ember install ember-cli-tuio
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