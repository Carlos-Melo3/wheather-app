import Header from "@/components/Header";
import MetricsCard from "@/components/MetricsCard";
import TextField from "@/components/TextField";
import { WheatherInfo } from "@/config/interface";
import { searchChosenCity } from "@/utils/city";
import {
  getSearchIcon,
  getSunriseAndSunset,
  getWeekAndTime,
  getWindDirection,
} from "@/utils/functions";
import { KelvinToCelsius } from "@/utils/format";
import React from "react";

export default function Home() {
  const [wheather, setWheather] = React.useState<WheatherInfo>();
  const date = getWeekAndTime();
  const [city, setCity] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    startingCity();
  }, []);

  const startingCity = async () => {
    const result = searchChosenCity("São Paulo");
    if (result) {
      setWheather(await result);
      setLoading(true);
    }
  };

  const onChangeCityInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const onKeyEnterCity = async (event: any) => {
    if (event.keyCode === 13) {
      const result = searchChosenCity(city);
      if (result !== undefined) {
        setWheather(await result);
        setCity("");
      }
    }
  };

  if (wheather) {
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

    return (
      <>
        <div className="container">
          <div className="main-card">
            <h1>
              {wheather.name}, {wheather.sys.country}
            </h1>
            <p>{wheather.weather[0].description}</p>
            <div className="img-card">
              <div className="content-img">
                <img className="wheather-icon" src={climate} />
              </div>
            </div>
            <h1 className="temperature">{celsius}°C</h1>
            <p>Sensação térmica {feelsLike}°C</p>
          </div>
          <div className="content-box">
            <Header
              date={date}
              placeholder="Pesquisar a cidade..."
              value={city}
              onChange={onChangeCityInput}
              onKeyDown={onKeyEnterCity}
            />
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
    if (!loading) {
      return (
        <>
          <div className="screen">
            <h1 className="screen-message">Carregando...</h1>
          </div>
        </>
      );
    } else {
      return (
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
      );
    }
  }
}
