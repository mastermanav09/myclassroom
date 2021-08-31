import React, { useContext } from "react";
import classes from "./ClassHandler.module.css";
import JoinClass from "./JoinClass";
import AuthContext from "../../store/auth-context";
import CreateClass from "../Class/CreateClass";

const ClassHandler = () => {
  const authContext = useContext(AuthContext);

  return (
    <div className={classes["main"]}>
      <div className={classes["your_class-heading"]}>
        {authContext.userAuth ? <h2>Create Class</h2> : <h2>Join Class</h2>}
        <hr />
      </div>

      {authContext.userAuth ? <CreateClass /> : <JoinClass />}
    </div>
  );
};

export default ClassHandler;
