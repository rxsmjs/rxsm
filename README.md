# RxSM - Reactive State Management
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
