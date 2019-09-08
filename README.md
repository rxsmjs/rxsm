# RxSM - Reactive State Management

[![npm (tag)](https://img.shields.io/npm/v/rxsm/latest?style=for-the-badge)](https://www.npmjs.com/package/rxsm)

Redux-like state manager, based on the **RxJS** methods in the core.

Widely spread **Redux**, in spite of its advantages
*(heavily tested, solid codebase, structured approach, wide community, etc.)*,
has a couple of downsides:
* Lots of writing stuff *(stores, actions, reducers, middlewares, tons of glue-code)*
* As a consequence - big bundle size
* Just **ONE BIG** storage *(Someone could believe it's an advantage! Hah, Let the holy war begin!)*

On the other hand, we have **RxJS** with its atomical way to store data in **BehaviorSubjects**
and a huge amount of asynchronous methods to work with events, which gives possibilities
to work with async actions and side-effects without middlewares and extra code. 

The main goal of this library is to keep **Redux** dev-experience and decrease
the amount of unnecessary code in state management as well as reduce your bundle size.

## Installation:
    npm i -S rxsm

## Usage:

### rxStore

A store is a place where all of the state data is located.
You may not bound yourself with the only one store *(despite Redux)*, but use as many separated storages as you need *(for instance, when you use React components and want to isolate your components logic in  individual files)*:

#### Creating store:

```javascript
//store.js:

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
//multiple_stores.js

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

Let's take a look at the particular case in the first example:

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

#### Store methods:
* #### dispatch(actionObject)

dispatch method initiates changes in the store according actionObject:

```javascript
import {rxStore} from 'store'

rxStore.dispatch(actionObject)
```
* #### getState()

getState returns common JS object with full state of the store

```javascript
import {rxStore} from 'store'

const currentState = rxStore.getState()
```
<details><summary> curretState:</summary>
<p>

```js
 {
     textLine: "init text1",
     numericValue: 1,
     array: ['one', 'two', 'three']
 }
```

</p>
</details>


### actionObject:
An actionObject is a common JS object, that determines how the store should be changed. It's based on the current store state and *(optional)* additional data.

#### actionObject structure:
```
{
    name: String, //name of the action
    func: currentState => {stateChanges} //function with the currentState as an argument and returning
                                         //JS object that contains only changes in state  
}
```

#### actionObject usage:
```js
import {rxStore} from 'store'

const action = {
    name: "increment",
    func: store => {
        numericValue: store.numericValue + 1
    } 
}
``` 
<details><summary> curretState before dispatch:</summary>
<p>

```js
 {
     textLine: "init text1",
     numericValue: 1,
     array: ['one', 'two', 'three']
 }
```

</p>
</details>

```js
rxStore.dispatch(action)
```

<details><summary> curretState after dispatch:</summary>
<p>

```js
 {
     textLine: "init text1",
     numericValue: 2,
     array: ['one', 'two', 'three']
 }
```

</p>
</details>

##### The same, but with additional data:

```js
import {rxStore} from 'store'

const actionWithExternalData = externalData =>
{
    name: "increment",
    func: store => {
        numericValue: store.numericValue + externalData
    } 
}
``` 
<details><summary> curretState before dispatch:</summary>
<p>

```js
 {
     textLine: "init text1",
     numericValue: 1,
     array: ['one', 'two', 'three']
 }
```

</p>
</details>

```js
rxStore.dispatch(actionWithExternalData(5))
```

<details><summary> curretState after dispatch:</summary>
<p>

```js
 {
     textLine: "init text1",
     numericValue: 6,
     array: ['one', 'two', 'three']
 }
```

</p>
</details>