import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRoute } from 'vue-router';
import displayToast from '../services/toastMessage.ts';

import { getItem, setItem } from '../services/localStorage.ts';

export const MAX_STEPS_VALUE = 150000;
export const STEPS_GOAL = 10000;

interface User {
  name: string;
  goal: string;
  stepsgoal: string;
  weight: string;
  age: string;
  foods: {
    food: string;
    favorite: boolean;
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
    stepsgoal: STEPS_GOAL.toString(),
    weight: '',
    age: '',
    foods: [],
    dates: [],
  });
  const changeName = (NewName: string): void => {
    user.value.name = NewName;
  };
  const changeWeight = (NewWeight: string): void => {
    user.value.weight = Math.floor(parseInt(NewWeight, 10)).toString();
  };
  const changeAge = (NewAge: string): void => {
    user.value.age = Math.floor(parseInt(NewAge, 10)).toString();
  };
  const changeGoal = (NewGoal: User['goal']): void => {
    user.value.goal = NewGoal;
  };
  const changeFoods = (NewFoods: User['foods']): void => {
    user.value.foods.push(...NewFoods);
  };
  const changeDates = (NewDates: User['dates']): void => {
    user.value.dates.push(...NewDates);
  };

  const changeUser = (NewUser: User): void => {
    user.value = NewUser;
  };

  const getGoal = (): number => parseInt(user.value.goal, 10);
  const getRoute = (): string | string[] => {
    const route = useRoute();
    return route.params.date;
  };

  const getUserObject = () => user.value;

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
      return []; // Return an empty array if the target date is not found
    }
    return targetFoods.filter(food => food.added);
  };

  const getFavorite = (sortByFavorites: boolean) => {
    if (sortByFavorites) {
      // Filter and sort by favorites
      return user.value.foods
        .filter(x => x.favorite)
        .concat(user.value.foods.filter(x => !x.favorite));
    }
    // Return the original array
    return user.value.foods;
  };

  const computeConsumedEnergy = (
    targetDate: string | string[],
    userObject?: User
  ): number => {
    if (!userObject) {
      return 0; // Return 0 if userObject is undefined
    }

    const targetFoods = userObject.dates?.find(
      date => date.date === targetDate
    )?.foods;

    if (!targetFoods) {
      return 0; // Return 0 if no target foods found
    }

    // Calculate total energy consumed
    const totalEnergy = targetFoods.reduce((accumulator, currentFood) => {
      if (currentFood.added) {
        const foodItem = userObject.foods.find(
          food => food.food === currentFood.food
        );
        if (foodItem) {
          const foodEnergy =
            (parseInt(foodItem.baseEnergy, 10) *
              parseInt(currentFood.portion, 10)) /
            100;

          if (!Number.isNaN(foodEnergy)) {
            // Only add to accumulator if foodEnergy is not NaN
            return accumulator + foodEnergy;
          }
        }
      }
      return accumulator;
    }, 0);

    const result = Math.floor(Math.min(Math.max(totalEnergy, 0), 4000));
    return result;
  };

  function computeRemainder(
    goalEnergy: number,
    consumedEnergy: number,
    exerciseEnergy: number
  ): string {
    // Basic approximation: Calories = Weight (kg) × 24 + Age (years) × 3.5
    const calories = goalEnergy - consumedEnergy + exerciseEnergy;

    const result = Math.floor(Math.min(Math.max(calories, 0), 4000));

    return result.toString();
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
        displayToast(`'${food}' has been added to ${date}.`);
      } else {
        displayToast(`Action stopped. '${food}' is already added to ${date}.`);
      }
    }
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData, // Spread existing data
      [user.value.name]: user.value, // Add Tadis data dynamically
    };
    setItem('mealTracker', combinedData);
  };

  const addFood = (food: string, baseEnergy: string) => {
    // Check if the food already exists in user.value.foods
    const existingFood = user.value.foods.find(foods => foods.food === food);

    if (existingFood) {
      // Food already exists, handle accordingly (e.g., update portion or energy)
      displayToast(`Action stopped. '${food}' is already added.`);

      // You can modify the existingFood object here if needed
    } else {
      // Food doesn't exist, create a new entry
      const newFood = {
        food,
        favorite: false,
        portion: '100',
        baseEnergy,
      };

      user.value.foods.push(newFood);
      const existingData = getItem<{ [key: string]: any }>('mealTracker');
      const combinedData = {
        ...existingData,
        [user.value.name]: user.value,
      };
      displayToast(`${food} has been registered.`);

      setItem('mealTracker', combinedData);
    }
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
    const targetDate = user.value.dates.find(d => d.date === date);
    if (!targetDate) {
      console.error(`Date ${date} not found.`);
      return;
    }

    const currentSteps = parseInt(targetDate.steps, 10);
    const newSteps = currentSteps + 1000;
    if (newSteps > MAX_STEPS_VALUE) {
      return;
    }
    targetDate.steps = newSteps.toString();

    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    const combinedData = {
      ...existingData,
      [user.value.name]: user.value,
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
    if (newSteps < 0) {
      return;
    }
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
      return;
    }

    // Convert steps to a numeric value
    const parsedSteps = parseInt(steps, 10);

    // Check if steps exceed 15000
    if (parsedSteps > MAX_STEPS_VALUE) {
      targetDate.steps = MAX_STEPS_VALUE.toString(); // Set steps to 15000
    } else {
      targetDate.steps = parsedSteps.toString(); // Otherwise, use the original steps
    }

    // Update mealTracker data
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

    targetDate.caloriesBurnt = Math.min(
      Math.max(newCalories, 0),
      4000
    ).toString();

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
      ...existingData,
      [user.value.name]: user.value,
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
      ...existingData,
      [user.value.name]: user.value,
    };
    setItem('mealTracker', combinedData);
  };

  const replaceGoal = (newGoal: string): void => {
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    if (!existingData) {
      return;
    }

    changeGoal(newGoal);
    const combinedData = {
      ...existingData,
      [user.value.name]: user.value,
    };
    setItem('mealTracker', combinedData);
  };

  // Insert empty date template when we browse the date by using router.
  const insertDateTemplate = (date: string | string[]): void => {
    const targetDate = user.value.dates.find(d => d.date === date);

    if (!targetDate) {
      // If the date doesn't exist, create a new entry
      user.value.dates.push({
        date,
        steps: '0',
        caloriesBurnt: '0',
        foods: [],
      });
    }
  };

  const favoriteIsActive = ref(false);
  const toggleFavoriteSort = () => {
    favoriteIsActive.value = !favoriteIsActive.value;
  };

  const changeFoodName = (oldFoodName: string, newFoodName: string) => {
    const foodIndex = user.value.foods.findIndex(
      foodEntry => foodEntry.food === oldFoodName
    );

    if (foodIndex !== -1) {
      const existingData = getItem<{ [key: string]: any }>('mealTracker');
      if (!existingData) {
        return;
      }

      // Change main food name
      user.value.foods[foodIndex].food = newFoodName;

      // Change food names in dates
      const updatedDates = user.value.dates.map(dateObj => {
        const updatedFoods = dateObj.foods.map(food => {
          if (food.food === oldFoodName) {
            return { ...food, food: newFoodName };
          }
          return food;
        });
        return { ...dateObj, foods: updatedFoods };
      });

      // Update Pinia store
      user.value.dates = user.value.dates.map(dateObj => {
        const matchingUpdatedDate = updatedDates.find(
          updatedDate => updatedDate.date === dateObj.date
        );

        return matchingUpdatedDate || dateObj;
      });

      const combinedData = {
        ...existingData,

        [user.value.name]: user.value,
      };
      setItem('mealTracker', combinedData);
    }
  };

  const changeCalories = (oldFoodName: string, newCalories: string) => {
    const foodIndex = user.value.foods.findIndex(
      foodEntry => foodEntry.food === oldFoodName
    );

    // Change main food calories (baseEnergy). Note! It does not save data to local storage.
    if (foodIndex !== -1) {
      user.value.foods[foodIndex].baseEnergy = newCalories;
    }
  };

  const deleteFoodByName = (oldFoodName: string) => {
    const existingData = getItem<{ [key: string]: any }>('mealTracker');
    if (!existingData) {
      return;
    }

    // Remove main food entry and dates containing the food
    user.value.foods = user.value.foods.filter(
      foodEntry => foodEntry.food !== oldFoodName
    );
    user.value.dates.forEach(dateObj => {
      dateObj.foods = dateObj.foods.filter(food => food.food !== oldFoodName);
    });

    // Update Pinia store
    const combinedData = {
      ...existingData,
      [user.value.name]: user.value,
    };
    setItem('mealTracker', combinedData);
  };

  const computeStepsGoalAchievement = (
    StepsGoal: number,
    StepsCompleted: number
  ): number => {
    const result = StepsGoal - StepsCompleted;
    if (result < 0) {
      return 0;
    }
    if (result > STEPS_GOAL) {
      return STEPS_GOAL;
    }
    return result;
  };

  const getStepsCompletedModifed = (StepsCompleted: number): number => {
    const result = StepsCompleted;
    if (result < 0) {
      return 0;
    }
    if (result > STEPS_GOAL) {
      return STEPS_GOAL;
    }
    return result;
  };

  // Validation function for newFood
  const validateNewFood = (NewFoodName: string) =>
    NewFoodName.length >= 1 && NewFoodName.length <= 12;

  // Validation function for foodEnergy
  const validateFoodEnergy = (FoodEnergy: string) => {
    const numericValue = parseInt(FoodEnergy, 10);
    return (
      !Number.isNaN(numericValue) && numericValue >= 1 && numericValue <= 1000
    );
  };

  // Computed property to check overall validity
  const isFoodValid = (NewFoodName: string, FoodEnergy: string) =>
    validateNewFood(NewFoodName) && validateFoodEnergy(FoodEnergy);

  const validateUserName = (NewUserName: string) =>
    NewUserName.length >= 3 && NewUserName.length <= 12;

  const validateWeight = (NewWeight: string) => {
    const numericValue = parseInt(NewWeight, 10);
    return numericValue >= 30 && numericValue <= 400;
  };

  const validateAge = (NewGoal: string) => {
    const numericValue = parseInt(NewGoal, 10);
    return numericValue >= 16 && numericValue <= 120;
  };

  const validateGoal = (NewGoal: string) => {
    const numericValue = parseInt(NewGoal, 10);
    return numericValue >= 500 && numericValue <= 4000;
  };

  return {
    user,
    favoriteIsActive,
    changeName,
    changeWeight,
    changeAge,
    changeGoal,
    changeFoods,
    changeDates,
    changeUser,
    getGoal,
    getRoute,
    getUserObject,
    incrementPortion,
    decrementPortion,
    isAdded,
    getFavorite,
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
    replaceGoal,
    insertDateTemplate,
    toggleFavoriteSort,
    changeFoodName,
    changeCalories,
    deleteFoodByName,
    computeStepsGoalAchievement,
    getStepsCompletedModifed,
    isFoodValid,
    validateUserName,
    validateAge,
    validateGoal,
    validateWeight,
  };
});
