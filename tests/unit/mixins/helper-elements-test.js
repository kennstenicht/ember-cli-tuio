import Ember from 'ember';
import HelperElementsMixin from '../../../mixins/helper-elements';
import { module, test } from 'qunit';

module('Unit | Mixin | helper elements');

// Replace this with your real tests.
test('it works', function(assert) {
  var HelperElementsObject = Ember.Object.extend(HelperElementsMixin);
  var subject = HelperElementsObject.create();
  assert.ok(subject);
});
