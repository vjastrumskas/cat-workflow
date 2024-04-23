import { createRouter, createWebHistory } from 'vue-router';
import SettingsView from '../views/SettingsView.vue';
import MainView from '../views/MainView.vue';
import getWeekdaysWithDates from '../components/computePossibleDays.ts';
import getTodaysDate from '../utils/dateToday.ts';

const obj = getWeekdaysWithDates();

const routes = [
  {
    path: '/date/:date',
    name: 'Habits by date', // Make single worded, camelCase style.
    component: MainView,
    beforeEnter(to: any) {
      const exist = obj.find(item => item.fullcalendarday === to.params.date);
      if (!exist) return { name: 'Redirect' };
      return true;
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Redirect',
    redirect: () => `/date/${getTodaysDate()}`,
  },
  { path: '/settings', name: 'Settings', component: SettingsView }, // refer name to path.
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
