import { WheatherInfo } from "@/config/interface";
import React from "react";

interface ValueContextInfo {
  cities: string[];
  saveCity: (city: string) => void;
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
    "Belo Horizonte",
    "Boa Vista",
    "Brasília",
    "Curitiba",
    "Florianópolis",
    "Fortaleza",
    "Manaus",
    "Rio de Janeiro",
    "Salvador",
    "São Paulo",
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

  return (
    <ValueContext.Provider value={{ cities, saveCity, wheather, setWheather }}>
      {children}
    </ValueContext.Provider>
  );
}