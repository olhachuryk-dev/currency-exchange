import { useEffect, useState } from "react";
import { CURRENCY_BASE_URL } from "../App";

const useFetchBasicExchangeRates = () => {
  const [basicExchangeRates, setBasicExchangeRates] = useState({});
  const [responseStage, setResponseStage] = useState({
    loading: true,
    error: null,
  });

  useEffect(() => {
    const currencyAsBase = "uah";
    const basicExchangeCurrencies = ["eur", "usd"];

    for (const currency of basicExchangeCurrencies) {
      fetch(`${CURRENCY_BASE_URL}${currency}/uah.json`)
        .then((res) => {
          if (res.status >= 400) {
            throw new Error("Server responds with error!");
          }
          return res.json();
        })
        .then((data) => {
          setBasicExchangeRates((prevState) => {
            return { ...prevState, [currency]: data[currencyAsBase] };
          });
          setResponseStage((stage) => {
            return { ...stage, loading: false };
          });
        })
        .catch((e) => {
          setResponseStage({ loading: false, error: e });
        });
    }
  }, []);

  return { basicExchangeRates, responseStage };
};

export default useFetchBasicExchangeRates;
