import React from "react";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div style={{ height: "100%" }}>
      <MainNavigation />
      <main>{props.children}</main>
    </div>
  );
};

export default Layout;
