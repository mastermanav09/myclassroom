import axios from "axios";
import { useRef, useState, useContext } from "react";
import "./Signup.module.css";
import classes from "./Signup.module.css";
import ToggleSwitch from "./ToggleSwitch";
import AuthContext from "../../store/auth-context";

export default function Signup() {
  const authContext = useContext(AuthContext);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [toggleSwitchValue, setToggleSwitchValue] = useState(null);
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const toggleSwitchValueHandler = (value) => {
    setToggleSwitchValue(value);
  };

  const focusHandler = () => {
    setError(null);
  };

  const submitSignupData = async (e) => {
    e.preventDefault();

    setError(null);
    const newUser = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    let submitUrl = "/create-student";

    if (toggleSwitchValue) {
      submitUrl = "/create-teacher";
    }

    try {
      const res = await axios.put(submitUrl, newUser);
      console.log(res);

      if (res.status !== 201) {
        throw new Error("Creating an account failed! Please try again.");
      }

      authContext.setIsLoggedin(true);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
      authContext.setIsLoggedin(false);
    }

    usernameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  return (
    <section className={classes.signupPage}>
      <form
        className={classes["auth-in"]}
        onFocus={focusHandler}
        onSubmit={submitSignupData}
        noValidate
      >
        <h1 className={classes["title"]}>
          <b>Signup</b>
        </h1>

        <div className={classes["form-control"]}>
          <div className={classes["form-group"]}>
            <label htmlFor="auth-username"></label>
            <input
              type="username"
              placeholder="Username"
              className={classes["auth-username"]}
              ref={usernameRef}
            />

            <label htmlFor="auth-email"></label>
            <input
              type="email"
              placeholder="Email"
              className={classes["auth-email"]}
              ref={emailRef}
            />
          </div>

          <label htmlFor="auth-password"></label>
          <input
            type="password"
            placeholder="Password"
            className={classes["auth-password"]}
            ref={passwordRef}
          />
        </div>

        <div className={classes["toggle-switch"]}>
          <span> Authenticate as a Teacher ?</span>
          <pre> </pre> No{" "}
          <ToggleSwitch toggleSwitchValueHandler={toggleSwitchValueHandler} />{" "}
          Yes
        </div>

        <button type="submit" className={classes.signupSubmitBtn}>
          <b>signup</b>
        </button>
        <div>
          {success && (
            <span className={classes.success}>
              Successfull. You can login now!
            </span>
          )}
          {error && (
            <span className={classes.failure}>
              Either user exists or incorrect details! Your password should be 8
              characters long!
            </span>
          )}
        </div>
      </form>
    </section>
  );
}
