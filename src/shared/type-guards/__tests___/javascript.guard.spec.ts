import { isObject } from '../javascript.guards';

describe('javascript guard isObject', () => {
  it('returns true if input is an object', () => {
    const input = { name: 'John', age: 25 };
    const result = isObject(input);

    expect(result).toBe(true);
  });

  it('returns false if input is not an object', () => {
    const input = 'not an object';
    const result = isObject(input);

    expect(result).toBe(false);
  });

  it('returns false if input is null', () => {
    const input = null;
    const result = isObject(input);

    expect(result).toBe(false);
  });

  it('returns false if input is undefined', () => {
    const input = undefined;
    const result = isObject(input);

    expect(result).toBe(false);
  });
});
