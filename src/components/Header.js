import React from "react";
import useFetchBasicExchangeRates from "../hooks/useFetchBasicExchangeRates";
import Loading from "./Loading";
import styles from "./Header.module.css";
import ErrorMessage from "./ErrorMessage";

const Header = () => {
  const { basicExchangeRates, responseStage } = useFetchBasicExchangeRates();

  return (
    <header className={styles.header}>
      {responseStage.error ? (
        <ErrorMessage errorMessage= {responseStage.error.message} />
      ) : (
        <>
          <div className={styles.container}>
            <img
              src="https://img.icons8.com/color/48/null/usa.png"
              alt="usa.png"
              className={styles.flag}
            />
            <span className={styles.currency}>USD</span>
            {responseStage.loading ? (
              <Loading />
            ) : (
              <span className={styles.amount}>{basicExchangeRates["usd"]}</span>
            )}
          </div>
          <div className={styles.container}>
            <img
              src="https://img.icons8.com/color/48/null/flag-of-europe.png"
              alt="europe.png"
              className={styles.flag}
            />
            <span className={styles.currency}>EUR</span>
            {responseStage.loading ? (
              <Loading />
            ) : (
              <span className={styles.amount}>{basicExchangeRates["eur"]}</span>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
