import React, { useContext } from "react";
import classes from "./Welcome.module.css";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import AuthContext from "../../store/auth-context";

const Welcome = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className={classes["welcome-wrapper"]}>
      <div className={classes["welcome-main"]}>
        <h2>
          Welcome to <span>My Classroom</span>
        </h2>
        <div className={classes["welcome-text"]}>
          <p>
            A community of lifelong learners, responsible global citizens, and
            champions of our own success.
          </p>
        </div>

        <div className={classes.auth}>
          <button className={classes["google-signin"]}>
            Sign in with Google
          </button>
          OR
          <div className={classes["manual-auth"]}>
            {authContext.authMethod === "login" ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
