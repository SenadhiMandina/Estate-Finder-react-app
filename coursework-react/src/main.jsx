import React from "react";
import ReactDOM from "react-dom/client";

import Localization from "react-widgets/Localization";
import "react-widgets/styles.css";

import App from "./App.jsx";
import "./index.css";

import FixedDateFnsLocalizer from "./utils/FixedDateFnsLocalizer";

const dateLocalizer = new FixedDateFnsLocalizer();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Localization date={dateLocalizer}>
      <App />
    </Localization>
  </React.StrictMode>
);