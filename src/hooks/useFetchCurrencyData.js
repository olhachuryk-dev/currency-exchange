import { useEffect, useState } from "react";
import { CURRENCY_BASE_URL } from "../App";

const useFetchCurrencyData = () => {
  const [currencyFrom, setCurrencyFrom] = useState("uah");
  const [currencyTo, setCurrencyTo] = useState("");
  const [currecyData, setCurrencyData] = useState({});
  const [responseStage, setResponseStage] = useState({
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetch(`${CURRENCY_BASE_URL}${currencyFrom}.json`)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("Server responds with error!");
        }
        return res.json();
      })
      .then((data) => {
        const currencyList = Object.keys(data[currencyFrom]);
        setCurrencyData(data[currencyFrom]);
        setCurrencyTo((prevState) => {
          if (prevState === "") {
            return currencyList[0];
          } else {
            return prevState;
          }
        });
        setResponseStage((stage) => {
          return { ...stage, loading: false };
        });
      })
      .catch((e) => {
        setResponseStage({ loading: false, error: e });
      });
  }, [currencyFrom]);
  return {
    currencyFrom,
    setCurrencyFrom,
    currecyData,
    currencyTo,
    setCurrencyTo,
    responseStage,
  };
};

export default useFetchCurrencyData;
