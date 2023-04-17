import { api } from "@/config/api";
import { WheatherInfo } from "@/config/interface";
import React from "react";

export const searchChosenCity = async (city: string) => {
  let result: WheatherInfo | undefined;

  await api.get(`/weather?q=${city}&appid=c1262e9e90831494dc09c7980e35dd7e`)
    .then((response) => {
      result = response.data;
    })
    .catch((err) => {
      console.error("ops! ocorreu um erro : " + err);
    });

  console.log(result);

  return result;
};