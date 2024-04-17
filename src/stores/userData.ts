import { ref } from 'vue';
import { defineStore } from 'pinia';

interface User {
  name: string;
  goal: string;
  weight: string;
  age: string;
}

// eslint-disable-next-line import/prefer-default-export
export const useUserData = defineStore('user', () => {
  const user = ref<User>({
    name: 'xxx',
    goal: '2500',
    weight: '',
    age: '',
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
  return { user, changeName, changeWeight, changeAge, changeGoal };
});
