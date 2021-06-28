import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import Logger from "redux-logger";
import { SnackbarProvider } from "notistack";
import "./App.css";
import App from "./App";
import rootReducer from "./redux";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, Logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        autoHideDuration={2000}
      >
        <App />
      </SnackbarProvider>
    </Router>
  </Provider>,
  document.getElementById("root")
);
