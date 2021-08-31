import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import classes from "./Login.module.css";
import AuthContext from "../../store/auth-context";
import UIContext from "../../store/ui-context";

export default function Login() {
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  const focusHandler = () => {
    setError(null);
  };

  const submitLoginData = async (e) => {
    e.preventDefault();
    setError(null);

    const newUser = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    let submitUrl = "/login";

    try {
      const res = await axios.post(submitUrl, newUser);

      if (res.status !== 200) {
        throw new Error("Login Failed!");
      }

      authContext.setIsLoggedin(true);

      setSuccess(true);

      authContext.setUserAuth(res.data.userAuth);

      authContext.setToken(res.data.token);
      authContext.setUserId(res.data.userId);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      localStorage.setItem("userAuth",res.data.userAuth)

      // uiContext.toggleShowClasses(true);
    } catch (err) {
      setError(err.message);
      authContext.setIsLoggedin(false);
    }
  };

  return (
    <section className={classes.loginpage}>
      <form
        className={classes["auth-in"]}
        onFocus={focusHandler}
        onSubmit={submitLoginData}
        noValidate
      >
        <h1 className={classes["title"]}>
          <b>Login</b>
        </h1>

        <div className={classes["form-control"]}>
          <label htmlFor="auth-email"></label>
          <input
            type="email"
            placeholder="Email"
            className={classes["auth-email"]}
            ref={emailRef}
          />
          <label htmlFor="auth-password"></label>
          <input
            type="password"
            placeholder="Password"
            className={classes["auth-password"]}
            ref={passwordRef}
          />
        </div>

        <button type="submit" className={classes.loginSubmitBtn}>
          <b>login</b>
        </button>

        {/* {error && <span className={classes.failure}>User not found!</span>} */}
      </form>
    </section>
  );
}
