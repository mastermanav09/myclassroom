import React, { useState } from "react";
import Toolbar from "../Toolbar/Toolbar";
import SideDrawer from "./SideDrawer/SideDrawer";
import Backdrop from "../Backdrop/Backdrop";

const MainNavigation = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen((prev) => !prev);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };

  let backdrop;

  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }

  return (
    <>
      <Toolbar drawerClickHandler={drawerToggleClickHandler} />
      <SideDrawer show={sideDrawerOpen} setSideDrawerOpen={setSideDrawerOpen} />
      {backdrop}
    </>
  );
};

export default MainNavigation;
