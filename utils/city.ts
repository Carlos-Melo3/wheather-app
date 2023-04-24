import { api } from "@/config/api";
import { WheatherInfo } from "@/config/interface";

export const searchChosenCity = async (city: string) => {
  const apiKey = process.env.API_KEY;
  
  let result: WheatherInfo | undefined;

  await api
    .get(`/weather?q=${city}&appid=${apiKey}`)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro : " + err);
    });

  return result;
};
