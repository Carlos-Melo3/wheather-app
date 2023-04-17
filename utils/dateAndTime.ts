export const WeekAndTime = () => {
  const currentDate = new Date();
  const weekNumber = currentDate.getDay();
  const week = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const dayOfWeek = week[weekNumber];
  const time = currentDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

  return dayOfWeek + ", " + time;
};

export const SunriseAndSunset = (sunrise: number, sunset: number, lon: number) => {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  const differenceInHours = Math.trunc((lon + 47.91) / 15);
  console.log(differenceInHours);

  const sunriseHours = (sunriseDate.getHours() + differenceInHours) <= 24 ? sunriseDate.getHours() + differenceInHours : sunriseDate.getHours() - differenceInHours;
  const additionOfZero = sunriseHours < 10 ? "0" + sunriseHours : sunriseHours;
  const sunriseMinutes = sunriseDate.getMinutes() < 10 ? "0" + sunriseDate.getMinutes() : sunriseDate.getMinutes();
  const sunsetHours = sunsetDate.getHours() + differenceInHours;
  const sunsetMinutes = sunsetDate.getMinutes() < 10 ? "0" + sunsetDate.getMinutes() : sunsetDate.getMinutes();
  const sunriseTime = additionOfZero + ":" + sunriseMinutes;
  const sunsetTime = sunsetHours + ":" + sunsetMinutes;
  return [sunriseTime, sunsetTime];
};