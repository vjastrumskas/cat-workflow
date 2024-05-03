import { useUserData } from '../stores/userData.ts';

// Function to create the data object
export function data() {
  const katinas = useUserData();
  return {
    labels: [
      ['Food', katinas.computeConsumedEnergy()],
      ['Base Goal', katinas.user.goal],
      ['Exercise', katinas.computeTotalCaloriesBurnt().toString()],
    ],
    datasets: [
      {
        backgroundColor: ['#7ec099', '#e1ecf5', '#ffc400'],
        data: [
          katinas.computeConsumedEnergy(),
          parseInt(
            katinas.computeRemainder(
              katinas.getGoal(),
              katinas.computeConsumedEnergy(),
              katinas.computeTotalCaloriesBurnt()
            ),
            10
          ),
          katinas.computeTotalCaloriesBurnt(),
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
