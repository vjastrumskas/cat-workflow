import { expect, it, describe, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useUserData } from './stores/userData.ts';

describe('Test compute calorie remainder', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('computeRemainder when energy goal is 2000', () => {
    const user = useUserData();

    const result = user.computeRemainder(2000, 1500, 300);
    expect(result).toEqual('800');
  });

  it('computeRemainder when weight is 0', () => {
    const user = useUserData();

    const result = user.computeRemainder(0, 1500, 300);
    expect(result).toEqual('0');
  });

  it('computeRemainder when all args are 0', () => {
    const user = useUserData();

    const result = user.computeRemainder(0, 0, 0);
    expect(result).toEqual('0');
  });

  it('computeRemainder when all args are negative', () => {
    const user = useUserData();

    const result = user.computeRemainder(-2000, -1500, -300);
    expect(result).toEqual('0');
  });

  it('computeRemainder when all args are extremely high, max 4000kcal', () => {
    const user = useUserData();

    const result = user.computeRemainder(1000000, 800000, 200000);
    expect(result).toEqual('4000');
  });

  it('computeRemainder when fractional energy values', () => {
    const user = useUserData();

    const result = user.computeRemainder(2500.573, 1800.54, 300.7512214);
    expect(result).toEqual('1000');
  });
});
