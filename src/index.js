import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./global.css";
import { BrowserRouter } from "react-router-dom";

const app = (
  <BrowserRouter basename="/vc-scheduling">
    <App />
  </BrowserRouter>
);
ReactDOM.render(app, document.getElementById("root"));
