import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { UIContextProvider } from "./store/ui-context";

ReactDOM.render(
  <AuthContextProvider>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);
