'use strict';

const firebaseDeepUpdates = require('../lib');

describe('firebase deep updates testing suite', () => {
  it('should not throw an error', () => {
    expect(() => firebaseDeepUpdates(null)).not.toThrow();
  });

  it('should return scalar and null values as-is', () => {
    expect(firebaseDeepUpdates(null)).toBe(null);
    expect(firebaseDeepUpdates(true)).toBe(true);
    expect(firebaseDeepUpdates(100)).toBe(100);
    expect(firebaseDeepUpdates('str')).toBe('str');
  });

  it('should return objects one level deep without slashed keys as-is', () => {
    expect(firebaseDeepUpdates({ foo: 'bar' })).toEqual({ foo: 'bar' });
  });

  it('should return objects one level deep with slashed keys as-is', () => {
    expect(firebaseDeepUpdates({ 'foo/bar': 'baz' })).toEqual({ 'foo/bar': 'baz' });
  });

  it('should return objects more than one level deep without slashed keys as one level deep objects with slashed keys', () => {
    expect(firebaseDeepUpdates({ foo: { bar: 'baz' } })).toEqual({ 'foo/bar': 'baz' });
  });

  it('should return objects more than one level deep with slashed keys as one level deep objects with slashed keys', () => {
    expect(firebaseDeepUpdates({ foo: { 'bar/baz': 'maz' } })).toEqual({ 'foo/bar/baz': 'maz' });
  });

  it('should strip trailing and leading slashes', () => {
    expect(firebaseDeepUpdates({ '/foo/bar': true })).toEqual({ 'foo/bar': true });
    expect(firebaseDeepUpdates({ 'foo/bar/': true })).toEqual({ 'foo/bar': true });
    expect(firebaseDeepUpdates({ '/foo/bar/': true })).toEqual({ 'foo/bar': true });
    expect(firebaseDeepUpdates({ nested: { '/foo/bar': true } })).toEqual({ 'nested/foo/bar': true });
    expect(firebaseDeepUpdates({ nested: { 'foo/bar/': true } })).toEqual({ 'nested/foo/bar': true });
    expect(firebaseDeepUpdates({ nested: { '/foo/bar/': true } })).toEqual({ 'nested/foo/bar': true });
  });

  it('should combine slashed keys at all levels of the data tree', () => {
    expect(firebaseDeepUpdates({ 'foo/bar': { 'baz/maz': 'blue' } })).toEqual({ 'foo/bar/baz/maz': 'blue' });
  });

  it('should assign new properties to second parameter when it exists', () => {
    const old = { foo: 'bar' };
    const res = firebaseDeepUpdates({ nested: { tree: 'graph' } }, old);
    expect(res).toBe(old);
    expect(res).toEqual({ foo: 'bar', 'nested/tree': 'graph' });
  });
});
