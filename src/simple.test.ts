import { test, expect } from 'vitest';

const user = {
  name: 'Vaidis',
  age: 22,
};

test('Vaidis cia', () => {
  expect(user.name).toBe('Vaidis');
  expect(user.age).toBe(22);
});
