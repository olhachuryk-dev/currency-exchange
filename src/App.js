import CurrencyConverter from "./components/CurrencyConverter";
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

export const CURRENCY_BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/";

function App() {
  const [lightMode, setLightMode] = useState(localStorage.getItem("light_theme")==="true");
  const lightModeIcon = lightMode ? "icon-moon.svg" : "icon-sun.svg";
  const onClickThemeHandler = () => {
    localStorage.setItem("light_theme", !lightMode);
    setLightMode((mode) => !mode);
  };
  return (
    <div
      className={`app_container ${lightMode ? "theme_light" : "theme_dark"}`}
    >
      <Header />
      <main className="main_container">
        <div className="main_header">
          <h1>CONVERT</h1>
          <img
            src={`./assets/images/${lightModeIcon}`}
            alt="light-mode"
            onClick={onClickThemeHandler}
          />
        </div>
        <CurrencyConverter />
      </main>
      <footer className="app_footer">By Olha Churyk</footer>
    </div>
  );
}

export default App;
