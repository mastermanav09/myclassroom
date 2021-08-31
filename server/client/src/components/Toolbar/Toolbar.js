import React, { useContext, useState } from "react";
import DrawerToggleButton from "../Layout/DrawerToggleButton/DrawerToggleButton";
import classes from "./Toolbar.module.css";
import AuthContext from "../../store/auth-context";
import UIContext from "../../store/ui-context";

const Toolbar = (props) => {
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);

  const navItems = [
    { id: "myclassroom", text: "My Classes" },
    {
      id: "joinclass",
      text: `${authContext.userAuth ? "Create Class" : "Join Class"}`,
    },
  ];

  const showDashboard = (index) => {
    if (index === 0) {
      uiContext.toggleShowClasses(true);
      uiContext.setShowCurriculum(false);
    } else {
      uiContext.toggleShowClasses(false);
    }
  };

  const [activeCat, setActiveCat] = useState({
    activeIndex: 0,
  });

  const toggleActiveStyles = (index) => {
    if (index === activeCat.activeIndex) {
      return classes.active;
    } else {
      return classes.inactive;
    }
  };

  const toggleActive = (index) => {
    setActiveCat({
      activeIndex: index,
    });
  };

  let showNavItems = navItems.map((item, index) => (
    <div
      key={item.id}
      className={toggleActiveStyles(index)}
      onClick={() => {
        toggleActive(index);
        showDashboard(index);
      }}
    >
      {item.text}
    </div>
  ));

  if (!(authContext.token && authContext.userId)) {
    showNavItems = <></>;
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
    <header className={classes.toolbar}>
      <nav className={classes["toolbar__navigation"]}>
        <div className={classes["toolbar__toggle-button"]}>
          <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className={classes["toolbar__logo"]}>My Classroom</div>
        <div className={classes.spacer} />
        <div className={classes["user-actions"]}>{showNavItems}</div>
        {authContext.userAuth ? (
          <div className={classes["google-meet"]}>
            <a href="https://meet.google.com/" target="_blank" rel="noreferrer">
              Create for a video link
            </a>
          </div>
        ) : (
          <></>
        )}
        <div className={classes["toolbar_navigation-items"]}>
          <ul>
            {authContext.token && authContext.userId ? (
              <li onClick={logoutHandler}>Logout</li>
            ) : (
              <>
                <li onClick={() => authContext.setAuthMethod("signup")}>
                  Signup
                </li>
                <li onClick={() => authContext.setAuthMethod("login")}>
                  Login
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
