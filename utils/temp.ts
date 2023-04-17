export const TempCelsius = (temp: number) => {
  const result = temp - 273.15;
  return result.toFixed(0);
};

export const FeelsLike = (feels_like: number) => {
  const result = feels_like - 273.15;
  return result.toFixed(0);
};