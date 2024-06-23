import "@mantine/core/styles.css";

import App from "./App";
import { MantineProvider } from "@mantine/core";
import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
