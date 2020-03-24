## Overview
##### Time: 5min

In this module, we will add the code to make the Chuck Norris Jokes Application

### Learning Outcomes
- How to make a simple application to test
- Adding a basic module with a component and a service

## Add a Joke Component
##### Time: 15min

- Make a new joke component with the Angular CLI with:-
 - Inline Template '--it'
 - Inline Styles '--is'
 - No test file '--spec false'

```
ng g c joke --it --is --spec false
```

- Confirm the reference to joke component exists in the main `app.module.ts` file and add it if it does not exist

**src/app/app.module.ts**
```
@NgModule({
  declarations: [
    AppComponent,
    JokeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
```

## Add Bootstrap for styling
##### Time: 10min

- Add bootstrap with npm to the project

```
npm i bootstrap --save
```

-  Add a reference to the `bootstrap.css` file in the node_modules folder in the `angular-cli.json` files styles[0] section. This will tell the CLI to inline this CSS file in the index.html file at build time.
```
"styles": [
    "styles.css",
    "../node_modules/bootstrap/dist/css/bootstrap.min.css"
]
```

## Add Joke Component Logic
##### Time: 10min


- Add a `getJoke()` function to the component class
- Add a `title` property and set it to "Chuck Norris Jokes"
- Add a `joke` property of type string
- Add the joke component selectors onto the app.components HTML template inside a div with a bootstrap `container` CSS class 

**src/app/app.component.html**
```
<div class="container">
  <app-joke></app-joke>
</div>
```

**src/app/joke/joke.component.ts**
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-joke',
  template: `
    <h1>{{title}}</h1>
    <div class="well">
      <p>{{joke}}</p>
      <button class="btn btn-success" (click)="getJoke()">Get next     joke</button>
    </div>
  `,
})
export class JokeComponent implements OnInit {
  joke: string;
  title = 'Chuck Norris Jokes';

  constructor() { }

  ngOnInit() {
    this.getJoke();
  }

  getJoke() {
    this.joke = 'funny joke text';
  }

}

```

- Add a binding for the `joke` property to the component template
- Add a button with a click handler to call `getJoke()` on the component
- Add a binding in a `h1` element for the component title property

**src/app/joke/joke.component.ts**
```
  template: `
    <h1>{{title}}</h1>
    <div class="well">
      <p>{{joke}}</p>
      <button class="btn btn-success" (click)="getJoke()">Get next     joke</button>
    </div>
  `,
```
## Add a Joke Service 
##### Time: 10min

- Make a new joke service with the Angular CLI

```
ng g service joke/joke
```

- Add a `getJoke()` function to the component service
- Add the import statements for `Observable`, `Http` and `rxjs/add/operator/map`

This is a simple service, and hence we will not add error handling which we would normally do. You can see we are using an open source Chuck Norris Jokes API,  you can try it out by pasting this link into the URL of any browser [http://api.icndb.com/jokes/random](http://api.icndb.com/jokes/random)

**src/app/joke/joke.service.ts**
```
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class JokeService {

  constructor(private http: Http) { }

  getJoke(): Observable<any> {
    return this.http.get(`http://api.icndb.com/jokes/random`)
      .map(response => response.json().value.joke);
  }

}

```

- Register the joke service with the chucknorris module.

**src/app/app.module.ts**
```
@NgModule({
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JokeComponent } from './joke/joke.component';
import { JokeService } from './joke/joke.service';

@NgModule({
  declarations: [
    AppComponent,
    JokeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [JokeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

## Inject and call the Joke Service from the Joke Component
##### Time: 5min

- Inject the joke service
- Swap out the hard coded return value in the `getJoke()` function with a call to the joke services `getJoke()` function

**src/app/joke/joke.component.ts**

```
import { Component, OnInit } from '@angular/core';
import { JokeService } from './joke.service';

@Component({
  selector: 'app-joke',
  template: `
    <h1>{{title}}</h1>
    <div class="well">
      <p>{{joke}}</p>
      <button class="btn btn-success" (click)="getJoke()">Get next     joke</button>
    </div>
  `,
})
export class JokeComponent implements OnInit {
  joke: string;
  title = 'Chuck Norris Jokes';

  constructor(private jokeService: JokeService) { }

  ngOnInit() {
    this.getJoke();
  }

  getJoke() {
    this.jokeService.getJoke()
      .subscribe(joke => this.joke = joke);
  }

}

```

## Start the Angular CLI server and inspect the app
##### Time: 2min
- Start the server
```
ng serve
```

