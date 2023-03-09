interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export function calculateExercises(
  exerciseHours: number[],
  targetHours: number
): Result {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter((num) => num > 0).length;
  const totalHours = exerciseHours.reduce((total, num) => total + num, 0);
  const average = totalHours / periodLength;

  let success = true;
  let rating: number;
  if (average < targetHours) {
    success = false;
    rating = 1;
  } else if (average === targetHours) {
    success = true;
    rating = 2;
  } else {
    success = true;
    rating = 3;
  }

  let message: string;

  switch (rating) {
    case 1:
      message = "You didn't meet your goal";
      break;
    case 2:
      message = "Congratulations! You met your goal.";
      break;
    case 3:
      message = "Wow! You exceeded your goal!";
      break;
    default:
      message = "Something went wrong...";
  }

  // console.log(targetHours);
  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating,
    ratingDescription: message,
    target: targetHours,
    average: average,
  };
}

// try {
//   const args1 = process.argv.slice(2);
//   const target = Number(args1[0]);
//   const array = args1.slice(1).map((input) => Number(input));
//   console.log(calculateExercises(array, target));
// } catch (error) {
//   console.log(error);
// }
