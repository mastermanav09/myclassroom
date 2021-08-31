import React, { useState, useContext } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Welcome from "./components/Welcome/Welcome";
import AllClasses from "./components/Class/AllClasses";
import ClassHandler from "./components/Class/ClassHandler";
import UIContext from "./store/ui-context";
import AuthContext from "./store/auth-context";

function App() {
  const authContext = useContext(AuthContext);
  const uiContext = useContext(UIContext);

  let content = <Welcome />;
  if (authContext.userId && authContext.token) {
    content = uiContext.showClasses ? <AllClasses /> : <ClassHandler />;
  }
  return <Layout>{content}</Layout>;
}

export default App;
