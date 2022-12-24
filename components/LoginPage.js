import { useState, useContext, useEffect } from "react";
import styles from "../styles/LoginPage.module.css";
import Button from "../components/Button";
import SpinIcon from "../components/Icons/SpinIcon";
import { useRouter } from "next/router";
import isAuthenticated from "../helpers/isAuthenticated";
import Cookies from "js-cookie";

function LoginPage(props) {
  const [sessionFetched, setSessionFetched] = useState(0);
  const [loggedUser, setLoggedUser] = useState();

  const defaultUsername = "testaccount@gmail.com";
  const defaultPassword = "123456abc";
  const [username, setUsername] = useState(defaultUsername);
  const [password, setPassword] = useState(defaultPassword);
  const [flashMsg, setFlashMsg] = useState({
    status: "",
    message: "",
  });

  const [loginStatus, setLoginStatus] = useState(0); // idle = 0, logging in = 1, redirecting = 2
  const router = useRouter();

  const handleSignIn = async () => {
    setLoginStatus(1);
    setTimeout(async function () {
      let apiAddress = `${location.protocol}//${location.hostname}:27469/?action=login&username=${username}&password=${password}`;
      try {
        const res = await fetch(apiAddress);
        const data = await res.json();
        if (data.status == "BAD_CREDENTIALS") {
          setFlashMsg({
            status: "error",
            message: "Username or password is wrong.",
          });
          setUsername(defaultUsername);
          setPassword(defaultPassword);
          setLoginStatus(0);
        } else if (data.status == "LOGIN_SUCCESFUL") {
          Cookies.set("session-token", data.token && data.token);
          setFlashMsg({
            status: "success",
            message: "Login succesful, redirecting..",
          });
          setLoginStatus(2);
          setTimeout(() => {
            router.back();
          }, 500);
        }
      } catch (err) {
        setFlashMsg({
          status: "error",
          message: "Something went wrong..",
        });
        console.log(err);
        setLoginStatus(0);
      }
    }, 1000);
  };

  useEffect(() => {
    const getSession = async () => {
      let user = await isAuthenticated();
      setLoggedUser(user); //returns 0 if not authenticated
      setSessionFetched(1);
    };
    getSession();
  }, []);

  if (sessionFetched && !loggedUser) {
    return (
      <div className={styles.LoginContainer}>
        <div className={styles.LoginTitle}>
          Welcome to <span>Ertuway,</span>
        </div>
        <p>
          This is a demo application. Therefore, you can sign in with the demo
          account and test the features.
        </p>
        <div
          className={`
        ${styles.flashMsg}
        ${flashMsg.message.length && styles.visible}
        ${flashMsg.status == "error" && styles.error}
        ${flashMsg.status == "success" && styles.success}
        `}
        >
          {flashMsg.message}
        </div>
        <label htmlFor="username">Email : </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label htmlFor="username">Password : </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <div className={styles.forgetText}>Forgot your password?</div>
        <Button
          className={`${styles.loginButton} ${
            loginStatus > 0 ? styles.running : ""
          }`}
          onClick={handleSignIn}
        >
          {loginStatus > 0 ? <SpinIcon className={styles.spinner} /> : ""}
          {loginStatus == 1
            ? `Signing in..`
            : loginStatus == 2
            ? "Redirecting.."
            : "Sign In"}
        </Button>
      </div>
    );
  } else if (sessionFetched && loggedUser) {
    router.push("/"); //Already logged in, redirect
    return (
      <div className={styles.fetchLoading}>
        <SpinIcon className={styles.spinner2} />
        <span>Redirecting..</span>
      </div>
    );
  } else {
    //Checking for authentication
    return (
      <div className={styles.fetchLoading}>
        <SpinIcon className={styles.spinner2} />
        <span>Authenticating..</span>
      </div>
    );
  }
}
export default LoginPage;
