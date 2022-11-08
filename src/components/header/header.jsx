import React from "react";
import logo from "../../images/logo.png";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header>
      <div className={styles["header__wrapper"]}>
        <img src={logo} alt="logo" />
      </div>
    </header>
  );
};

export default Header;
