// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const values_1 = [1, 2, 3];
const values_2 = [1, 2, 3, 4];

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values_1)).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(values_2)).toMatchSnapshot();
  });
});
