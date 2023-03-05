import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./themes";
import { GlobalStyles } from "./GlobalStyles";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode >
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
