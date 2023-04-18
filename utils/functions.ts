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


export const getDescriptionPortuguese = (description: string) => {
  type DescriptionMap = Record<string, string>;

  const descriptionMap: DescriptionMap = {
    "thunderstorm with light rain": "tempestade com chuva fraca",
    "thunderstorm with rain": "tempestade com chuva",
    "thunderstorm with heavy rain": "tempestade com chuva forte",
    "light thunderstorm": "trovoada fraca",
    "thunderstorm": "trovoada",
    "heavy thunderstorm": "trovoada forte",
    "ragged thunderstorm": "trovoada irregular",
    "thunderstorm with light drizzle": "tempestade com garoa fraca",
    "thunderstorm with drizzle": "tempestade com garoa",
    "thunderstorm with heavy drizzle": "tempestade com garoa forte",
    "light intensity drizzle": "garoa fraca",
    "drizzle": "garoa",
    "heavy intensity drizzle": "garoa forte",
    "light intensity drizzle rain": "chuva com garoa fraca",
    "drizzle rain": "chuva com garoa",
    "heavy intensity drizzle rain": "chuva com garoa forte",
    "shower rain and drizzle": "chuva com garoa forte e fraca",
    "heavy shower rain and drizzle": "chuva forte com garoa",
    "shower drizzle": "chuva fraca com garoa",
    "light rain": "chuva fraca",
    "moderate rain": "chuva moderada",
    "heavy intensity rain": "chuva forte",
    "very heavy rain": "chuva muito forte",
    "extreme rain": "chuva extrema",
    "freezing rain": "chuva congelante",
    "light intensity shower rain": "chuva fraca com pancadas",
    "shower rain": "pancadas de chuva",
    "heavy intensity shower rain": "chuva forte com pancadas",
    "ragged shower rain": "chuva forte e irregular",
    "light snow": "neve fraca",
    "snow": "neve",
    "heavy snow": "nevasca",
    "sleet": "chuva com neve",
    "light shower sleet": "chuva fraca com neve",
    "shower sleet": "chuva com neve",
    "light rain and snow": "chuva fraca com neve",
    "rain and snow": "chuva com neve",
    "light shower snow": "neve fraca",
    "shower snow": "neve",
    "heavy shower snow": "neve forte",
    "mist": "névoa",
    "smoke": "fumaça",
    "haze": "neblina",
    "sand/dust whirls": "redemoinhos de poeira",
    "fog": "nevoeiro",
    "sand": "areia",
    "dust": "poeira",
    "volcanic ash": "cinza vulcânica",
    "squalls": "rajadas",
    "tornado": "tornado",
    "clear sky": "céu limpo",
    "few clouds": "poucas nuvens",
    "scattered clouds": "nuvens dispersas",
    "broken clouds": "nuvens quebradas",
    "overcast clouds": "nuvens nubladas"
  };

  return descriptionMap[description] || "";
};