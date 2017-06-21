# Firebase Deep Updates

### Motivation

As of this writing, firebase recommends .update() for multi-location transactional commits to the Realtime Database. What is not natural is that the way .update() works is conceptually different when it is passed an object one level deep than when it it several levels deep. At one level deep it sets the properties at the current reference location, not the whole location, but when it is passed an object more than one level deep it doesn't merge the new data into the previous property value, but completely replaces the value. This package is meant to solve this discrepancy.

### Get Started

`firebase-deep-updates` exports a single function that takes any value (scalar, null, array, object or combinations of all of them) and returns a one-level-deep object with slashed keys representing the locations of scalar and null values. For example, in the following:

```javascript
const firebaseDeepUpdates = require('firebase-deep-updates');

const updates = firebaseDeepUpdates({
  name: null,
  foo: {
    bar: true,
  },
});

admin.database().ref().update(updates);
```

`updates` is equal to:

```javascript
{
  'name': null,
  'foo/bar': true,
}
```

You can pass an optional second parameter that will be mutated i.e. the resulting properties will written to it instead of a new object.
