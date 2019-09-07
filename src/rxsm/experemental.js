import { useLayoutEffect, useState } from "react";
import { defer, Subject, BehaviorSubject, combineLatest } from "rxjs";
import { mergeMap, map, withLatestFrom } from "rxjs/operators";

export const createStore = initObj => {
  const initArray = Object.entries(initObj);
  const rxArray = initArray.map(([key, value]) => [
    key,
    new BehaviorSubject(value)
  ]);
  const rxObj = Object.fromEntries(rxArray);

  const useStore = storeName => {
    const [state, setState] = useState("");

    useLayoutEffect(() => {
      const subscribtion = rxObj[storeName].subscribe(i => setState(i));
      return () => {
        subscribtion.unsubscribe();
      };
    }, []);
    return [state];
  };

  const Stores = {
    ...initObj,
    rx: rxObj,
    useStore
  };

  rxArray.forEach(([key, value]) => {
    value.subscribe(i => (Stores[key] = i));
  });

  return Stores;
};
