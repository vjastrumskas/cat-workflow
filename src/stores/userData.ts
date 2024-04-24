import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';

interface User {
  name: string;
  goal: string;
  weight: string;
  age: string;
  foods: {
    food: string;
    added: boolean;
    portion: string;
    baseEnergy: string;
  }[];
  dates: {
    date: string | string[];
    foods: {
      food: string;
      added: boolean;
      portion: string;
    }[];
  }[];
}

// eslint-disable-next-line import/prefer-default-export
export const useUserData = defineStore('user', () => {
  const user = ref<User>({
    name: '',
    goal: '',
    weight: '',
    age: '',
    foods: [
      { food: 'kebab', added: false, portion: '100', baseEnergy: '700' },
      { food: 'morka', added: false, portion: '100', baseEnergy: '25' },
      { food: 'alus', added: false, portion: '100', baseEnergy: '250' },
      { food: 'gummies', added: false, portion: '100', baseEnergy: '250' },
      {
        food: 'karbonad schnitzel',
        added: false,
        portion: '100',
        baseEnergy: '250',
      },
      { food: 'vodka', added: false, portion: '100', baseEnergy: '250' },
      { food: 'tabaka', added: false, portion: '100', baseEnergy: '250' },
      { food: 'android', added: false, portion: '100', baseEnergy: '250' },
    ],
    dates: [
      {
        date: '2024-04-23',
        foods: [{ food: 'kebab', added: true, portion: '300' }],
      },
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

  const incrementPortion = (
    foodName: string,
    date: string | string[]
  ): void => {
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    // Find the specific food item within the date's foods array
    const foodItem = targetDate.foods.find(item => item.food === foodName);
    if (foodItem) {
      const currentPortion = parseInt(foodItem.portion, 10);
      const newPortion = currentPortion + 25;
      foodItem.portion = newPortion.toString();
    } else {
      console.error(`Food item ${foodName} not found for date ${date}.`);
    }
  };

  const decrementPortion = (
    foodName: string,
    date: string | string[]
  ): void => {
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    const foodIndex = targetDate.foods.findIndex(
      item => item.food === foodName
    );
    if (foodIndex !== -1) {
      const currentPortion = parseInt(targetDate.foods[foodIndex].portion, 10);
      const newPortion = currentPortion - 25;

      if (newPortion <= 0) {
        // Remove the foodItem from the array
        targetDate.foods.splice(foodIndex, 1);
      } else {
        // Update the portion
        targetDate.foods[foodIndex].portion = newPortion.toString();
      }
    }
  };

  const isAdded = () => {
    const route = useRoute();
    const targetDate = route.params.date;
    const targetFoods = user.value.dates.find(
      date => date.date === targetDate
    )?.foods;

    if (!targetFoods) {
      return []; // Return an empty array if the target date is not found
    }

    return targetFoods.filter(food => food.added);
  };

  const notAdded = () => user.value.foods.filter(x => !x.added);

  const computeConsumedEnergy = (): number => {
    const route = useRoute();
    const targetDate = route.params.date;
    const targetFoods = user.value.dates.find(
      date => date.date === targetDate
    )?.foods;

    if (!targetFoods) {
      return 0; // Return 0 if no target foods found
    }

    // Calculate total energy consumed
    const totalEnergy = targetFoods.reduce((accumulator, currentFood) => {
      if (currentFood.added) {
        const foodItem = user.value.foods.find(
          food => food.food === currentFood.food
        );
        if (foodItem) {
          const foodEnergy =
            (parseInt(foodItem.baseEnergy, 10) *
              parseInt(currentFood.portion, 10)) /
            100;
          return accumulator + foodEnergy;
        }
      }
      return accumulator;
    }, 0);

    return totalEnergy;
  };

  function computeRemainder(
    goalEnergy: string,
    consumedEnergy: number
  ): string {
    // Basic approximation: Calories = Weight (kg) × 24 + Age (years) × 3.5
    const calories = parseInt(goalEnergy, 10) - consumedEnergy;
    return calories.toString();
  }

  const insertFood = (food: string, date: string | string[]) => {
    const targetDate = user.value.dates.find(d => d.date === date);

    if (targetDate) {
      // Check if the food already exists in the array
      const existingFood = targetDate.foods.find(f => f.food === food);
      if (!existingFood) {
        // If not found, add the new food item
        targetDate.foods.push({ food, added: true, portion: '100' });
      } else {
        console.log(`Food '${food}' already exists on ${date}.`);
      }
    } else {
      // If the date doesn't exist, create a new entry
      user.value.dates.push({
        date,
        foods: [{ food, added: true, portion: '100' }],
      });
    }
    console.log(user);
  };

  const addFood = (food: string, baseEnergy: string) => {
    const newFood = {
      food, // Replace with the actual food name
      added: false, // Set to false initially
      portion: '100', // Specify the portion size (e.g., 150 grams)
      baseEnergy, // Specify the base energy (calories)
    };

    user.value.foods.push(newFood);
  };

  return {
    user,
    changeName,
    changeWeight,
    changeAge,
    changeGoal,
    incrementGoal,
    incrementPortion,
    decrementPortion,
    isAdded,
    notAdded,
    computeConsumedEnergy,
    computeRemainder,
    insertFood,
    addFood,
  };
});
