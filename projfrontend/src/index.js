import React from "react";
import Routes from "./Routes";
import ReactDOM from "react-dom";
// import {BrowserRouter, Switch, Route} from 'react-router-dom';
import { ErrorBoundary } from "react-error-boundary";

ReactDOM.render(
  <>
    <ErrorBoundary fallback="Something went wrong">
      <Routes />
    </ErrorBoundary>
  </>,
  document.getElementById("root")
);
