## Overview
##### Time: 5min
In this very first exercise we will run our first Angular application, have a look at what exactly a component is and see how our first component gets loaded.

### Learning Outcomes
- Understand the component model
- Understand that you are building models, then binding them, not updating the DOM
- Understand the parts of a component
- Understand how the first component gets loaded
- Learn how to create a component


## Create a new Angular CLI application
##### Time: 5min

- In the folder you would like to create this project run the following command

```
ng new hello-world --prefix fbc
```

- Change directory into the new project and open the CLI in Visual Studio Code

```
cd hello-world && code .
```

- Run the application

```
ng serve
```

- Open the application in your web browser at http://localhost:4200


## Inspect our first component - the AppComponent
##### Time: 10 min

From the /src/app folder open ```app.component.ts```.

### The Root Component - app.component.ts
Angular applications are made up of components - they are the building blocks of angular applications. 

A component controls a portion of the screen (a view) through it's associated template.

Every angular app has at least one root component. By convention this should be named AppComponent. (Lots more on Angular best practices & [the Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html) later)

Open app.component.ts from the /app folder.

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>My First Angular App</h1>'
})
export class AppComponent { }

```



### Parts of a Component

Every component is made up of several important parts.

We will look at each of these in the following order:

 - A user interface template
 - The component class that controls the appearance and behaviour of a view through it's template
 - Import statements to reference the things that we need
 - The @Component decorator that tells angular what template to use and how to create the component

### The Component (User Interface) Template

In web applications the user interface template will be an html template. 

We can see that the template for our first component is a simple text string: 

``` 
<h1>My First Angular App</h1>
```

When templates are only a few lines they can be included inline in the component.

For example (as above):
 
```
@Component({
  selector: 'app-root',
  template: '<h1>My First Angular App</h1>'
})
```

Once they get bigger we move them out into their own files.

For example: 

```

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

```



### The Component Class
The component class controls the appearance and behaviour of the view through it's template.
  
Our first component class does not contain any properties for storing state or methods for adding behaviour.

When you consider our first component: 
```
<h1>My First Angular App</h1>
```
The view is incredibly simple. It is a simple view with no dynamic elements.



#### Add properties to the model

What we have done so far is create a component with a static HTML template and render it to the screen. The component class as it is has no properties or functionality.

```
export class AppComponent { }
```


Obviously we want our templates to be programatically changeable.

We will start to address that by specifying a property on our component that is *Bound* to the view - whenever the value of the property on the component changes, the view will automatically update with the changed value.

Add properties for the current application title, and the current date to your component.

The code should look like this:

```
export class AppComponent { 
    
    appTitle = "Hello World Application";        
    currentDateTime: Date = new Date();
    
}

```

Notice the `export` keyword. We  `export` the class so that we can `import` it elsewhere in our application
 


### Interpolation

Now that our component class contains data (properties), we are able to reflect that data in our template (view).

Update the component template to display the appTitle and currentDateTime.

 > Note in the below sample that we now use backticks to allow us to specify multi-line templates! 

```   
@Component({
    selector: 'app-root',
    template: `<h1>{{appTitle}}</h1>
    <div>Loaded at: {{currentDateTime}}</div>
    `
})

   
``` 


### Simple Events

Our component class can also contain behaviour.

One of the most important principles of Angular development is that you don't directly manipulate the elements on the page (as you did with jQuery). Instead, you update the component (often refered to as the 'model'), and because the view is bound to the component, any change are immediately reflected in the view.

Extend the component to contain some behaviour

```   
    setCurrentTime(){
        this.currentDateTime = new Date();
    }    
```

Now add a button to the html template that calls the method to update the time on the component, thereby updating the time displayed on the view

```  
@Component({
    selector: 'app-root',
    template: `<h1>{{appTitle}}</h1>
    Refreshed: {{currentDateTime}}  <button (click)="setCurrentTime()">Refresh</button>    
    `
})
```   
For those that were familiar with Angular 1.x you will notice that we are now using the native HTML5 (click) event rather than 'ngClick' which was implemented in Angular 1.x. 
 
Save the component, and inspect your handiwork in the browser.

In review:  The component now has properties for `appTitle` and `currentDateTime` and a method `setCurrentTime` that sets the current time to the `currentDateTime`. 
Two properties from the component were bound onto the view (we call this interpolation) and the button's click event is handled and bound to the `setCurrentTime` method of the component.
    

### Modules
 Angular apps of made up of code modules. Libraries can contain multiple related modules. For example, the angular core library contains modules for creating components and for specifying what is an input to a component 
 
 When we build components, we are building classes that are in fact modules
 
 To be able to use a module in another module you need to use the 'import' statement to import the desired module 
    
### The import statement

Examine this line of our component:
     
```
import { Component } from '@angular/core';
```
    
This line of code imports the Component module from Angular core into the current module. It lets us access the functionality of `Component` in this module.

What does `Component` module do - it lets us declare classes as components!
    
### The @Component decorator

```
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<h1>My First Angular App</h1>'
})
export class AppComponent { }
```

Component is a decorator function that lets us associate metadata with a component class.

The metadata tells Angular how to create and use the component

#### What is metadata ?

This is an important point, so I'm going to repeat what we have said above a different way.

We have a class called AppComponent.

We turned that into a component by using the @Component decorator.
(For C# devs, a decorator is similar to an attribute in C#)

In the Component decorator we specify

- the selector: when `<app-root></app-root>` appears in an html template - this component will be inserted

- the template: when we do insert this component onto a template (ie. html page) this specifies what html to use.
 
In order to get access to the `@Component` decorator we first had to import the Component module from Angular. (This is the same as an `import` statement in Java or a `using` statement in C#.)  





## The Root Module - app.module.ts
#####Time: 5min

From the /src/app folder open `app.module.ts`.

Angular groups related components together into `Angular Modules`. 

There are a number of benefits to Angular Modules. Most importantly:

 - cleaner code: you don't need to specify the same `imports` and `directives` statements on related components.
 - performance: Angular Modules are one of the requirements for AoT (Ahead of Time) compilation, which we cover in a future lesson.

Inspect the code below: 

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

Notice: 

1. We decorate our AppModule class with the `NgModule` decorator to make it an Angular Module. 
2. We supply the `NgModule` decorator with three lots of metadata
   - `imports` statements: here we import all the modules that will be available to all the components in this Angular Module.
      We are importing 'BrowserModule' and using it to run the app in the browser.
   - `declarations`: these are the components and directives that belong to this Angular Module
   - `boostrap`: this is used on the root module only and defines the root component that Angular should booststrap when the application starts.

## Work out how the first component gets loaded
##### Time: 5min
Now that we have had a look at our first component and our first module and understand what they are and what they do, let's have a look at how they are loaded.

### Index.html

Like many websites, our Angular app is started from an `index.html`.

Open `index.html` and observe the following: 

- you will not see any script tags these are added at cli build time.

### main.ts

Let's have a look at `main.ts`.

This file has one purpse - to tell Angular which module to use as the root module of the application.

```
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

```

There is only one line of code here being executed.

`platformBrowserDynamic().bootstrapModule(AppModule);`  is telling Angular the first module that needs to be loaded.

Above this line we are importing the *platformBrowserDynamic* module from Angular, and the *AppModule* module from our application.

When the app kicks off now, the AppModule will be boostrapped, the AppModule uses the `bootstrap` metadata to specify that the AppComponent is the first component to be loaded, and on the index.html the `<app-root>` DOM element will be replaced with the component's template.


## Summary
##### Time: 5 min
In this module we have examined a simple Angular application. We extended it to use one-way data binding, added an event and examined how our first component gets loaded.

### Related Articles
[The Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html)



