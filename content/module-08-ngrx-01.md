## Overview
##### Time: 5min

In this module, we will learn the benefits of using the redux pattern with the ngrx library to manage out application state. In the following lessons will explore how to implement the ngrx library and some amazing tooling. We will see how it is a different way of thinking about architecting our frontends.

### Learning Outcomes
- The main principles of the redux pattern
- What is ngrx and what it does
- The pros and cons of using the redux pattern with ngrx

### Presentation Slides
[ngrx presentation](https://docs.google.com/presentation/d/1KrGf9d6E7kE3e4aCNlbxLVCbqUMuBv4Ylr8_bL3cBD0/edit?usp=sharing)

## The main principles of the redux pattern
##### Time: 10min

The redux pattern has three main principles represented in the below diagram.
1. Store is a single source of truth

The entire state of the application is represented in a single JavaScript object called a store.

2.Actions trigger updates as state is read-only

The state is read only so to follow the redux pattern actions are dispatched which execute reducers. If the Store is our application state and reducers are sections of that state, then actions are the things that execute our reducer functions to update the store.

3.Reducers pure functions and are the only place state is changed

The store is acted upon using special functions called reducers. Pure function, accepting two arguments, the previous state and an action with a type and optional data (payload) associated with the event. Using the previous analogy, if the store is to be thought of as your client side database, reducers can be considered the tables in said database. The state is immutable, and reducers are the only part of the application that can change state.

![](https://firebootcamp.ghost.io/content/images/2017/02/ngrx-flow.png)

**Figure: 4 main parts of the redux pattern**

Read more about the foundations of the redux pattern here http://redux.js.org/docs/introduction/ThreePrinciples.html. Note redux with a little r refers to the pattern but Redux with a big R refers to the library made popular by the ReactJS community.

## What is ngrx and what it does
##### Time 5min

ngrx is aRxJS powered state management for Angular applications, inspired by Redux. It is a series of libraries with the main library being @ngrx/store. [@ngrx/store](https://github.com/ngrx/store) is a controlled state container designed to help write performant, consistent applications on top of Angular. Core tenets:

State is a single immutable data structure
Actions describe state changes
Pure functions called reducers take the previous state and the next action to compute the new state
State accessed with the Store, an observable of state and an observer of actions

These core principles enable building components that can use the OnPush change detection strategy giving you intelligent, performant change detection throughout your application.

![](https://firebootcamp.ghost.io/content/images/2017/02/ngrx-as-pics.png)

**Figure: Pictorial diagram of how ngrx fits into the angular platform**

Read more about how ngrx here https://gist.github.com/btroncone/a6e4347326749f938510.html.This is a very comprehensive document about ngrx and is well worth reading twice.


## The pros and cons of using the redux pattern with ngrx
##### Time: 5min

It takes an investment in time to learn to learn the redux pattern, the ngrx libraries, and associated tools. It also means you will be all in on using RxJS and if you do not already know how to merge, flatten, combine, create and emit new streams then you will be in for some more learning. Getting started with ngrx is simple and pleasant the challenges and learning start when you start to scale your application and try and get your other team members up to speed. That said it is an elegant solution to a complex problem which is state management on the client side that will likely change the way you program on a day to day basis.

### Centralized, Immutable State

Having all application state saved in the store, it becomes easy to rationalize about your state, avoid bugs and make debugging better. We will be looking at some of the amazing 'time travel debugging' tools in later lessons.

### Performance

Since the state is centralized at the top of your application, data updates can flow down through your components relying on slices of the store. Angular is built to optimize on such a data-flow arrangement and can disable change detection in cases where components rely on Observables which have not emitted new values. In an optimal store solution, this will be the vast majority of your components.

### Testability

Since the only place state is changed is in reducers it becomes much much easier to test your business logic as you mostly test reducers. As reducers are pure functions meaning they also are very easy to test and the biggest pain of testing regarding mocking all your dependencies is removed mostly as a reducer is just a pure function.

### Tooling and Ecosystem

A centralized, immutable state also enables powerful tooling. As mentioned debugging tools are incredible, and logging becomes just as good!

![](https://firebootcamp.ghost.io/content/images/2017/02/ngrx-pro-vs-con.png)

**Figure: Pros and Cons of using ngrx**


## Further reading 
##### Time: 5min
- [Reactive Angular 2 with ngrx (video)](https://youtu.be/mhA7zZ23Odw)
- [Comprehensive Introduction to @ngrx/store](https://gist.github.com/btroncone/a6e4347326749f938510)
- [@ngrx/store in 10 minutes (video)](https://egghead.io/lessons/angular-2-ngrx-store-in-10-minutes)
- [Build Redux Style Applications with Angular2, RxJS, and ngrx/store (video)](https://egghead.io/courses/building-a-time-machine-with-angular-2-and-rxjs)


