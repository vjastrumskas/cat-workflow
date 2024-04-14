import { describe, expect, it } from 'vitest';
import suma from './sum.ts';

describe('#suma', () => {
  it('returns 0 with no numbers', () => {
    expect(suma()).toBe(0);
  });
});
