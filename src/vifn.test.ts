import { vi, expect, describe, it } from 'vitest';

describe('Vladimir', () => {
  it('Vladimirovic', () => {
    const getApples = vi.fn(() => 0);

    getApples();

    expect(getApples).toHaveBeenCalled();
    expect(getApples).toHaveReturnedWith(0);

    getApples.mockReturnValueOnce(5);

    const res = getApples();
    expect(res).toBe(5);
    expect(getApples).toHaveNthReturnedWith(2, 5);
  });
});
