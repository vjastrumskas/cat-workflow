import { useUserData } from '../stores/userData.ts';

const katinas = useUserData();

export const data = {
  labels: [
    ['Base Goal', katinas.user.goal],
    ['Food', '231'],
    ['Exercise', '26'],
  ],
  datasets: [
    {
      backgroundColor: ['#d7d7d7', '#ba51e4', '#ffc400'],
      data: [2415, 231, 26],
      borderRadius: 5,
      drawBorder: false,
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '80%',
  plugins: {
    legend: {
      display: true,
      position: 'right',
    },
  },
};
