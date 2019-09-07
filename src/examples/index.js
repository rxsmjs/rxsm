import 'babel-polyfill'
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom";

import SomeService from "./SomeService";
import { AppRouter } from "./AppRouter";
import { NavBar } from "./NavBar";

const App = () => {
  const SomeServiceInstance = new SomeService();
  return (
    <React.Fragment>
      <NavBar className="m-3" />
      <AppRouter.Component />
    </React.Fragment>
  );
};
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
