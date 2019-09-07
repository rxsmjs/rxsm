import React from "react";

import { InputGroup, InputGroupAddon, Button } from "reactstrap";
import { STORE, store_v2 } from "./stores";
import { useStore } from "../../dist/rxsm";
import {
  setTextAction,
  setTextAction2,
  clearTextLine1,
  clearTextLine2,
  Line1SwapLine2,
  AsyncAction
} from "./actions";

import { AbstractTextLine } from "./AbstractTextLine";

import { AbstractButton } from "./AbstractButton";

import { HVCenteredLayout } from "./HVCenteredLayout";

import { Input } from "reactstrap";

const Line1ClearButton = AbstractButton({
  store: STORE,
  color: "primary",
  action: clearTextLine1
});

const InputLine1 = () => {
  const [textValue] = useStore(STORE, "textLine1");
  return (
    <Input
      value={textValue}
      onChange={e => STORE.dispatch(setTextAction(e.target.value))}
    />
  );
};

const InputLine2 = AbstractTextLine({
  store: STORE,
  valName: "textLine2",
  setAction: setTextAction2
});

const Line2ClearButton = AbstractButton({
  store: STORE,
  color: "primary",
  action: clearTextLine2
});
const SwapButton = AbstractButton({
  store: STORE,
  color: "danger",
  action: Line1SwapLine2
});
const RunAsyncButton = AbstractButton({
  store: STORE,
  color: "success",
  action: AsyncAction
});

export const MultipleTextLines = () => {
  STORE.textLine2.sideEffectSubscribe("changeTextLine2", i =>
    console.log(`Side effect on changeTextLine1 value : ${i}`)
  );

  STORE.textLine2.sideEffectSubscribe("Async Action", i =>
    console.log(`Side effect onAsync Action value: ${i}`)
  );

  const [test] = store_v2.useStore("textLine1");

  return (
    <HVCenteredLayout>
      <div className="shadow p-4 mb-5 bg-white rounded">
        <InputGroup>
          <InputLine1 />
          <InputGroupAddon addonType="append">
            <Line1ClearButton>Clear Me!</Line1ClearButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="mt-2">
          <div className="w-100 d-flex justify-content-center">
            <SwapButton>↑ Swap values ↓</SwapButton>
          </div>
        </InputGroup>
        <InputGroup className="mt-2">
          <InputLine2 />
          <InputGroupAddon addonType="append">
            <Line2ClearButton>Clear Me!</Line2ClearButton>
          </InputGroupAddon>
        </InputGroup>
        <InputGroup className="mt-2">
          <div className="w-100 d-flex justify-content-center">
            <RunAsyncButton>Run Async Action</RunAsyncButton>
          </div>
        </InputGroup>
        <InputGroup className="mt-2">
          <div className="w-100 d-flex justify-content-center">
            <Button onClick={e => store_v2.rx.textLine1.next("new text line")}>
              Change
            </Button>
          </div>
        </InputGroup>
        <InputGroup className="mt-2">
          <div className="w-100 d-flex justify-content-center">
            <Button onClick={e => console.log(store_v2.textLine1)}>
              {test}
            </Button>
          </div>
        </InputGroup>
      </div>
    </HVCenteredLayout>
  );
};
