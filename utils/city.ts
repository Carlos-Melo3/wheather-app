import { api } from "@/config/api";
import { WheatherInfo } from "@/config/interface";

export const searchChosenCity = async (city: string) => {
  let result: WheatherInfo | undefined;

  await api
    .get(`/weather?q=${city}`)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro : " + err);
    });

  return result;
};
