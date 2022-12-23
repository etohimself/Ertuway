import { useState, useContext, useEffect } from "react";
import styles from "../styles/LoginPage.module.css";
import Button from "../components/Button";

function LoginPage(props) {
  return (
    <div className={styles.LoginContainer}>
      <div className={styles.LoginTitle}>
        Welcome to <span>Ertuway,</span>
      </div>
      <p>
        This is a demo application. Therefore, you can sign in with the demo
        account and test the features.
      </p>
      <label for="username">Email : </label>
      <input type="text" id="username" value="testaccount@gmail.com"></input>
      <label for="username">Password : </label>
      <input type="password" id="username" value="123456789abcdefg"></input>
      <div className={styles.forgetText}>Forgot your password?</div>
      <Button className={styles.loginButton}>Sign In</Button>
    </div>
  );
}

export default LoginPage;
