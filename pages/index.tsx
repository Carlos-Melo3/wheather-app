import MetricsCard from "@/components/MetricsCard";
import TextField from "@/components/TextField";
import { WheatherInfo } from "@/config/interface";
import { searchChosenCity } from "@/utils/city";
import {
  getDescriptionPortuguese,
  getSearchIcon,
  getSunriseAndSunset,
  getWeekAndTime,
  getWindDirection,
} from "@/utils/functions";
import { KelvinToCelsius } from "@/utils/format";
import React from "react";
import Header from "@/components/Header";
import { WeatherStatus } from "@/config/status";

export default function Home() {
  const [wheather, setWheather] = React.useState<WheatherInfo>();
  const date = getWeekAndTime();
  const [city, setCity] = React.useState("");
  const [status, setStatus] = React.useState(WeatherStatus.SUCCESS);
  const dropdown = [
    "Brasilia",
    "São Paulo",
    "Fortaleza",
    "Recife",
  ];

  const onChangeCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const onKeyEnterCity = async (event: any) => {
    if(event.keyCode === 13) {
      setStatus(WeatherStatus.LOADING);
      const result = await searchChosenCity(city);
      if(result !== undefined) {
        setWheather(result);
        setStatus(WeatherStatus.SUCCESS);
        setCity("");
      }
      else {
        setStatus(WeatherStatus.ERROR);
      }
    }
  };

  const onClickCityEmpty = () => {
    setStatus(WeatherStatus.SUCCESS);
    setCity("");
    setWheather(undefined);
  };

  const handleElementClick = async (element: string) => {
    console.log(element);
    setStatus(WeatherStatus.LOADING);
    const result = await searchChosenCity(element);
    if(result !== undefined) {
      setWheather(result);
      setStatus(WeatherStatus.SUCCESS);
      setCity("");
    }
    else {
      setStatus(WeatherStatus.ERROR);
    }
  };

  if(status === WeatherStatus.SUCCESS) {
    if(wheather) {
      const celsius = KelvinToCelsius(wheather.main.temp);
      const feelsLike = KelvinToCelsius(wheather.main.feels_like);
      const windDirection = getWindDirection(wheather.wind.deg);
      const sunriseTime = getSunriseAndSunset(
        wheather.sys.sunrise,
        wheather.sys.sunset,
        wheather.coord.lon
      )[0];
      const sunsetTime = getSunriseAndSunset(
        wheather.sys.sunrise,
        wheather.sys.sunset,
        wheather.coord.lon
      )[1];
      const climate = getSearchIcon(wheather.weather[0].icon);
      const description = getDescriptionPortuguese(wheather.weather[0].description);

      return (
        <>
          <Header
            placeholder="Pesquisar a cidade..."
            value={city}
            onChange={onChangeCityInput}
            onKeyDown={onKeyEnterCity}
            onClick={onClickCityEmpty}
            elements={dropdown}
            onElement={handleElementClick}
          />
          <div className="container">
            <div className="main-card">
              <h1>
                {wheather.name}, {wheather.sys.country}
              </h1>
              <p className="description">{description}</p>
              <div className="img-card">
                <div className="content-img">
                  <img className="wheather-icon" src={climate} />
                </div>
              </div>
              <h1 className="temperature">{celsius}°C</h1>
              <p>Sensação térmica {feelsLike}°C</p>
            </div>
            <div className="content-box">
              <div className="metrics-box">
                <MetricsCard
                  name="Umidade do ar"
                  value={wheather.main.humidity}
                  metric="%"
                  img="/img/humidity.png"
                />
                <MetricsCard
                  name="Velocidade do vento"
                  value={wheather.wind.speed}
                  metric="m/s"
                  img="/img/wind.png"
                />
                <MetricsCard
                  name="Direção do vento"
                  value={windDirection}
                  img="/img/compass.png"
                />
                <MetricsCard
                  name="Visibilidade"
                  value={(wheather.visibility / 1000).toFixed(1)}
                  metric="Km"
                  img="/img/binocular.png"
                />
                <MetricsCard
                  name="Nascer do sol"
                  value={sunriseTime}
                  metric="AM"
                  img="/img/sunrise.png"
                />
                <MetricsCard
                  name="Pôr do sol"
                  value={sunsetTime}
                  metric="PM"
                  img="/img/sunset.png"
                />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <Header
            placeholder="Pesquisar a cidade..."
            value={city}
            onChange={onChangeCityInput}
            onKeyDown={onKeyEnterCity}
            onClick={onClickCityEmpty}
            elements={dropdown}
            onElement={handleElementClick}
          />
        </>
      );
    }
  } else {
    if(status === WeatherStatus.LOADING) {
      return (
        <>
          <div className="screen">
            <h1 className="screen-message">Carregando...</h1>
          </div>
        </>
      );
    }
    else {
      <>
        <div className="screen">
          <h1 className="screen-message">
            Cidade não encontrada, tente novamente!
          </h1>
          <TextField
            placeholder="Pesquisar a cidade..."
            value={city}
            onChange={onChangeCityInput}
            onKeyDown={onKeyEnterCity}
          />
        </div>
      </>
    }
  }
}
