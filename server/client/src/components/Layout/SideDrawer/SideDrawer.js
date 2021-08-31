import React, { useContext } from "react";
import AuthContext from "../../../store/auth-context";
import classes from "./SideDrawer.module.css";
import UIContext from "../../../store/ui-context";

const SideDrawer = (props) => {
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);
  let drawerClasses = classes["side-drawer"];

  if (props.show) {
    drawerClasses = `${classes["side-drawer"]} ${classes.open}`;
  }

  const logoutHandler = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    authContext.setToken(null);
    authContext.setUserId(null);
    authContext.setUserAuth(null);
    authContext.setIsLoggedin(false);
  };

  return (
    <nav className={drawerClasses}>
      <ul>
        {!authContext.isLoggedin ? (
          <>
            <li
              onClick={() => {
                authContext.setAuthMethod("signup");
                props.setSideDrawerOpen();
              }}
            >
              Signup
            </li>
            <li
              onClick={() => {
                authContext.setAuthMethod("login");
                props.setSideDrawerOpen();
              }}
            >
              Login
            </li>
          </>
        ) : (
          <li onClick={logoutHandler}>Logout</li>
        )}
      </ul>

      <div className={classes["user-actions"]}>
        <div
          onClick={() => {
            props.setSideDrawerOpen();
            uiContext.toggleShowClasses(true);
            uiContext.setShowCurriculum(false);
          }}
        >
          My Classes
        </div>

        <div
          onClick={() => {
            props.setSideDrawerOpen();
            uiContext.toggleShowClasses(false);
          }}
        >
          {authContext.userAuth ? "Create Class" : "Join Class"}
        </div>

        {authContext.userAuth ? (
          <div className={classes["google-meet"]}>
            <a href="https://meet.google.com/" target="_blank" rel="noreferrer">
              Create for a video link
            </a>
          </div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default SideDrawer;
