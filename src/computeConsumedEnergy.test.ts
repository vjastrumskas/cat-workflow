import { describe, it, vi, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';

import { useUserData } from './stores/userData.ts'; // Adjust the path

describe('computeConsumedEnergy', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('returns 0 if no target foods found', () => {
    const user = useUserData();

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(undefined);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(0);
  });

  it('computeConsumedEnergy with data and date match', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: '500' },
      ],
      dates: [
        {
          date: '2024-05-05',
          steps: '0',
          caloriesBurnt: '0',
          foods: [{ food: 'Tuna', added: true, portion: '100' }],
        },
      ],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(500);
  });

  it('computeConsumedEnergy with date mismatch', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: '500' },
      ],
      dates: [],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-04');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(0);
  });

  it('computeConsumedEnergy with empty dates', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: '500' },
      ],
      dates: [],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(0);
  });

  it('computeConsumedEnergy with multiple foods', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: '500' },
        { food: 'Kebab', favorite: false, portion: '100', baseEnergy: '400' },
      ],
      dates: [
        {
          date: '2024-05-05',
          steps: '0',
          caloriesBurnt: '0',
          foods: [
            { food: 'Tuna', added: true, portion: '100' },
            { food: 'Kebab', added: true, portion: '150' },
          ],
        },
      ],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(1100);
  });

  it('computeConsumedEnergy with negative base energy', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: '-500' },
        { food: 'Kebab', favorite: false, portion: '100', baseEnergy: '-400' },
      ],
      dates: [
        {
          date: '2024-05-05',
          steps: '0',
          caloriesBurnt: '0',
          foods: [
            { food: 'Tuna', added: true, portion: '100' },
            { food: 'Kebab', added: true, portion: '150' },
          ],
        },
      ],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(0);
  });

  it('computeConsumedEnergy with fractional base energy', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: '512.23' },
        {
          food: 'Kebab',
          favorite: false,
          portion: '100',
          baseEnergy: '433.45',
        },
      ],
      dates: [
        {
          date: '2024-05-05',
          steps: '0',
          caloriesBurnt: '0',
          foods: [
            { food: 'Tuna', added: true, portion: '100' },
            { food: 'Kebab', added: true, portion: '150' },
          ],
        },
      ],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(1161);
  });

  it('computeConsumedEnergy with alphabetical base energy', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: 'xx' },
        { food: 'Kebab', favorite: false, portion: '100', baseEnergy: '400' },
      ],
      dates: [
        {
          date: '2024-05-05',
          steps: '0',
          caloriesBurnt: '0',
          foods: [
            { food: 'Tuna', added: true, portion: '100' },
            { food: 'Kebab', added: true, portion: '150' },
          ],
        },
      ],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(600);
  });

  it('computeConsumedEnergy with alphabetical daily portion', () => {
    const user = useUserData();

    const Vaidotas = {
      name: 'Vaidotas',
      goal: '1266.5',
      stepsgoal: '10000',
      weight: '50',
      age: '19',
      foods: [
        { food: 'Tuna', favorite: false, portion: '100', baseEnergy: '500' },
        { food: 'Kebab', favorite: false, portion: '100', baseEnergy: '400' },
      ],
      dates: [
        {
          date: '2024-05-05',
          steps: '0',
          caloriesBurnt: '0',
          foods: [
            { food: 'Tuna', added: true, portion: '100' },
            { food: 'Kebab', added: true, portion: ';' },
          ],
        },
      ],
    };

    const mockUseRoute = vi.fn();
    mockUseRoute.mockReturnValue('2024-05-05');

    const mockUserValueDatesFind = vi.fn();
    mockUserValueDatesFind.mockReturnValue(Vaidotas);
    const result = user.computeConsumedEnergy(
      mockUseRoute(),
      mockUserValueDatesFind()
    );

    expect(result).toBe(500);
  });
});
