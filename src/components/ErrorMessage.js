import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ errorMessage }) => {
  return <div className={styles.error}>{errorMessage}</div>;
};

export default ErrorMessage;
