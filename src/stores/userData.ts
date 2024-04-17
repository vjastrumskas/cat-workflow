import { ref } from 'vue';
import { defineStore } from 'pinia';

interface User {
  name: string;
  goal: string;
  consumedEnergy: string;
  weight: string;
  age: string;
  foods: {
    food: string;
    added: boolean;
    energy: string;
  }[];
}

// eslint-disable-next-line import/prefer-default-export
export const useUserData = defineStore('user', () => {
  const user = ref<User>({
    name: 'Anton',
    goal: '2500',
    consumedEnergy: '0',
    weight: '',
    age: '',
    foods: [
      { food: 'alus', added: false, energy: '100' },
      { food: 'miltai', added: false, energy: '500' },
      { food: 'kebab', added: false, energy: '700' },
    ],
  });
  const changeName = (NewName: string): void => {
    user.value.name = NewName;
  };
  const changeWeight = (NewWeight: string): void => {
    user.value.weight = NewWeight;
  };
  const changeAge = (NewAge: string): void => {
    user.value.age = NewAge;
  };
  const changeGoal = (NewGoal: string): void => {
    user.value.goal = NewGoal;
  };
  const incrementGoal = (): void => {
    const numericGoal = parseInt(user.value.goal, 10);
    const incrementedGoal = (numericGoal + 1).toString();
    user.value.goal = incrementedGoal;
  };
  const isAdded = () => user.value.foods.filter(x => x.added);

  const computeConsumedEnergy = (): number =>
    user.value.foods.reduce((accumulator, currentFood) => {
      const foodEnergy = parseInt(currentFood.energy, 10);
      return currentFood.added ? accumulator + foodEnergy : accumulator;
    }, 0);

  function computeRemainder(
    goalEnergy: string,
    consumedEnergy: number
  ): string {
    // Basic approximation: Calories = Weight (kg) × 24 + Age (years) × 3.5
    const calories = parseInt(goalEnergy, 10) - consumedEnergy;
    return calories.toString();
  }

  return {
    user,
    changeName,
    changeWeight,
    changeAge,
    changeGoal,
    incrementGoal,
    isAdded,
    computeConsumedEnergy,
    computeRemainder,
  };
});
