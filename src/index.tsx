import { initialize } from "react-ga";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./constants";
import "./index.css";
import App from "./app";
import RedactleApp from "./redactleapp";
import Homepage from "./homepage";

const TRACKING_ID = "INSERT-YOUR-ID-HERE";
initialize(TRACKING_ID);

function Root() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/59" element={<RedactleApp />} />
          <Route path="/bey" element={<App />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById("root"),
);
