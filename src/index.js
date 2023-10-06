import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from './app/store'
import App from "./App";
import "./index.css";
const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
