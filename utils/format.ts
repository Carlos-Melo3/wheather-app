export const KelvinToCelsius = (temp: number) => {
  const result = temp - 273.15;
  return result.toFixed(0);
};
