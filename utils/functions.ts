export const getWeekAndTime = () => {
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
  const time = currentDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return dayOfWeek + ", " + time;
};

export const getSunriseAndSunset = (
  sunrise: number,
  sunset: number,
  lon: number
) => {
  const sunriseDate = new Date(sunrise * 1000);
  const sunsetDate = new Date(sunset * 1000);

  const differenceInHours = Math.trunc((lon + 47.91) / 15);
  console.log(differenceInHours);

  const sunriseHours =
    sunriseDate.getHours() + differenceInHours <= 24
      ? sunriseDate.getHours() + differenceInHours
      : sunriseDate.getHours() - differenceInHours;
  const additionOfZero = sunriseHours < 10 ? "0" + sunriseHours : sunriseHours;
  const sunriseMinutes =
    sunriseDate.getMinutes() < 10
      ? "0" + sunriseDate.getMinutes()
      : sunriseDate.getMinutes();
  const sunsetHours = sunsetDate.getHours() + differenceInHours;
  const sunsetMinutes =
    sunsetDate.getMinutes() < 10
      ? "0" + sunsetDate.getMinutes()
      : sunsetDate.getMinutes();
  const sunriseTime = additionOfZero + ":" + sunriseMinutes;
  const sunsetTime = sunsetHours + ":" + sunsetMinutes;
  return [sunriseTime, sunsetTime];
};

export const getSearchIcon = (icon: string) => {
  type IconMap = Record<string, string>;

  const iconMap: IconMap = {
    "01d": "/icon/sun.svg",
    "01n": "/icon/moon.svg",
    "02d": "/icon/fewClouds.svg",
    "02n": "/icon/fewCloudsMoon.svg",
    "03d": "/icon/scatteredClouds.svg",
    "03n": "/icon/scatteredClouds.svg",
    "04d": "/icon/cloudy.svg",
    "04n": "/icon/cloudy.svg",
    "09d": "/icon/rain.svg",
    "09n": "/icon/rain.svg",
    "10d": "/icon/rain.svg",
    "10n": "/icon/rain.svg",
    "11d": "/icon/thunderstorm.svg",
    "11n": "/icon/thunderstorm.svg",
    "13d": "/icon/snow.svg",
    "13n": "/icon/snow.svg",
    "50d": "/icon/haze.svg",
    "50n": "/icon/haze.svg",
  };

  return iconMap[icon] || "";
};

export const getWindDirection = (deg: number) => {
  const result = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "L",
    "ESE",
    "SE",
    "SSE",
    "S",
    "SSO",
    "SO",
    "OSO",
    "O",
    "ONO",
    "NO",
    "NNO",
  ];
  const index = Math.floor(deg / 22.5 + 0.5) % 16;
  return result[index];
};
