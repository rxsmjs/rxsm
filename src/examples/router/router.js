import React, { useLayoutEffect, useState } from "react";
import { Router, Route } from "react-router-dom";
import history from "./history";
import { createStore } from "rxsm";

const routerInit = {
  currentPath: "/"
};

const routerStore = createStore(routerInit);
routerStore.currentPath.sideEffectSubscribe("ReRoute", val =>
  history.push(val)
);

const ReRoute = path =>
  routerStore.dispatch({
    name: "ReRoute",
    func: store => ({ currentPath: path })
  });

const Index = () => (
  <div>
    <p onClick={() => ReRoute("page1")}>Link to Page1</p>
    <p onClick={() => ReRoute("page2")}>Link to Page2</p>
  </div>
);
const Page1 = () => <h1>Page1</h1>;
const Page2 = () => <h1>Page2</h1>;

const examplePathList = [
  {
    path: "/",
    name: "Index",
    component: Index
    // exact: true
  },
  {
    path: "/page1",
    name: "Page1",
    component: Page1
  },
  {
    path: "/page2",
    name: "Page2",
    component: Page2
  }
];

const useCurrentPath = () => {
  const [state, setState] = useState("");
  useLayoutEffect(() => {
    const subscribtion = routerStore.currentPath.subscribe(i => setState(i));
    return () => {
      subscribtion.unsubscribe();
    };
  }, []);
  return [state];
};

const currentPath = () => routerStore.getState().currentPath;

const RedirectRoute = ({ path }) => {
  useLayoutEffect(() => {
    ReRoute(path);
  }, []);
  return <React.Fragment />;
};

export const AbstractRouter = (pathList = examplePathList) => ({
  Component: () => (
    <Router history={history}>
      {pathList.map((props, index) =>
        props.redirect !== undefined ? (
          <RedirectRoute key={index} path={props.redirect} />
        ) : (
          <Route key={index} {...props} />
        )
      )}
    </Router>
  ),
  pathList,
  ReRoute,
  useCurrentPath,
  currentPath
});
