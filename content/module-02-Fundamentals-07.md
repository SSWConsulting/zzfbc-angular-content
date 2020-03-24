## Summary
##### Time: 5 min 
One of the first things that you will need to do in an Angular application is to call a service to query a backend system and retrieve data.

In this module, we will set up the app to use the Http Client from Angular, call a remote service and subscribe to an observable to replace our initial ` currentValue `. 

### Learning Outcomes 
- Understand Angular services
- Understand the basics of Observables in Angular HTTP requests

### Techniques Learned (What we want to be able to do)
- How to use Angular's Http Client
- How to call a remote service with Angular's Http Client
- How to register Angular's Http Client with Angular providers
- How to subscribe to an Observable
- Extend the Counter Exercise #2 to retrieve the initial ` currentValue ` from a local JSON file

## The very, very basics of observables
##### Time: 5 min

We use the Angular HTTP module to query services.

Unlike in Angular 1 where the HTTP module returned a promise, Angular uses RxJS and returns an [Observable](https://reactivex.io/rxjs). 
An observable is a push based collection. 

We'll talk more about observables in later modules, but for now, you need to understand that Observables bring in a lot of power to Angular 2.
The allow able to manage streams of data and offering an extensive list of operators or utility functions makes your code more terse, readable and robust. 

It may seem like  overkill to use Observables to make HTTP requests that just return a single value when we could have used a promise, 
but as we will discover later Observables and the operators you get from RxJS make them very powerful and allow you to do things which promises cannot.

## Add a fake backend
##### Time: 5 min
We will continue on from the Counter Exercise #2 module and replace out the hardcoded ` counterValue ` in the existing service with a http call to a local count.json file.


### Add a fake backend with a count.json file
To save having to set up an API for this exercise we will use the HTTP client but rather than passing it the URL of a back-end service, we will pass it a path to a local .json file instead. 

The nice thing about this approach is that the syntax and process of calling a real API are identical to the code we will use, but we don't have to go through the whole exercise of setting up a back-end.

- Add a `count.json` file to the counter folder.

- Inside the count.json file add ` {"count": 5} `. This is the very simple data that our service will return.

### Add count.ts and add a new interface of type ICount

 It is best practice to try and type your application as strongly as possible, which means putting type information on all of your variables and functions so you will have less buggy code.

- In TypeScript, you have the choice of declaring your models as either interfaces or classes. 
   The primary difference is that you have to implement all of the properties and methods of a class and you cannot add to them unless you formally extend the class, classes cannot be nullable and classes can be "Newed up". 
   In comparison::  interfaces are only for compile time checking only. They are not compiled into javascript, and classes that implement interfaces can be extended with properties and functions without extending the interface. 
   For these reasons, many people prefer interfaces for their client side view model/DTOs as they are more flexible. 
   The main use case for classes is when you are required to 'new up' an object.  e.g. when creating a user or a form object. 

- Add a new file called 'count.ts' to the 'counter' folder.

- In count.ts: add a count interface so we can start to strongly type a return type from our service.
  
```
 export interface Count {
    
 }
```   

- Add the 'count' property to the Count interface as a number
```
 export interface Count {
    count: number;
 }
```  


## app.module.ts: Register the Http Client
##### Time: 5 min

Register Angular's Http Client in the app.module.ts file:

- Import the HTTP module 

```
import { HttpModule }    from '@angular/http';
```

- Add it to the imports for the Angular Module

```
imports: [ BrowserModule, HttpModule ],
```

The completed app.module.ts should now look like this: 

```
import { NgModule, Input, Output, EventEmitter  }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { AppComponent }  from './app.component';
import { CounterComponent } from './counter/counter.component';
import { CounterLogicComponent } from './counter/counter-logic.component';
 

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [ AppComponent, CounterLogicComponent,  CounterComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

> Note: It is best practice to only extend or register Angular's built-in services in the bootstrap function and to register your custom services in the top most component that needs that service.


## counter.service.ts: Import the necessary symbols
##### Time: 5 min

```
 import { Injectable } from '@angular/core';
 import { Http } from '@angular/http';
 import { Observable } from 'rxjs/Rx';
 import 'rxjs/add/operator/map';
 import 'rxjs/add/operator/catch';
```
- Injectable is needed to let Angular know that when the Counter Service is injected into another service or component that it needs to inject its own dependencies like Http. 
- Http is going to allow us to make HTTP request like get, post or put. 
- Observable is brought in to allow us to type out ` getCount() ` functions return type. 
- The operator's map and catch are an example of the many operators in the RxJS library that come out of the box with Angular2. 'map' allows up to map the incoming response to JSON and 'catch' allows us to catch any errors. 

![](https://firebootcamp.ghost.io/content/images/2017/02/http-request-intellisense.jpg)

Figure: Intellisense in Visual Studio Code showing the built-in HTTP types when using Angular's Http Client

## counter.service.ts: Inject and initialise the Http Client 
##### Time: 5 min

- Inject and initialise the Http Client via the counter service constructor to a private variable

```
@Injectable()
export class CounterService {

    constructor(private http: Http) { }

///rest of code file removed for simplicity...

```

## counter.ts: Modify the ' getCount() ' function to call for a local json file 
##### Time: 5 min

- Change the 'getCount' function to have a return type of `Observable<ICount>`. 
  This is a prime example of the benefits of TypeScript.
  If we try and return anything but an Observable of type ` ICount ` we will get an error when we try and cast it to a count.

- Use the Http Client to do an HTTP get which accepts a string and an optional options object. 
  We will pass the path to our .json file,  and then map the response to JSON using our first RxJS observable operator ` .map `

```
 getCount(): Observable<ICount> {
     return this.http.get('./src/app/counter/count.json')
     .map((response) => response.json())
 }
```

If you hover over ` _this.http.get ` you will see what parameters the 'get' function takes. 

This is a big advantage of TypeScript as it keeps you in the IDE with out having to leave and look up the angular.io docs. 

Notice that we are passing in a relative path a to local jason file, but if we supplied a URL to a backend API, no other changes would be required to wire up our backend.

![](https://firebootcamp.ghost.io/content/images/2017/02/intellisense-for-http-get.jpg)

Figure: Intellisense in Visual Studio Code showing options for using the ` this.http.get() ` function  
 

  - This function will not activate until we subscribe to it in our component but let's continue adding some error handling before we switch focus to the component
  - Add a ` .catch() ` operator and pass it a callback function called 'handleError' which we will pass the error to versus handling the error inline. 
    This way we can share the 'handlError' function with other HTTP requests in the service.   

```
 getCount(): Observable<ICount> {
   return this.http.get('./src/app/counter/count.json')
   .map((response) => response.json())
   .catch(this.handleError);
 }
 
 private handleError(error: any) {
     let errMsg = (error.message) ? error.message :
         error.status ? `${error.status} - ${error.statusText}` : 'Server error';
     console.error(errMsg);
     return Observable.throw(errMsg);
 }
```

## counter.component.ts: Modify the ' getCurrentValue() ' function to subscribe to ' getCount() ' in the counter service  
##### Time: 5 min

- Open counter.component.ts
- Change the ` this._counterService.getCount() ` to subscribe to the observable in the counter service and bind the result passed back from the subscription to the ` this.currentValue `

```
getCurrentValue() {
   this._counterService.getCount()
    .subscribe((result) => {
        this.currentValue = result.count;
    });
}
```

- The key benefits of using Observables for an HTTP request: 
 1. being able to cancel them (which you cannot do with promises) 
 2. use operators like the catch and map on them. 
 
 We will see an even better use case for observables when making a typeahead in a later module. 
 The type-ahead is a great example as we get a stream of events in the form of key press events we map into search requests sent to our backend. 


## counter.service.ts: Play with a useful RxJS operator ' .do() '
##### Time: 5 min
The [Do](http://reactivex.io/documentation/operators/do.html) operator is a useful utility operator to perform a function at a certain point in a observable life cycle. 

Here we are just going to use it to debug our service and output the result of our service call to the console.

- Import the 'do' operator into the service,  `import 'rxjs/add/operator/do';` 
- Add a ` .do() ` operator to the counter service ` getCount() ` function and console log the result value.
  
```
import 'rxjs/add/operator/do';
```

```
getCount(): Observable<ICount> {
    return this.http.get('./src/app/counter/count.json')
        .map((response) => response.json())
        .do((response) => {console.log(JSON.stringify(response))})
        .catch(this.handleError);
}
```

## The completed service code
##### Time: 5 min
```
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

import { ICount } from './count';

@Injectable()
export class CounterService {

    constructor(private http: Http) { }

    getCount(): Observable<ICount> {
        return this.http.get('./src/app/counter/count.json')
            .map((response) => response.json())
            .do((response) => { console.log(JSON.stringify(response)) })
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
```

## Summary
##### Time: 5 min
- In this module, we added Angular's Http Client and used it to return an observable from our counter service to our component where we subscribe to the observable and map it to the currentValue property on our model. We also use some rxjs operators like map, do and catch.

<!--- ### Review and Assessment

To demonstrate your understanding of this module, and work towards achieving the [FireBootCamp Graduate (Angular)](../certification/index.html#firebootcampgraduateangular) certification, follow the instructions as per the [Certification Outline](../certification/index.html)
--->