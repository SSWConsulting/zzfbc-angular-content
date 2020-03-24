## Overview
##### Time: 5min

In this lesson, we will refactor our company table to be a 'presentation' component (also known as a 'dumb' component). 

It will be a child component of the company-list component, and we will pass the list of companies from the company-list down to the company-table.

### Learning Outcomes: 
- How to communicate between components
- How to create presentation components
- Understand the [difference between 'smart' and 'presentational' components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/)

## Create the component using the Angular CLI
##### Time: 5 min

- Open a command prompt and generate a new component for the company table.

```
ng generate component company/company-table --skipTests
```

## Move the company HTML table to the company-table component
#####TIME: 5 min

- Move the Html table from the HTML template for company-list onto the HTML template for company-table

Company table should now look like this: 

**src/app/company/company-table/company-table.component.html**
```
<table class="table table-striped">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
   <tr *ngFor="let company of companies">  
      <td>{{company.name}}</td>
      <td>{{company.email}}</td>
      <td>{{company.phone}}</td>
      <td class="company-row">
        <button class="btn btn-default">Edit</button>
        <button class="btn btn-default" (click)="deleteCompany(company.id)">Delete</button>  
      </td>
    </tr>
  </tbody>
</table>
```

- Move table CSS to child component
**src/app/company/company-table/company-table.component.scss**

```
.company-row {
    width: 180px;
    white-space: nowrap
}
```

## Update the code for the table-component
##### TIME: 5 min

To refactor the company table from the company-list to the company-table we are going to

- Update the component class to be able to receive data 
- Update the component class to be able to emit an event when the delete button is clicked.

To be able to pass data into components and emit events we need the ```@Input``` and ```@Output``` decorators and the ```EventEmitter``` module.

- update the imports for the ```CompanyTable``` component

**src/app/company/company-table/company-table.component.ts**

```
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../company';
```

- Declare an input property to store the companies, and an output property to emit delete events.

**src/app/company/company-table/company-table.component.ts**

```
@Input() companies: Company[];
@Output() deleteCompanyClicked: EventEmitter<number> = new EventEmitter<number>();
```

The updated company-table component should look like this: 

```
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit {
  @Input() companies: Company[];
  @Output() deleteCompanyClicked: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }
}
```


## Update the company-table template to call deleteCompanyClicked
#####TIME: 5 min

- Update the '(click)' event on the button.

**src/app/company/company-table/company-table.component.html**

```
<button class="btn btn-default" (click)="deleteCompany(company)">Delete</button>
```

- Update the component code with the following:

**src/app/company/company-table/company-table.component.ts**

```
  deleteCompany(company: Company) {
    this.deleteCompanyClicked.emit(company.id);
  }
```


> Note that you can also call '.emit()' directly from the template:

**src/app/company/company-table/company-table.component.html**

```
<button class="btn btn-default" (click)="deleteCompanyClicked.emit(company.id)">Delete</button>
```



## Update the html for the company-list component
##### TIME: 5 min

Now that we have moved the company-table out onto a separate control, we need to add that control on the (parent) company-list control.

The company-list component should now look like this: 

**src/app/company/company-list/company-list.component.html**

```
<h1>  
  Companies
  <button class="btn btn-success pull-right">Add</button>
</h1> 
<fbc-company-table [companies]="companies$ | async" (deleteCompanyClicked)="deleteCompany($event)"></fbc-company-table>

```

## EXTRA: Demonstrate OnPush change detection 
##### TIME: 5 min

Presentational Components are deliberately simple: they contain no logic, receive property values from their `@Input` properties and raise events via their `@Output` `EventEmitter`s.

This simplicity makes them the perfect place to start investigating Angular's Change Detection settings. First we will add some debug code to demonstrate how often the Angular framework evaluates a template in with the default change detection strategy.

Add a logging function to your component:
**src/app/company/company-list/company-list.component.ts**

```
    logChanges() {
        console.log('CHANGES !!!');
    }
```

And then call that function directly from your template. Note that binding component functions directly to the template is not recommended - for reasons that will soon become clear!

```
<h1>  
  Companies
  <button class="btn btn-success pull-right">Add</button>
</h1> 
<fbc-company-table [companies]="companies$ | async" (deleteCompanyClicked)="deleteCompany($event)"></fbc-company-table>

{{logChanges()}}

```

Reload the app with the chrome dev tools console open, and you will see that the `logChanges()` function was called many times - indicating that the Angular template was executed many times. 
When binding data into a template, you should bind to properties and not functions as that function will be executed each time the Angular change detection process re-evaluate the angular template.

### OnPush Change detection

The default change detection process in Angular is quite aggressive. It needs to re-evaluate templates frequently to make sure that changes to component properties are applied to the DOM. 
You can change this process to use OnPush Change Detection. This will only re-evaluate the template when:
1. An `@Input` value changes
2. An event (`@Output`) is raised by this component or one of this component's children

Update the change detection strategy in the component's metadata
**src/app/company/company-list/company-list.component.ts**

```

    @Component({
      selector: 'fbc-company-table',
      templateUrl: './company-table.component.html',
      styleUrls: ['./company-table.component.scss'],
      changeDetection: ChangeDetectionStrategy.OnPush
    })
export class CompanyTableComponent implements OnInit {

```

Reload with the chrome dev tools open and you should see that the template is only evaluated twice: when the component first loads and when the `@Input` receives data as loaded from the server.


