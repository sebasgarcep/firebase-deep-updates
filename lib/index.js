'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var cleanPath = function cleanPath(path) {
  var clean = path;
  if (path.startsWith('/')) {
    clean = clean.slice(1);
  }
  if (path.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
};

var traverseData = function traverseData(result, path, value) {
  if (value === null || (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
    result[path] = value;
    return;
  }

  var valueKeys = Object.keys(value);
  valueKeys.forEach(function (key) {
    var nextLevel = value[key];
    var cleanKey = cleanPath(key);
    traverseData(result, path + '/' + cleanKey, nextLevel);
  });
};

var firebaseDeepUpdates = function firebaseDeepUpdates(data) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (data === null || (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object') {
    return data;
  }

  var result = opts.target || {};

  var dataKeys = Object.keys(data);

  dataKeys.forEach(function (key) {
    var value = data[key];
    traverseData(result, cleanPath(key), value);
  });

  return result;
};

module.exports = firebaseDeepUpdates;