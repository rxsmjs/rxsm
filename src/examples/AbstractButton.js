import React from "react";
import { Button } from "reactstrap";

const mockStore = {
  dispatch: action => {
    console.log(`mockStore dispatching ${action.name}`);
    action.func();
  }
};

const mockAction = {
  name: "mockAction",
  func: () => console.log("mockAction function")
};

export const AbstractButton = ({
  store = mockStore,
  color = "secondary",
  action = mockAction
}) => ({ children }) => (
  <Button onClick={() => store.dispatch(action)} color={color}>
    {children}
  </Button>
);
