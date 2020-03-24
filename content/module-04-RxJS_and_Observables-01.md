## Overview
##### Time: 5min

>RxJS is a library for composing asynchronous and event-based programs by using observable sequences. It provides one core type, the Observable, satellite types (Observer, Schedulers, Subjects) and operators inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections.

>ReactiveX combines the Observer pattern with the Iterator pattern and functional programming with collections to fill the need for an ideal way of managing sequences of events.

If the above blurb from the [RxJS Docs](http://reactivex.io/rxjs/manual/overview.html) makes perfect sense to you then you will be right at home with RxJS. For the rest of us RxJS is a journey as we change the way we tackle async code in our applications for the better!

###The essential concepts in RxJS which solve async event management are:

- Observable: represents the idea of an invokable collection of future values or events.
- Observer: is a collection of callbacks that knows how to listen to values delivered by the Observable.
- Subscription: represents the execution of an Observable, is primarily useful for cancelling the execution.
- Operators: are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, flatMap, etc.
- Subject: is the equivalent to an EventEmitter, and the only way of multicasting a value or event to multiple Observers.
- Schedulers: are centralized dispatchers to control concurrency, allowing us to coordinate when computation happens on e.g. setTimeout or requestAnimationFrame or others.

## RxJS Fundamentals
##### Time: 10min

The Observer Pattern is a main part of RxJS. In the diagram below we see an example of the observer pattern with an observable at the top and two observers below. Applying the idea of streams to the observer pattern is RxJS but there are also the powerful operators. Many people try to simplify the idea of RxJS by thinking about streams as array that can change over time and applying array like operators to them as being RxJS. This is not a bad way to think about RxJS.

We can see the first observer applies a map operator to the array of [1,4,7] adding the number 1 to each value. The second observer applies two operators first filtering out all values less than 2 and then summing all the remaining values of [4,7].

![RxJS](https://firebootcamp.ghost.io/content/images/2017/02/rxjs-streams.jpg)
***Figure:Example of observable with two observes applying different operators***

## Subscriptions
##### Time: 10min

>It is important to note that observables are lazy push streams of data. 

Lazy as in nothing will happen in this diagram until one of the observers ```.subscribe()``` to the observable. Like a function nothing will happen until it is excuted a observable is similar nothing will happen until it is subscribed to. 




```
const array = Rx.Observable.from([1,2,3])
  .take(2)
  .map(x => x + 1)


array.subscribe(
    next => console.log('next:', next),
    error => console.log('error:', error),
    () => console.log('completed')
  )
```
***Figure: Example subscription***

Link to plunker with working example of above code


[jsbin with working demo](https://jsbin.com/kuyibab/edit?js,console)

## Operators
##### Time: 10min

Operators are one of the most import parts of RxJS and why even if observables become native and part of the JavaScript specification the observables will likely not. 

Operators are inspired by Array#extras (map, filter, reduce, every, etc) to allow handling asynchronous events as collections. 

There are so many operators as seen below it is impossible to know all of them off the top of your head. This is where the docs become really helpful especially the tool to help you know which operators on the home page of the docs seen below.

![](https://firebootcamp.ghost.io/content/images/2017/02/rxjs-helper.png)
***Figure: Helper tool to know which operator to use on the RxJS docs***

![Operators](https://firebootcamp.ghost.io/content/images/2017/02/operators.png)
***Figure: The many RxJS operators***


## RxJS Subjects 
##### Time: 10min

What is a Subject? An RxJS Subject is a special type of Observable that allows values to be multicasted to many Observers. While plain Observables are unicast (each subscribed Observer owns an independent execution of the Observable), Subjects are multicast.

>A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

Every Subject is an Observable. Given a Subject, you can subscribe to it, providing an Observer, which will start receiving values normally. From the perspective of the Observer, it cannot tell whether the Observable execution is coming from a plain unicast Observable or a Subject.

Internally to the Subject, subscribe does not invoke a new execution that delivers values. It simply registers the given Observer in a list of Observers, similarly to how addListener usually works in other libraries and languages.

Every Subject is an Observer. It is an object with the methods next(v), error(e), and complete(). To feed a new value to the Subject, just call next(theValue), and it will be multicasted to the Observers registered to listen to the Subject.

In the example below, we have two Observers attached to a Subject, and we feed some values to the Subject:

```
const mySubject = new BehaviorSubject<string>([]);

const subscriber1 = mySubject.subscribe(val => console.log(sub1:', val));
const subscriber2 = mySubject.subscribe(val => console.log(sub2:', val));

mySubject.next(‘FIRST VALUE!’);

// sub1: FIRST VALUE! 
// sub2: FIRST VALUE!

```

## References
##### Time: 0min

These are some of the best documentation on RxJS

[RxJS 5 Operators By Example](https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35)

[RxJS Documentations](http://reactivex.io/rxjs/)

[RxMarbles](http://rxmarbles.com/)