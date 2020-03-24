## Overview
##### Time: 5min

RxJS is baked into Angular and there are three main places you will interact with it in the framework.

1. HTTP Module
2. Router
3. Reactive forms


## HTTP Module
##### Time: 5min

The primary place you will interact with RxJS in Angular as you learn RxJS is when using Angulars HTTP module. Whenever you use the HTTP module, you will get back an observable, not a promise.

Knowing how to subscribe to an observable and "unwrap" the contents is the most basic of interactions with RxJS and necessary for making HTTP requests. 

If a developer wishes they can convert the observable to a promise and interact with the response as they may be used to. Promises for HTTP responses are very valid as most HTTP request only ever bring back a single value and promises work perfect for this. However, when a developer is comfortable with observables and RxJS operators they tend to want to have the operators available to manipulate the HTTP responses. Another sometimes powerful thing you can do with observables that you can not do with promises is canceled HTTP requests still in flight. Imagine a typeahead with the last search term HTTP request still being outstanding when a new search string is entered and another HTTP request sent.

```
  getUsers() {
     this.http.get(`http://swapi.co/api/people/`)
      .subscribe(people => console.log(people));
  }
```
***Figure: Angular HTTP get returning an observable that is subscribed to***

```  
@Injectable()
export class PeopleService {
  constructor(private http: Http) { }

getPeople() {
     return this.http.get(`http://swapi.co/api/people/`)
      .map(response => response.json());
      .subscribe(people => console.log(people));
  }
}
```
***Figure: RxJS .map operator to gt the json from the response object***

## Router
##### Time: 5min

Working with the data in your routes is the second place you will interact with observables in RxJS. In particular, when you want to get parameter from the URL like the ```id``` field in the below code you will need to subscribe to it as it is an observable. You may think this is not needed as the params will not change and you would be right and that is why there is a special snapshot method to get the params ``` this.activatedRoute.snapshot.params['id']```. Working with params or anything in Angular as an observable stream has the value of using the operators from RxJS on the streams. In the second code example below the ```.switchMap``` operator is used that allows to both turn the params ```id``` stream value into an HTTP request but also cancel any outstanding requests if the URL changes before the previous HTTP request resolves.


```
 ngOnInit() {
    this.route.params
      .subscribe(params => this.id = params['id'])
}
```
***Figure: Subscribing to the URL params***

```
ngOnInit() {
    this.route.params
       .map(params => params['id'])
       .switchMap(id => this.contactsService.getContact(id))
       .subscribe(contact => this.contact = contact);
}

```
***Figure: Applying RxJS operators to params stream***

## Reactive forms
##### Time: 5min

There are two types of forms in Angular, reactive forms and template forms. Template forms have all their markup in the HTML and have an advantage of being fast and straightforward. Reactive forms are more powerful and allow for using custom validation, observing form elements as streams (hence the reactive name) and being easier to test with all the form metadata being in the Component class.

Reactive forms are made up of FormControls, one for each form element, which by default have a ```valueChanges``` property on them which are observable and can be subscribed to.

In the below code example the input element named ```searchControl``` is subscribed to and every time the value of the input changes the ```next``` value will be emitted.

```
@Component()
export class SearchComponent implements OnInit {
  searchControl = new FormControl();
  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      // do something with value here
    });
  }
}
```
***Figure: searchControl input field is an observable***

## Adding RxJS operators
##### Time: 10min

In any Angular file you use RxJS operators you will need to make and import statement for each operator. Commonly you will have mostly the same operators specified over and over in many files. To save duplicating these in every file you can use a TypeScript barrel, which just allows you to import a group of import statements. The build tools are smart enough to see you only need each operator that corresponds to a file in your node_modules once.

Often you will start with a handful and just add another everytime you need one. You can just bring in the "Kitchen Sink" by using ```import 'rxjs/Rx'``` however this brings in the whole RxJS library which can be large.

```
import './core/rxjs-extensions';
```
***Firgure: Import a single file that itself imports all the RxJS operators***
```
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/merge';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/throw';
```
***Figure: Common RxJS operators in ```rxjs-extensions.ts``` shared accross an application***

## Summary
##### Time: 5min

Using RxJS in Angular is a journey. Many developers start off interacting with HTTP then moving on to more complex uses of RxJS. Once you have mastered subscribing and simple operators and start getting more ambitious and declarative in your code you will need to understand how to flatten out observable of observables and then tackle challenges of combining multiple streams, and so the journey begins into more and more expressive and powerful combinations of operators.  

Once you find your self having to either unsubscribe from many subscriptions in a single component or have nested subscribed obervables in for eachs, it is time to stop and go back and learn a little more in the journey to mastering RxJS.

- RxJS is baked into Angular.
- Used in reactive forms, HTTP, and the router.
- You can start with just HTTP and subscribing to responses and then slowly start using more and more operators in your applications.




