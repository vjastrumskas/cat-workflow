import { useUserData } from '../stores/userData.ts';

// Function to create the data object
export function data() {
  const katinas = useUserData();
  return {
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
}

// Function to create the options object
export function options(): object {
  return {
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
}
