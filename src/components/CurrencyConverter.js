import React, { useEffect, useMemo, useState } from "react";
import useFetchCurrencyData from "../hooks/useFetchCurrencyData";
import CurrencyInput from "./CurrencyInput";
import styles from "./CurrencyConverter.module.css";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const CurrencyConverter = () => {
  const [convertAmount, setConvertAmount] = useState(1);
  const [isConvertFromCurrency, setIsConvertFromCurrency] = useState(true);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const {
    currecyData,
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    responseStage,
  } = useFetchCurrencyData();

  const currencyOptions = useMemo(
    () => Object.keys(currecyData),
    [currecyData]
  );

  function onClickCurrencySwapHandler() {
    const fromCurrency = currencyFrom;
    setCurrencyFrom(currencyTo);
    setCurrencyTo(fromCurrency);
  }

  useEffect(() => {
    if (Object.keys(currecyData).length > 0) {
      if (isConvertFromCurrency) {
        setConvertedAmount(convertAmount * currecyData[currencyTo]);
      } else {
        setConvertedAmount(convertAmount / currecyData[currencyTo]);
      }
    }
  }, [convertAmount, currencyTo, isConvertFromCurrency, currecyData]);
  return (
    <div className={styles.container}>
      {responseStage.error ? (
        <ErrorMessage errorMessage={responseStage.error.message} />
      ) : (
        <>
          <CurrencyInput
            currencyOptions={currencyOptions}
            selectedCurrency={currencyFrom}
            onChangeAmount={setConvertAmount}
            onChangeCurrency={setCurrencyFrom}
            setIsBaseCurrency={() => setIsConvertFromCurrency(true)}
            amount={!isConvertFromCurrency ? convertedAmount : convertAmount}
          />
          <div className={styles.exchange_icon_container}>
          {responseStage.loading ? <Loading /> : null}
            <span
              className={`material-symbols-outlined ${styles.exchange_icon}`}
              onClick={onClickCurrencySwapHandler}
            >
              currency_exchange
            </span>
          </div>
          <CurrencyInput
            currencyOptions={currencyOptions}
            selectedCurrency={currencyTo}
            onChangeAmount={setConvertAmount}
            onChangeCurrency={setCurrencyTo}
            setIsBaseCurrency={() => setIsConvertFromCurrency(false)}
            amount={isConvertFromCurrency ? convertedAmount : convertAmount}
          />
        </>
      )}
    </div>
  );
};

export default CurrencyConverter;
