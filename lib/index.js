'use strict';

const cleanPath = (path) => {
  let clean = path;
  if (path.startsWith('/')) {
    clean = clean.slice(1);
  }
  if (path.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
};

const traverseData = (result, path, value) => {
  if (value === null || typeof value !== 'object') {
    result[path] = value; // eslint-disable-line no-param-reassign
    return;
  }

  const valueKeys = Object.keys(value);
  valueKeys.forEach((key) => {
    const nextLevel = value[key];
    const cleanKey = cleanPath(key);
    traverseData(result, `${path}/${cleanKey}`, nextLevel);
  });
};

const firebaseDeepUpdates = (data) => {
  if (data === null || typeof data !== 'object') {
    return data;
  }

  const result = {};
  const dataKeys = Object.keys(data);

  dataKeys.forEach((key) => {
    const value = data[key];
    traverseData(result, cleanPath(key), value);
  });

  return result;
};

module.exports = firebaseDeepUpdates;
