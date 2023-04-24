import { WheatherInfo } from "@/config/interface";
import React from "react";
import { classicNameResolver } from "typescript";

interface ValueContextInfo {
  cities: string[];
  saveCity: (city: string) => void;
  removeCity: (city: string) => void;
  wheather: WheatherInfo | undefined;
  setWheather: React.Dispatch<React.SetStateAction<WheatherInfo | undefined>>;
}

interface ValueProviderProps {
  children: React.ReactElement;
}

export const ValueContext = React.createContext({} as ValueContextInfo);

export function ValueProvider({ children }: ValueProviderProps) {
  const [wheather, setWheather] = React.useState<WheatherInfo | undefined>();
  const [ cities, setCities ] = React.useState<string[]>([
    "São Paulo",
    "New York",
    "Tokyo",
    "Alaska",
    "Italy",
    "Roma",
    "Australia",
    "Rio de Janeiro",
    "El Salvador",
    "Paris",
  ]);

  const saveCity = (city: string) => {
    if(!cities.includes(city)) {
      const result = [...cities];
      if(result.length > 9) {
        result.shift();
      }
      result.push(city);
      setCities(result);
    }
  };

  const removeCity = (city: string) => {
    if(cities.includes(city)) {
      const result = cities.filter(element => element !== city);
      console.log(result);
      setCities(result);
    }
  };

  return (
    <ValueContext.Provider value={{ cities, saveCity, removeCity, wheather, setWheather }}>
      {children}
    </ValueContext.Provider>
  );
}