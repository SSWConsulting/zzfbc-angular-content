## Summary
##### Time: 5 min
In this extension of 'Hello World' we look at the basics of data binding and add a 2nd component to our application.

### Learning Outcomes: (What we want to know/understand)
- Understand the difference between interpolation and two-way binding
- Understand how to add a child component to our first component
- Learn how to create a component
- Learn how to use one-way and two-way data binding
- Learn how to handle events in the DOM and call component methods handling


## Review one-way databinding (Interpolation)
##### Time: 5 min

### Add appTitle, currentDateTime as properties on model  

In part 1 of this module, we added two properties (appTitle and currentDateTime) to our AppComponent class.

Then we updated the component template to *bind* the template to the component.

Our component ended up looking like this: 

```
@Component({
    selector: 'app-root',
    template: `<h1>{{appTitle}}</h1>
    Refreshed: {{currentDateTime}}  <button (click)="setCurrentTime()">Refresh</button>    
    `
})
export class AppComponent { 
    
    appTitle = "Hello World Application";        
    currentDateTime: Date = new Date();
    
    setCurrentTime(){
        this.currentDateTime = new Date();
    }      
    
}
```
The appTitle property from the model is being output by the `{{appTitle}}` on the template, and each time the 'Refresh' button is clicked the `currentDateTime` is updated, and this is reflected in the UI.


## Add one-way binding to input box
##### Time: 5 min
Let's add an input box onto our page that also has the value of the `appTitle` assigned to it.

To do this change the template property to 

```  
  `
  template: `<h1>{{appTitle}}</h1>
    Refreshed: {{currentDateTime}}  <button (click)="setCurrentTime()">Refresh</button>
    <hr>
    Edit app title: <input type="text" [value]="appTitle" placeholder="Enter the title here">    
    `
  
```

Notice in the above code

- we have added: a label, an input box and an `hr` 

- the `appTitle` property of our model has been bound to the `value` property of the input. This means that the textbox value will be updated to whatever value the `appTitle` property of the model is.

Reload the page.

See how the `appTitle` is displayed as the value of the textbox.

Excellent!

But what if we want to update the value of `appTitle` by typing into the textbox ?

Try updating the value of the textbox.

NOTHING ! 

We have only implemented one-way property binding. When the value of the model changes, the template (ie. the HTML view) will be updated to reflect that change to the model. 

We HAVE NOT implemented any change notification for when the input box changes to update the model !

Let's get on that.


## Two-way databinding using (ngModelChange)
##### Time: 5 min

Two-way data binding is when changes to the elements on the page are reflected back onto the model. Angular does this by using events.

Angular allows us to specify events by wrapping them in parenthesis.

For example `<button (click)="updateValueOnModel()">Some button</button>` handles the built-in HTML5 click event, and specifies that when it is detected that the `updateValueOnModel` method should be called on the current component.

One way to implement two-way data binding is to use the ngModelChange event.

Update the code for the input box on your template to specify the ngModel property, and handle the ngModelChange event.

``` 
 <input type="text" [ngModel]="appTitle" (ngModelChange)="appTitle=$event" 
     placeholder="Enter a name here"> 
```

Now change the value in the textbox and observe what happens.


## Two-way binding using [(banana in a box)]
##### Time: 5 min

Because we implement 2 way binding so frequently, the Angular team has provided a syntactic shortcut to the above.

Update the template to use the following syntax:

```
<input type="text" [(ngModel)]="appTitle" placeholder="Enter the title here">
```

We are now using ` [(ngModel)]="appTitle" ` to set the value property of the textbox to the `appTitle` property of the model AND to handle the change event. (Notice the round brackets and the square brackets -> it is doing property binding AND handling the change event).

The  ` [(ngModel)]="appTitle" ` syntax is really just a shortcut for a property binding, along with an event binding. 

This syntax is referred to as the 'banana in a box' syntax, because [(ngModel)] looks like a banana in a box !



## Add another component
##### Time: 5 min

Now that we have inspected how our application is running, looked at our first component, and made it a little better - we may want to add another component.

Let's add a list of tasks we want to complete.

It is a good convention to have components in their own folders.

### Add a 'todo' Folder and a ToDo Model

Perform the steps below

#### Add a `todo` folder under the `app` folder

Note that we use lower case for all of our file and folder names.

#### Create the `Todo` model class with the cli 

   Create a `todo.ts` file in the todo folder with the cli 

```
ng generate interface todo/todo
```

   Add the following code

```
  export interface Todo {
    text: string;
    done: boolean;
}
```

Note that as per the [Angular Style Guide](https://angular.io/docs/ts/latest/guide/style-guide.html#03-03)
 
 - use lower case for the file name
 - use upper camel case for the interface name, but do not use an 'I' prefix.

#### Create the todo component

In the todo folder add todo.component.ts with the cli

```
ng generate component todo
```

Add the following code to create a small component that outputs a list of todo items
 
```    
import {Component} from '@angular/core';
  
@Component({
  selector: 'fbc-todo',
  template: `
    <div class="col-sm-6 col-sm-offset-3">
      <h2>Todo</h2>      
      <ul class="list-unstyled">
        <li *ngFor="let todoItem of todos">
          <input  type="checkbox" [(ngModel)]="todoItem.done">
          <span class="done-{{todoItem.done}}">{{todoItem.text}}</span>
        </li>
      </ul>    
    </div>`
})

export class TodoComponent {
  todos: Todo[] = [
      {text:'learn angular', done:true},
      {text:'build an angular app', done:false}
  ];
}
 
```
 
#### Add the todo component onto the parent component view

Open app.component.ts (the component that we want to add our `todo` component onto).

Update the template of the `AppComponet` so that it displays the `ToDoComponent` by adding the `todo` element.

The finished template:
  
```
  template: `<h1>{{appTitle}}</h1>
    Refreshed: {{currentDateTime}}  <button (click)="setCurrentTime()">Refresh</button>
    <hr>
    Edit app title: <input type="text" [(ngModel)]="appTitle" 
          placeholder="Enter the title here">
    <input type="text" [ngModel]="appTitle" (ngModelChange)="appTitle=$event" placeholder="Enter a name here"> 
    <hr>
    <fbc-todo></fbc-todo>
    `  
```
  
#### Refresh your browser.
  
  Notice that nothing happened!
  
  This is the most common mistake people make when adding child components: THEY FORGET TO ADD THE COMPONENT TO AN ANGULAR MODULE.
> Hint: the CLI will add a component to the nearest module but not for a service.
  
#### Add the todo component to the module

In order to be able to add the todo component onto the parent component (in this case it is the 'AppComponent') the todo component must be imported into the Angular Module for the parent component and specified as an import.

1. Open `app.module.ts`
2. Add the TodoComponent as an import
3. Add the TodoComponent to the `declarations` array to specify that it is one of the components in this Angular Module

The updated code will look like this: 

```
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoComponent } from './todo/todo.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, TodoComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

```

You can now use the selector for the component on any other component in the Angular Module and it will render.

#### Refresh your browser .. again ..
  
  Success !

#### Inspect your work
  
  The completed `AppComponent` should now look like this: 
  
  
```
import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
      
  template: `<h1>{{appTitle}}</h1>
    Refreshed: {{currentDateTime}}  <button (click)="setCurrentTime()">Refresh</button>
    <hr>
    Edit app title: <input type="text" [(ngModel)]="appTitle" placeholder="Enter the title here">     
    <hr>
    <fbc-todo></fbc-todo>
    `
})
export class AppComponent { 
    
    appTitle = "Hello World Application";        
    currentDateTime: Date = new Date();
    
    setCurrentTime(){
        this.currentDateTime = new Date();
    }          
}  
```

## Summary
##### Time: 5 min
In this exercise, you implemented one-way binding (interpolation) and two-way binding and created your first child component.

In the next exercise, you will add more components, make them communicate and learn to navigate between them.

<!--
### Review and Assessment

To demonstrate your understanding of this module, and work towards achieving the [FireBootCamp Graduate (Angular)](../certification/index.html#firebootcampgraduateangular) certification, follow the instructions as per the [Certification Outline](../certification/index.html)
-->