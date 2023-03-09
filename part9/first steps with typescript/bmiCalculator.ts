export function calculateBmi(height: number, mass: number) {
  const heightInMeters = height / 100;
  const BMI = mass / (heightInMeters * heightInMeters);

  if (BMI < 18.5) {
    return "Underweight (Unhealthy Weight)";
  } else if (BMI < 24.9) {
    return "Normal (Healthy Weight)";
  } else if (BMI < 29.9) {
    return "Overweight (Unhealthy Weight)";
  } else {
    return "Obese (Unhealthy Weight)";
  }
}

// const args = process.argv.slice(2);
// console.log(args);
//
// try {
//   const height = Number(args[0]);
//   const mass = Number(args[1]);
//   console.log(calculateBmi(height, mass));
// } catch (error) {
//   console.log(error);
// }
