import React from "react";
import styles from "./CurrencyInput.module.css";

const CurrencyInput = ({
  amount,
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  onChangeAmount,
  setIsBaseCurrency,
}) => {
  const onChangeAmountHandler = (event) => {
    const eneteredValue = event.target.value;
    if (eneteredValue === "" && amount < 10) {
      onChangeAmount(0);
      setIsBaseCurrency();
      return;
    }

    const regexDecimalOnly = new RegExp(/^[0-9]+\.?([0-9]+)?$/);
    if (!regexDecimalOnly.test(eneteredValue)) return;

    if (eneteredValue[eneteredValue.length - 1] === ".") {
      onChangeAmount(eneteredValue); // precending zero is allowed in case decimal is < 1
    } else {
      onChangeAmount(eneteredValue - 0); // to remove precending zero
    }
    setIsBaseCurrency();
  };
  const onChangeCurrencyHandler = (event) =>
    onChangeCurrency(event.target.value);
  return (
    <div className={styles.container}>
      <input
        type="text"
        inputMode="numeric"
        value={amount}
        onChange={onChangeAmountHandler}
        min="0"
        className={styles.input}
      ></input>
      <select
        value={selectedCurrency}
        onChange={onChangeCurrencyHandler}
        className={styles.select}
      >
        {currencyOptions.map((currency) => (
          <option key={currency} value={currency}>
            {currency.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyInput;
