import React from "react";
import { useStore } from "./rxsm/rxsm";
import { Input } from "reactstrap";

export const AbstractTextLine = ({ store, valName, setAction }) => () => {
  const [textValue] = useStore(store, valName);
  return (
    <Input
      value={textValue}
      onChange={e => store.dispatch(setAction(e.target.value))}
    />
  );
};
