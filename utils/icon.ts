export const SearchIcon = (icon: string) => {
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