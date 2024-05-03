import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import { getItem, setItem } from '../services/localStorage.ts';

interface User {
  name: string;
  goal: string;
  stepsgoal: string;
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
    steps: string;
    caloriesBurnt: string;
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
    stepsgoal: '10000',
    weight: '',
    age: '',
    foods: [],
    dates: [],
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
  const changeFoods = (NewFoods: User['foods']): void => {
    user.value.foods.push(...NewFoods);
  };
  const changeDates = (NewDates: User['dates']): void => {
    user.value.dates.push(...NewDates);
  };
  const incrementGoal = (): void => {
    const numericGoal = parseInt(user.value.goal, 10);
    const incrementedGoal = (numericGoal + 1).toString();
    user.value.goal = incrementedGoal;
  };

  const getGoal = (): number => parseInt(user.value.goal, 10);

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
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
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
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const isAdded = () => {
    const route = useRoute();
    const targetDate = route.params.date;
    const targetFoods = user.value.dates.find(
      date => date.date === targetDate
    )?.foods;

    if (!targetFoods) {
      console.log(`Is added ${targetFoods}`);
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
    goalEnergy: number,
    consumedEnergy: number,
    exerciseEnergy: number
  ): string {
    // Basic approximation: Calories = Weight (kg) × 24 + Age (years) × 3.5
    const calories = goalEnergy - consumedEnergy + exerciseEnergy;
    return calories.toString();
  }

  const insertFood = (food: string, date: string | string[]) => {
    const targetDate = user.value.dates.find(d => d.date === date);

    if (targetDate) {
      // Check if the food already exists in the array
      const existingFood = targetDate.foods.find(f => f.food === food);
      if (!existingFood) {
        // If not found, add the new food item
        targetDate.foods.push({
          food,
          added: true,
          portion: '100',
        });
      } else {
        console.log(`Food '${food}' already exists on ${date}.`);
      }
    } else {
      // If the date doesn't exist, create a new entry
      user.value.dates.push({
        date,
        steps: '0',
        caloriesBurnt: '550',
        foods: [{ food, added: true, portion: '100' }],
      });
    }
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const addFood = (food: string, baseEnergy: string) => {
    const newFood = {
      food, // Replace with the actual food name
      added: false, // Set to false initially
      portion: '100', // Specify the portion size (e.g., 150 grams)
      baseEnergy, // Specify the base energy (calories)
    };

    user.value.foods.push(newFood);
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const resetUserData = () => {
    // Reset specific properties within the user object
    user.value.name = '';
    user.value.goal = '';
    user.value.weight = '';
    user.value.age = '';
    user.value.foods = [];
    user.value.dates = [];
  };

  const getStepsGoal = (): number => parseInt(user.value.stepsgoal, 10);

  const getStepsCompleted = () => {
    const route = useRoute();
    const targetDate = route.params.date;
    const targetFoods = user.value.dates.find(
      date => date.date === targetDate
    )?.steps;

    if (!targetFoods) {
      return 0; // Return an empty array if the target date is not found
    }

    return parseInt(targetFoods, 10);
  };

  const incrementSteps = (date: string | string[]): void => {
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    // Find the specific food item within the date's foods array
    const currentSteps = parseInt(targetDate.steps, 10);
    const newSteps = currentSteps + 1000;
    targetDate.steps = newSteps.toString();

    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const decrementSteps = (date: string | string[]): void => {
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    // Find the specific food item within the date's foods array
    const currentSteps = parseInt(targetDate.steps, 10);
    const newSteps = currentSteps - 1000;
    targetDate.steps = newSteps.toString();

    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const changeSteps = (date: string | string[], steps: string): void => {
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    const newSteps = steps;
    targetDate.steps = newSteps.toString();

    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const zeroSteps = (date: string | string[]): void => {
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    const newSteps = 0;
    targetDate.steps = newSteps.toString();

    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const getCaloriesBurnt = () => {
    const route = useRoute();
    const targetDate = route.params.date;
    const targetFoods = user.value.dates.find(
      date => date.date === targetDate
    )?.caloriesBurnt;

    if (!targetFoods) {
      return 0; // Return an empty array if the target date is not found
    }

    return parseInt(targetFoods, 10);
  };

  const computeCaloriesBurntSteps = (): string => {
    const route = useRoute();
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === route.params.date);
    if (!targetDate) {
      console.error(`Date ${route.params.date} not found.`);
      return '0';
    }

    // Find the specific food item within the date's foods array
    const currentSteps = parseInt(targetDate.steps, 10);
    const currentWeight = parseInt(user.value.weight, 10);
    const caloriesBurnt = ((currentSteps * currentWeight) / 2000).toString();
    return caloriesBurnt;
  };

  const computeTotalCaloriesBurnt = (): number => {
    const route = useRoute();
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === route.params.date);
    if (!targetDate) {
      console.error(`Date ${route.params.date} not found.`);
      return 0;
    }

    // Find the specific food item within the date's foods array
    const computedCaloriesBurntSteps = parseInt(
      computeCaloriesBurntSteps(),
      10
    );
    const currentCaloriesBurnt = getCaloriesBurnt();
    const caloriesBurnt = computedCaloriesBurntSteps + currentCaloriesBurnt;
    return caloriesBurnt;
  };

  const updateCalories = (
    date: string | string[],
    action: 'increment' | 'decrement' | 'zero' | 'specific',
    specificValue?: string
  ): void => {
    // Find the date object based on the provided date
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    // Find the specific food item within the date's foods array
    const currentCalories = parseInt(targetDate.caloriesBurnt, 10);

    let newCalories;
    switch (action) {
      case 'increment':
        newCalories = currentCalories + 25;
        break;
      case 'decrement':
        newCalories = currentCalories - 25;
        break;
      case 'zero':
        newCalories = 0;
        break;
      case 'specific':
        if (specificValue !== undefined) {
          newCalories = parseInt(specificValue, 10);
        } else {
          console.error(`Specific value is missing.`);
          return;
        }
        break;
      default:
        console.error(`Invalid action: ${action}`);
        return;
    }

    targetDate.caloriesBurnt = Math.max(newCalories, 0).toString();

    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const replaceName = (newName: string): void => {
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    if (!existingData) {
      return;
    }

    const keyToDelete = user.value.name;
    changeName(newName);
    const combinedData = {
      ...existingData, // Spread existing data
      // [user.value.name]: user.value, // Add Tadis data dynamically with the new key
      [newName]: user.value, // Add Tadis data dynamically with the new key
    };

    // Optionally, you can delete the old key if needed
    delete combinedData[keyToDelete];

    setItem('mealTracker', combinedData);
  };

  const replaceWeight = (newWeight: string): void => {
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    if (!existingData) {
      return;
    }

    changeWeight(newWeight);
    const combinedData = {
      ...existingData, // Spread existing data
      // [user.value.name]: user.value, // Add Tadis data dynamically with the new key
      [user.value.name]: user.value, // Add Tadis data dynamically with the new key
    };
    setItem('mealTracker', combinedData);
  };

  const replaceAge = (newAge: string): void => {
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    if (!existingData) {
      return;
    }

    changeAge(newAge);
    const combinedData = {
      ...existingData, // Spread existing data
      // [user.value.name]: user.value, // Add Tadis data dynamically with the new key
      [user.value.name]: user.value, // Add Tadis data dynamically with the new key
    };
    setItem('mealTracker', combinedData);
  };

  return {
    user,
    changeName,
    changeWeight,
    changeAge,
    changeGoal,
    changeFoods,
    changeDates,
    incrementGoal,
    getGoal,
    incrementPortion,
    decrementPortion,
    isAdded,
    notAdded,
    computeConsumedEnergy,
    computeRemainder,
    insertFood,
    addFood,
    resetUserData,
    getStepsCompleted,
    getStepsGoal,
    incrementSteps,
    decrementSteps,
    changeSteps,
    zeroSteps,
    getCaloriesBurnt,
    computeCaloriesBurntSteps,
    computeTotalCaloriesBurnt,
    updateCalories,
    replaceName,
    replaceWeight,
    replaceAge,
  };
});
