import { sortByNumbers, sortByString } from '../sorted.util';

describe('sorted util sortByNumbers', () => {
  it('should sort numbers in ascending order', () => {
    const sortByProps = { a: 5, b: 3, isDescending: false };
    const result = sortByNumbers(sortByProps);

    expect(result).toBe(2);
  });

  it('should sort numbers in descending order', () => {
    const sortByProps = { a: 5, b: 3, isDescending: true };
    const result = sortByNumbers(sortByProps);

    expect(result).toBe(-2);
  });
});

describe('sorted util sortByString', () => {
  it('should return -1 when the first string comes before the second', () => {
    const strA = 'apple';
    const strB = 'banana';
    const result = sortByString(strA, strB);

    expect(result).toBe(-1);
  });

  it('should return 1 when the first string comes after the second', () => {
    const strA = 'banana';
    const strB = 'apple';
    const result = sortByString(strA, strB);

    expect(result).toBe(1);
  });

  it('should return 0 when both strings are equal', () => {
    const strA = 'apple';
    const strB = 'apple';
    const result = sortByString(strA, strB);

    expect(result).toBe(0);
  });

  it('should ignore letter case when comparing strings', () => {
    const strA = 'Apple';
    const strB = 'apple';
    const result = sortByString(strA, strB);

    expect(result).toBe(0);
  });
});
