// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toEqual(3);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Subtract })).toEqual(
      -1,
    );
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Multiply })).toEqual(
      2,
    );
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Divide })).toEqual(
      1.5,
    );
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate }),
    ).toEqual(9);
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'asdad' })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: 's', b: 'a', action: Action.Divide })).toEqual(
      null,
    );
  });
});
