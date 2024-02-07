import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import React from "react";
import "./index.css";

const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>
);
