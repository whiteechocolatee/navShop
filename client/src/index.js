import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import { store } from "./store/index";

const root = ReactDOM.createRoot(
  document.getElementById("root"),
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
