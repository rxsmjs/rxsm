# RxSM - Reactive State Management

[![npm (tag)](https://img.shields.io/npm/v/rxsm/latest?style=for-the-badge)](https://www.npmjs.com/package/rxsm)

Redux-like state manager, based on the **RxJS** methods in the core.

Widely spread **Redux**, in spite of its advantages
*(heavily tested, solid codebase, structured approach, wide community, etc.)*,
has a couple of downsides:
* Lots of writing stuff *(stores, actions, reducers, middlewares, tons of glue-code)*
* As a consequence - big bundle size
* One big storage *(Someone could believe it's an advantage! Hah, Let the holy war begin!)*

On the other hand, we have **RxJS** with its atomical way to store data in **BehaviorSubjects**
and a huge amount of asynchronous methods to work with events, which gives possibilities
to work with async actions and side-effects without middlewares and extra code. 

The main goal of this library is to keep **Redux** dev-experience and decrease
the amount of unnecessary code in state management as well as reduce your bundle size.

## Installation
    npm i -S rxsm

## Basic usage:

### rxStore:

A store is a place where all of the state data is located.
You may not bound yourself with the only one store *(despite Redux)*, but use as many separated storages as you need *(for instance, when you use React components and want to isolate your components logic in  individual files)*:

#### Creating store:

```javascript
import { createStore } from "rxsm"

const init = {
  textLine: "init text1",
  numericValue: 1,
  array: ['one', 'two', 'three']
}

export const rxStore = createStore(init)
```
 And with multiple stores:

 ```javascript
import { createStore } from "rxsm"

const init1 = {
    textLine: "init text1",
}

const init2 = {
    numericValue: 1,
}

const init3 = {
    array: ['one', 'two', 'three']
}

export const rxStore1 = createStore(init1)
export const rxStore2 = createStore(init1)
export const rxStore3 = createStore(init1)
 ```

#### Store structure:

In a nutshell:

```
{
    storeKey_0: EnhancedRxBehaviorSubject_1,
    ...
    storeKey_n: EnhancedRxBehaviorSubject_n,
    dispatch: function(actionObject),
    getState: function()  //return state js-object {...}
}
```

Let's take a look at a particular case in the first example:

```
rxStore:
{
    textLine: EnhancedRxBehaviorSubject("init text1"),
    numericValue: EnhancedRxBehaviorSubject(1),
    array: EnhancedRxBehaviorSubject(['one', 'two', 'three']),
    dispatch: function(actionObject),
    getState: function()
}
```