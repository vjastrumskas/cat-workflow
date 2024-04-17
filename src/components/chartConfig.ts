import { useUserData } from '../stores/userData.ts';

// Function to create the data object
export function data() {
  const katinas = useUserData();
  return {
    labels: [
      ['Base Goal', katinas.user.goal],
      ['Food', katinas.computeConsumedEnergy()],
      ['Exercise', '26'],
    ],
    datasets: [
      {
        backgroundColor: ['#e1ecf5', '#7ec099', '#ffc400'],
        data: [
          parseInt(
            katinas.computeRemainder(
              katinas.user.goal,
              katinas.computeConsumedEnergy()
            ),
            10
          ),
          katinas.computeConsumedEnergy(),
          26,
        ],
        borderRadius: 5,
        drawBorder: false,
        hoverBorderWidth: 1,
        hoverBorderColor: '#646cff',
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
