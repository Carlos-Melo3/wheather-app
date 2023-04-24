import MetricsCard from "@/components/MetricsCard";
import TextField from "@/components/TextField";
import { WheatherInfo } from "@/config/interface";
import { searchChosenCity } from "@/utils/city";
import {
  getDescriptionPortuguese,
  getSearchIcon,
  getTime,
  getWeekDayAndTime,
  getWindDirection,
} from "@/utils/functions";
import { KelvinToCelsius } from "@/utils/format";
import React from "react";
import Header from "@/components/Header";
import { WeatherStatus } from "@/config/status";
import { ValueContext } from "@/context/value";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

export default function Home() {
  const [city, setCity] = React.useState("");
  const [status, setStatus] = React.useState(WeatherStatus.SUCCESS);
  const { cities, saveCity, removeCity, wheather, setWheather } =
    React.useContext(ValueContext);

  const onChangeCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const onKeyEnterCity = async (event: any) => {
    if (city !== "") {
      if (event.keyCode === 13) {
        setStatus(WeatherStatus.LOADING);
        const result = await searchChosenCity(city);
        if (result !== undefined) {
          setWheather(result);
          setStatus(WeatherStatus.SUCCESS);
          setCity("");
        } else {
          setStatus(WeatherStatus.ERROR);
        }
      }
    }
  };

  const onClickCityEmpty = () => {
    setStatus(WeatherStatus.SUCCESS);
    setCity("");
    setWheather(undefined);
  };

  const handleElementClick = async (element: string) => {
    setStatus(WeatherStatus.LOADING);
    const result = await searchChosenCity(element);
    if (result !== undefined) {
      setWheather(result);
      setStatus(WeatherStatus.SUCCESS);
      setCity("");
    } else {
      setStatus(WeatherStatus.ERROR);
    }
  };

  const onClickAddCityButton = () => {
    if (wheather) {
      saveCity(wheather.name);
    }
  };

  const onClickSearchButton = async () => {
    if (city !== "") {
      setStatus(WeatherStatus.LOADING);
      const result = await searchChosenCity(city);
      if (result !== undefined) {
        setWheather(result);
        setStatus(WeatherStatus.SUCCESS);
        setCity("");
      } else {
        setStatus(WeatherStatus.ERROR);
      }
    }
  };

  if (status === WeatherStatus.SUCCESS) {
    if (wheather) {
      const celsius = KelvinToCelsius(wheather.main.temp);
      const feelsLike = KelvinToCelsius(wheather.main.feels_like);
      const windDirection = getWindDirection(wheather.wind.deg);
      const sunriseTime = getTime(wheather.sys.sunrise, wheather.timezone);
      const sunsetTime = getTime(wheather.sys.sunset, wheather.timezone);
      const climate = getSearchIcon(wheather.weather[0].icon);
      const description = getDescriptionPortuguese(
        wheather.weather[0].description
      );
      const date = getWeekDayAndTime(wheather.timezone);

      return (
        <>
          <Header
            placeholder="Pesquisar a cidade..."
            value={city}
            onChange={onChangeCityInput}
            onKeyDown={onKeyEnterCity}
            onHome={onClickCityEmpty}
            elements={cities}
            onElement={handleElementClick}
            onClick={onClickSearchButton}
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
              <div className="details">
                <div className="dayAndTime">
                  <h2 className="date">
                    {date}
                  </h2>
                </div>
                <Button
                  disabled={!cities.includes(wheather.name) ? false : true}
                  onClick={onClickAddCityButton}
                  name="Salvar"
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
            onHome={onClickCityEmpty}
            elements={cities}
            onElement={handleElementClick}
            onClick={onClickSearchButton}
          />
        </>
      );
    }
  } else {
    if (status === WeatherStatus.LOADING) {
      return (
        <>
          <Loading/>
        </>
      );
    } else {
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
      </>;
    }
  }
}
