import { describe, it, vi, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useUserData } from './stores/userData.ts';

// Initial data
const originalValue = {
  Thomas: {
    name: 'Thomas',
    goal: '2155',
    stepsgoal: '10000',
    weight: '86',
    age: '26',
    foods: [
      {
        food: 'Chicken breast',
        favorite: false,
        portion: '100',
        baseEnergy: '250',
      },
    ],
    dates: [
      {
        date: '2024-05-07',
        steps: '0',
        caloriesBurnt: '0',
        foods: [{ food: 'Chicken breast', added: true, portion: '125' }],
      },
    ],
  },
};

const originalValueTwoUsers = {
  Sauron: {
    name: 'Sauron',
    goal: '2500',
    stepsgoal: '10000',
    weight: '46',
    age: '32',
    foods: [
      {
        food: 'Pork',
        favorite: false,
        portion: '100',
        baseEnergy: '350',
      },
    ],
    dates: [
      {
        date: '2024-05-05',
        steps: '0',
        caloriesBurnt: '0',
        foods: [{ food: 'Pork', added: true, portion: '200' }],
      },
    ],
  },
  Thomas: {
    name: 'Thomas',
    goal: '2155',
    stepsgoal: '10000',
    weight: '86',
    age: '26',
    foods: [
      {
        food: 'Chicken breast',
        favorite: false,
        portion: '100',
        baseEnergy: '250',
      },
    ],
    dates: [
      {
        date: '2024-05-07',
        steps: '0',
        caloriesBurnt: '0',
        foods: [{ food: 'Chicken breast', added: true, portion: '100' }],
      },
    ],
  },
};

const expectedValueTwoUsers = {
  Sauron: {
    name: 'Sauron',
    goal: '2500',
    stepsgoal: '10000',
    weight: '46',
    age: '32',
    foods: [
      {
        food: 'Pork',
        favorite: false,
        portion: '100',
        baseEnergy: '350',
      },
    ],
    dates: [
      {
        date: '2024-05-05',
        steps: '0',
        caloriesBurnt: '0',
        foods: [{ food: 'Pork', added: true, portion: '200' }],
      },
    ],
  },
  Thomas: {
    name: 'Thomas',
    goal: '2155',
    stepsgoal: '10000',
    weight: '86',
    age: '26',
    foods: [
      {
        food: 'Chicken breast',
        favorite: false,
        portion: '100',
        baseEnergy: '250',
      },
    ],
    dates: [
      {
        date: '2024-05-07',
        steps: '0',
        caloriesBurnt: '0',
        foods: [{ food: 'Chicken breast', added: true, portion: '125' }],
      },
    ],
  },
};

const incrementedThomas = {
  Thomas: {
    name: 'Thomas',
    goal: '2155',
    stepsgoal: '10000',
    weight: '86',
    age: '26',
    foods: [
      {
        food: 'Chicken breast',
        favorite: false,
        portion: '100',
        baseEnergy: '250',
      },
    ],
    dates: [
      {
        date: '2024-05-07',
        steps: '0',
        caloriesBurnt: '0',
        foods: [{ food: 'Chicken breast', added: true, portion: '125' }],
      },
    ],
  },
};

const decrementedThomas = {
  Thomas: {
    name: 'Thomas',
    goal: '2155',
    stepsgoal: '10000',
    weight: '86',
    age: '26',
    foods: [
      {
        food: 'Chicken breast',
        favorite: false,
        portion: '100',
        baseEnergy: '250',
      },
    ],
    dates: [
      {
        date: '2024-05-07',
        steps: '0',
        caloriesBurnt: '0',
        foods: [{ food: 'Chicken breast', added: true, portion: '125' }],
      },
    ],
  },
};

describe('Test data merge', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('Data control', async () => {
    const user = useUserData();
    const mockLocalStorage = vi.fn();
    mockLocalStorage.mockReturnValue(originalValue);

    const mockUserName = vi.fn();
    mockUserName.mockReturnValue('Thomas');

    const mockPiniaData = vi.fn();
    mockPiniaData.mockReturnValue(originalValue.Thomas);

    const result = user.mergeData(
      mockLocalStorage(),
      mockUserName(),
      mockPiniaData()
    );
    expect(result).toEqual(mockLocalStorage());
  });

  it('Test portion increment merge of the same user', async () => {
    const user = useUserData();
    const mockLocalStorage = vi.fn();
    mockLocalStorage.mockReturnValue(originalValue);

    const mockUserName = vi.fn();
    mockUserName.mockReturnValue('Thomas');

    const mockPiniaData = vi.fn();
    mockPiniaData.mockReturnValue(incrementedThomas.Thomas);

    const result = user.mergeData(
      mockLocalStorage(),
      mockUserName(),
      mockPiniaData()
    );
    expect(result).toEqual(incrementedThomas);
  });

  it('Test portion decrement merge of the same user', async () => {
    const user = useUserData();
    const mockLocalStorage = vi.fn();
    mockLocalStorage.mockReturnValue(originalValue);

    const mockUserName = vi.fn();
    mockUserName.mockReturnValue('Thomas');

    const mockPiniaData = vi.fn();
    mockPiniaData.mockReturnValue(decrementedThomas.Thomas);

    const result = user.mergeData(
      mockLocalStorage(),
      mockUserName(),
      mockPiniaData()
    );
    expect(result).toEqual(decrementedThomas);
  });

  it('Test portion decrement merge of the same user', async () => {
    const user = useUserData();
    const mockLocalStorage = vi.fn();
    mockLocalStorage.mockReturnValue(originalValueTwoUsers);

    const mockUserName = vi.fn();
    mockUserName.mockReturnValue('Thomas');

    const mockPiniaData = vi.fn();
    mockPiniaData.mockReturnValue(incrementedThomas.Thomas);

    const result = user.mergeData(
      mockLocalStorage(),
      mockUserName(),
      mockPiniaData()
    );
    expect(result).toEqual(expectedValueTwoUsers);
  });
});
