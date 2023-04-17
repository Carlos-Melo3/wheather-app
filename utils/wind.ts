export const WindDirection = (deg: number) => {
  const result = ["N", "NNE", "NE", "ENE", "L", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];
  const index = Math.floor((deg / 22.5) + 0.5) % 16;
  return result[index];
};