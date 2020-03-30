// import "core-js"
import "regenerator-runtime/runtime"

import React, { useLayoutEffect, useState } from "react";
import { defer, Subject, BehaviorSubject, combineLatest } from "rxjs";
import { mergeMap, map, withLatestFrom } from "rxjs/operators";



export const createStore = initObj => {
  const Stores = Object.fromEntries(
    Object.entries(initObj).map(([key, value]) => {
      const bs = new BehaviorSubject(value);
      bs.sides = {};
      // Method that subscribes function for launching on bs changes
      // by the action with a certain name 
      bs.sideEffectSubscribe = (actionName, func) => {
        bs.sides[actionName] = func;
        return () => (bs.sides[actionName] = undefined);
      };
      // Internal method to set new value in bs, and fire up subscribed
      // side effects
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
    mergeMap(([action, currState]) => 
          defer(async () => action.func(currState)) ,
        ([action, currState], newState) => {
      Object.entries(newState).forEach(([newKey, newVal]) => {
        currState[newKey] !== undefined && //check that newKey exists in the storage
        currState[newKey] !== newVal && //check that new value is different from existing one in the storage
          (() => {
            Stores[newKey].setData(newVal, action.name); // changing value in the storage
          })();
      });
      return action.name
    })
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
  return [state, i => storeObj[storeName].next(i)];
};
