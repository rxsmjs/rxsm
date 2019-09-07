import React, { useLayoutEffect, useState } from "react";
import { defer, Subject, BehaviorSubject, combineLatest } from "rxjs";
import { mergeMap, map, withLatestFrom } from "rxjs/operators";

export const createStore = initObj => {
  const Stores = Object.fromEntries(
    Object.entries(initObj).map(([key, value]) => {
      const bs = new BehaviorSubject(value);
      bs.sides = {};
      bs.sideEffectSubscribe = (actionName, func) => {
        bs.sides[actionName] = func;
        return () => (bs.sides[actionName] = undefined);
      };
      bs.setData = (value, actionName) => {
        bs.next(value);
        bs.sides[actionName] !== undefined && bs.sides[actionName](value);
      };
      return [key, bs];
    })
  );

  const currentState$ = combineLatest(...Object.values(Stores)).pipe(
    map(i => i.map((j, ind) => [Object.keys(Stores)[ind], j])),
    map(i => Object.fromEntries(i))
  );

  let currentState = {};

  const dispatchPipe$ = new Subject({}).pipe(
    withLatestFrom(currentState$),
    mergeMap(
      i => {
        const action = i[0];
        const currState = i[1];
        return defer(async () => action.func(currState));
      },
      (outer, internal) => {
        const action = outer[0];
        const currState = outer[1];
        const newState = internal;
        Object.entries(newState).forEach(newStateField => {
          const newKey = newStateField[0];
          const newVal = newStateField[1];
          currState[newKey] !== undefined && //check that newKey exists in the storage
          currState[newKey] !== newVal && //check that new value is different from existing one in the storage
            (() => {
              Stores[newKey].setData(newVal, action.name); // changing value in the storage
            })();
        });
        return action.name;
      }
    )
  );

  dispatchPipe$.subscribe();
  currentState$.subscribe(i => {
    currentState = i;
  });

  return {
    ...Stores,
    dispatch: action => dispatchPipe$.next(action),
    getState: () => ({ ...currentState })
  };
};

export const useStore = (storeObj, storeName) => {
  const [state, setState] = useState(storeObj.getState()[storeName]);

  useLayoutEffect(() => {
    const subscribtion = storeObj[storeName].subscribe(i => setState(i));
    return () => {
      subscribtion.unsubscribe();
    };
  }, []);
  return [state];
};
