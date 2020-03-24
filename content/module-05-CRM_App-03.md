## Overview
##### Time: 5min

In this lesson, we will add the [BootStrap](http://getbootstrap.com/) HTML, CSS, and JS framework for developing responsive websites.

### Learning Outcomes: 
- How to install third party dependencies
- How to include CSS style sheets in CLI build process
- Learn some basic BootStrap 

## Install bootstrap
##### Time: 2min

### Installing Bootstrap

Now with Angular 6+, we can use the 'ng add' command to do most of the work for us.

- Run the following commands to install Twitter Bootstrap for Angular into your project. 

```
ng add @ng-bootstrap/schematics  
```

If you open the 'package.json' file, which lists the npm packages for your project you will now see 'bootstrap' with the version number of the installed version.

If you check the 'node modules' folder in your project you will find a folder that contains all the files for Twitter Bootstrap.

Note that the following steps used to be manual but are now automatic thanks to the new Angular CLI.

### Check that bootstrap has been added to the project
- Open the Angular CLI config file - '.angular.json'
- Find the 'Styles' element
- Note that a reference to the CSS file for Bootstrap has been added, so that the Bootstrap CSS is bundled with the project.

***angular.json***

```
"styles": [
   "styles.scss",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
],
```

Registering bootstrap CSS in angular.json bundles it along and makes the Bootstrap CSS classes available.

### Bootstrap Ng Modules
Bootstrap also provides angular components (https://ng-bootstrap.github.io/#/home)

***src/app/app.module.ts***
```
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    CompanyListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
// ...code abbreviated
```

- Note the NgBootstrap module has been added to the AppModule.

- Restart the CLI with the below command. You should notice the Bootstrap styling is applied to the text on the page and the font has changed from serif to sans serif.

```
ng serve
```

You can now use Ngb components, such as bootstrap's Datepicker

```
<ngb-datepicker></ngb-datepicker>
```

## Make a companies table
##### Time: 5min

Let's update the HTML we use to show a nice table format of the companies list.

### Update the company-list component template

To nicely output the list of companies, follow the steps below.

- Open the company-list components' template
- Replace ```{{companies | json}}``` with the following HTML table, which includes Bootstrap styling


***src/app/company/company-list/company-list.component.html***

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
      <td></td>
     </tr>
  </tbody>
</table>
```

### Add a Bootstrap well to the fbc-root template

- Add Bootstrap container CSS class to AppComponents HTML template

***src/app/app.component.html***

```
<div class="container">
  <fbc-company-list></fbc-company-list>
</div>
```

## Add delete and edit buttons
##### Time: 2min

In the next module, we will add the ability to edit and delete companies.

Follow the steps below to add the buttons:

- Add the buttons to a new column for company edit and delete actions.

***src/app/company/company-list/company-list.component.html***

```
<td>{{company.name}}</td>
<td>{{company.email}}</td>
<td>{{company.phone}}</td>
<td class="company-row">
   <button class="btn btn-default">Edit</button>
   <button class="btn btn-default">Delete</button>
</td>
```

- Add the CSS class for formatting the table row.

***src/app/company/company-list/company-list.component.scss***

```
.company-row {
    width: 140px;
    white-space: nowrap
}
```
Notice how the custom CSS class was scoped to this component only when the build added a suffix to the end of the CSS class name.

![](https://firebootcamp.ghost.io/content/images/2017/07/2017-07-25_22-53-25.jpg)

## Add title and new Company button
##### Time: 2min

Next, we will add a title and an "Add" button to the top of the page above the table.

- Add the following H1 element and title to the top of the company-list component

***src/app/company/company-list/company-list.component.html***
```
<h1>
  Companies
   <button class="btn btn-success float-right">Add</button>
</h1>
```

> None of the buttons are wired up yet. We will revisit the button actions once we have a working CompanyService and router

## Final code
##### Time: 0min

Your company-list component template should now look like this:

***src/app/company/company-list/company-list.component.html***

```
<h1>  
  Companies
  <button class="btn btn-success float-right">Add</button>
</h1> 
<div class="table-responsive">
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
        <button class="btn btn-default">Delete</button>
      </td>
    </tr>
  </tbody>
</table> 
</div>
```

## EXTRA: Using Sass
##### Time: 10min

In this step, we will explore using Sass versus CSS.You can read more about Sass here http://sass-lang.com/guide.

- Change the .angular.json config to use Sass versus CSS. 
- Restart the server for the changes to take effect.

***.angular.json***
```
{
  ...
    "schematics": {
        "@schematics/angular:component": {
            "styleext": "sass"
        }
    },
   ...
   "styles": [
        "src/styles.sass"
    ],
    ...


```

***src/styles.scss***
```
/* You can add global styles to this file, and also import other style files */
$main-color: red;
```

- Add a Sass import for the global Sass variables.
- Add some nested Sass styles to the table header to be red with white text.


***src/app/company/company-list/company-list.component.scss***

```
@import "~styles.scss";

table {
  th {
    background-color: $main-color;
    color: white;
  }
}

.company-row {
  width: 140px;
  white-space: nowrap
}
```

- Update the ```StylesUrls``` in the component meta-data.

```
@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
``` though we are lazy loading the logic for the Company and Contacts feature modules the services we will share across both features. For this reason, we will register these services in the main AppModule. If you are confident your service is only ever used in a certain feature module, then you could register it in that modules providers. However, it is most common to register them at the top level.

- in the 'src\core\core.module.ts' file add to the providers array the CompanyService to register it with Angulars Dependancy Injection system.

```
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    //services that we want to declare globally will go here
    CompanyService
  ],
})

```


## Create the CompanyList Component and ComanyListTable Component
##### Time: 10min

There are two types of components 'dumb' and 'smart' components. Dumb components normally have no dependencies and no logic and just have @Inputs() and @Outputs(). Smart components are the parent components that would have multiple dependencies and logic but not necessarily an HTML template. Aiming to keep the components that display data 'dumb' makes them much easy to reuse in your application and less buggy, but many people do not like the terms smart and dumb components as a dumb component may just have less logic versus none. Many people and SSW included preferring the terms container and presentational components for these reasons. 

To follow best practices, we will make a container component for the CompanyListComponent and a presentational component for the CompanyListTableComponent. The ComanyListTableComponent has no knowledge of how to get or mutate data; it is a true presentational component and just receives data from its parent component and emits events if a Company is to be deleted. The logic to handle the routing to a selected Company is achieved with a routerLink directive in HTML template further reducing the need for the presentational component to have any dependencies.

>Note: Ensure you add a new reference to register all new component, services and directives to their related module. For example we would need to add a reference to the declarations array in the CompanyModule for the below component.


**src/app/company/company-list/company-list-table.component.ts**

- in the 'src/app/company/company-list' folder create 'company-list-table.component.ts'

```
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Company } from './../../shared/models';

@Component({
    selector: 'fbc-company-list-table',
    template: `
     <table id="company-list-table" class="table table-hover table-striped company-list-table-component">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
               <tr *ngIf="companies?.length === 0">
                   <td colspan="4">No companies to display</td>
               </tr>
               <tr class="item" *ngFor="let company of companies">
                    <td>{{company.name}}</td>
                    <td>{{company.phone}}</td>
                    <td>{{company.email}}</td>
                    <td class="button-column">
                        <button routerLink="/company/detail/{{company.id}}" class="btn btn-default" >Details</button>
                        <button routerLink="/company/edit/{{company.id}}" class="btn btn-default" >Edit</button>
                        <button (click)="confirmDelete(company)" class="btn btn-default">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    `,
    styles: [
        `
        .button-column {
            white-space: nowrap;
        }
        `
    ]
})
export class CompanyListTableComponent {
    @Input() companies: Company[] = [<Company>{}];
    @Output() deleteCompanySelected = new EventEmitter<number>();

    confirmDelete(company: Company) {
        let confirmed = confirm(`Are you sure you want to delete ${company.name}?`);

        if (confirmed) {
            this.deleteCompanySelected.emit(company.id);
        }
    }
}

```

- in the 'src\company\company-list' folder create 'company-list.component.ts'

The CompanyListComponent is an example of a container component that has a dependency on the CompanyService, and its main role is to pass data to and display the CompanyListTableComponent.

**src/app/company/company-list/company-list.component.ts**
```
import { Component, OnInit } from '@angular/core';
import { Company } from './../../shared/models';
import { CompanyService } from './../company.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    template: `   
        <div class="row heading-row company-list-component">
            <div class="col-sm-9">
                <h2>Companies</h2>
            </div>
            <div class="col-sm-3">
                <button routerLink="/company/edit/new" class="btn btn-success pull-right">Add</button>
            </div>
        </div>
        <div class="row">  
            <div class="col-sm-12">   
            <fbc-company-list-table 
                (deleteCompanySelected)="deleteCompany($event)" 
                [companies]="companies">
            </fbc-company-list-table>
            </div>
        </div>  
    `
})
export class CompanyListComponent implements OnInit {
    companies: Company[];
    result: any;

    constructor(
        private companyService: CompanyService) {
    }

    ngOnInit() {
        this.getcompanies();
    }

    getcompanies() {
        this.companyService.getCompanies()
            .subscribe((companies: Company[]) => this.companies = companies);
    }

    deleteCompany(companyId: number) {
        this.companyService.deleteCompany(companyId)
            .subscribe((deletedCompany: Company) => {
                this.companies = this.companies.filter((company: any) => company.id !== deletedCompany.id);
            });
    }

}

```

## Create the Company Detail Component
##### Time: 5min

The CompanyDetailComponent has the first of two types of Angular forms called 'template driven forms.' The other type of form call 'reactive forms' we will introduce in the next module. Template driven forms have all the form logic specified in the HTML template and might be simpler to make at first they are difficult to access in the component logic, you can not use custom validation rules and listen to changes dynamically. In general, you will want to use reactive forms except for the simplest of forms. However, once you know reactive forms, you will be best to use these all the time even for simple forms. Some people consider template driven forms as 'angular 1x forms' and reactive forms as 'the way angular forms should be.' 

It is still possible to get access to the ```companyForm``` declared in the HTML using a ```@ViewChild('companyForm') public companyForm: NgForm;``` in the component logic, but at this point, it would be better to use a reactive form instead.


The benefits to template driven forms are that they are simple if you are coming from angular 1x and you can use ngModel with them for easy model data binding.

- The company detail for the View and Edit buttons will not work yet until we finish wiring up the components and routing at the end of this lesson.

**src/app/company/company-detail/company-detail-component.ts**
``` 
import { ContactService } from './../../contact/contact.service';
import { ActivatedRoute, Router} from '@angular/router';
import { CompanyService } from './../company.service';
import { Component, OnInit } from '@angular/core';

import { Company, Contact } from './../../shared/models';

@Component({
    selector: 'fbc-company-detail',
    templateUrl: './company-detail.component.html',
    styles: [
        `.row {padding-top:10px; } `
    ]
})
export class CompanyDetailComponent implements OnInit {
    editMode: boolean = false;
    company: Company = <Company>{ name: '' };
    contacts: Contact[] = [];
    selectedContact: Contact;
    companyId: number;

    constructor(
        private companyService: CompanyService,
        private activatedRoute: ActivatedRoute,
        private contactService: ContactService,
        private router: Router
    ) { }

    ngOnInit() {
        this.activatedRoute
            .params
            .filter((params: any) => params['id'] !== 'new')
            .subscribe((params) => {
                this.companyId = +params['id'];
                this.getCompany(this.companyId);
            });
    }

    updateContact(contact: Contact) {
        this.contactService.saveContact(contact)
            .subscribe(c => this.loadContacts(this.companyId));
    }

    editContact(contact: Contact) {
        this.selectedContact = contact;
        this.router.navigateByUrl(`/contact/contact-edit/${contact.id}`);
    }

    getCompany(companyId: number) {
        this.companyService.getCompany(companyId)
            .subscribe((company: Company) => {
                this.company = company;
            });
        this.loadContacts(companyId);
    }

    loadContacts(companyId: number) {
        this.contactService.getContactsForCompany(companyId)
            .subscribe(contacts => {
                this.contacts = contacts;
            });
    }

}

```


**app/company/company-detail/company-detail-component.html**
```
<div class="row heading-row company-list-component">
    <div class="col-sm-9">
        <h2>Company: {{company?.name}}</h2>
    </div>
    <div class="col-sm-3">
        <button routerLink="/company/edit/{{company?.id}}" class="btn btn-success pull-right">Edit</button>
    </div>
</div>

<div class="well">
    <div class="row">
        <div class="col-xs-2">Phone</div>
        <div class="col-xs-10">{{company?.phone}}</div>
    </div>
    <div class="row">
        <div class="col-xs-2">Email</div>
        <div class="col-xs-10">{{company?.email}}</div>
    </div>
</div>

<h3>Contacts</h3>

<table class="table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr *ngFor="let c of contacts">
            <td>{{c.name}}</td>
            <td>{{c.phone}}</td>
            <td>{{c.email}}</td>
            <td class="text-right">
                <button type="button" routerLink="/contact/detail/{{c.id}}" class="btn btn-default">View</button>
                <button type="button" (click)="editContact(c)" class="btn btn-default">Edit</button>
            </td>
        </tr>
        <tr *ngIf="!contacts || contacts.length == 0">
            <td colspan="3">There are no contacts for this company</td>
        </tr>
    </tbody>
</table>
```


## Create the Company Edit Component 
##### Time: 5min

- Create the company edit component

To make a form an Angular template driven form you need to give the form a local template reference ```#companyForm="ngForm"```. The name will then give you access to all the angular form properties like isDirty, valid, untouched and more.

To make an add input or other element to the form object we need to do three things:

1. Add [(ngModel)]="company.name" to bind the form element to the model
2. Add name="name"
3. Add #name="ngModel" to be able to reference the form element in the validation

With this mark up, we have an angular form and also access to each form element all in the HTML template. We can now add the below validation content, and if the name field is not valid and is touched by a user, then the validation will kick in and show the div with the validation message.

```
<div [hidden]="name.valid || name.untouched" class="alert alert-danger">
    Name is required 
</div>
```


**app/company/company-edit/company-edit.component.ts**
```
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from './../../shared/models/company';
import { CompanyService } from './../company.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'fbc-company-edit',
    template: `
    <h2>Edit Company</h2>
    <div class="well">
    <form (ngSubmit)="saveCompany()" #companyForm="ngForm">
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" name="name" required [(ngModel)]="company.name" #name="ngModel">
            <div [hidden]="name.valid || name.untouched" class="alert alert-danger">
                Name is required 
            </div>
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input type="text" class="form-control" name="phone" [(ngModel)]="company.phone" #phone="ngModel">            
        </div>
        <div class="form-group">
            <label for="email">Email</label>
            <input type="text" class="form-control" name="email" required [(ngModel)]="company.email" #email="ngModel">
            <div [hidden]="email.valid || email.untouched" class="alert alert-danger">
                Email is required
            </div>
        </div>
        <button type="submit" class="btn btn-default" [disabled]="!companyForm.form.valid">Submit</button>
    </form>
    </div>
    `
})
export class CompanyEditComponent implements OnInit {
    formSubmitted: boolean = false;
    company: Company = <Company>{ name: '', phone: '', email: '' };

    constructor(
        private companyService: CompanyService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute
            .params
            .filter((params: any) => params['id'] !== 'new')
            .subscribe((params) => {
                let id = +params['id'];
                this.getCompany(id);
            });
    }

    getCompany(companyId: number) {
        this.companyService.getCompany(companyId)
            .subscribe((company: Company) => {
                this.company = company;
            });
    }

    saveCompany() {
        let id = this.activatedRoute.snapshot.params['id'];
        this.formSubmitted = true;

        if (id === 'new') {
            this.companyService.addCompany(this.company)
                .subscribe(
                newCompany => { this.router.navigate([`/company/detail`, newCompany.id]); }
                );
        } else {
            this.companyService.updateCompany(this.company)
                .subscribe(
                () => this.router.navigate([`/company/detail`, this.company.id])
                );
        }
    }

}


```

## Create and add the Contact Service 
##### Time: 5min

As we are listing the related contacts on the CompanyDetailComponent we will need to add the below ContactService to be able to get them. The service is also the same as the CompanyService. Except for the below code that calls the API for the related contacts. Then as per the CompanyService, we will need to register the service with a provider.

```
    getContactsForCompany(companyId: number): Observable<Contact[]> {
        return this._http.get(API_BASE + `contact/getbycompany/${companyId}`)
            .map((contacts: Response) => contacts.json())
            .catch(this.handleError);
    }
```

- Create the contact service 

**app/contact/contact.service.ts**
```

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

import { Contact } from './../shared/models';
import { API_BASE } from '../app.config';

@Injectable()
export class ContactService {

    constructor(private _http: Http) { }

    getContacts(): Observable<Contact[]> {
        return this._http.get(API_BASE + `contact`)
            .map((contacts: Response) => contacts.json())
            .catch(this.handleError);
    }

    getContact(id: number): Observable<Contact> {
        return this._http.get(API_BASE + `contact/${id}`)
            .map((contacts: Response) => contacts.json())
            .catch(this.handleError);
    }

    getContactsForCompany(companyId: number): Observable<Contact[]> {
        return this._http.get(API_BASE + `contact/getbycompany/${companyId}`)
            .map((contacts: Response) => contacts.json())
            .catch(this.handleError);
    }

    saveContact(contact: Contact): Observable<Contact> {
        let contactJson = JSON.stringify(contact);

        if (contact.id) {
            // Update using PUT
            return this._http.put(API_BASE + `contact/${contact.id}`, contactJson, this.jsonHeaderOptions())
                .map(response => response.json())
                .catch(this.handleError);
        }

        // Create using POST        
        return this._http.post(API_BASE + `contact`, contactJson, this.jsonHeaderOptions())
            .map(response => response.json())
            .catch(this.handleError);
    }

    deleteContact(contactId: number): Observable<Contact> {
        return this._http.delete(API_BASE + `contact/${contactId}`)
            .map((contacts: Response) => contacts.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    private jsonHeaderOptions() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return new RequestOptions({ headers: headers });
    }
}

```

## Add the Contact Service to the core.module.ts Providers
##### Time: 5min

- in the 'src\core\core.module.ts' file add to the providers array the ContactService to register it with Angulars Dependancy Injection system.

**src/app/core/core.module.ts**
```
@NgModule({
  imports: [],
  exports: [],
  declarations: [],
  providers: [
    //services that we want to declare globally will go here
    CompanyService,
    ContactService
  ],
})

```


## Add the CompanyDetail and CompanyEdit component routes
##### Time: 5min

Finally, we need to create the route objects for the new CompanyEditComponent and CompanyListComponent and ensure the components declared in the  CompanyModule.

- in the 'src\app\company\company.routes.ts' add these new routes.

**src/app/company/company.routes.ts**

```
  { path: 'detail/:id', component: CompanyDetailComponent },
  { path: 'edit/:id', component: CompanyEditComponent },

```

### Add the CompanyDetail and CompanyEdit component references to the Company module

- in the 'src/app/company/company.module.ts' add these new declarations.

**src/app/company/company.module.ts**

```
  @NgModule({
    imports: [
        SharedModule, 
        routing, 
        FormsModule
        ],
    declarations: [
        CompanyListComponent,
        CompanyDetailComponent,
        CompanyEditComponent,
        CompanyListTableComponent
        ]
})
export class CompanyModule { }

```

## Summary
##### Time: 5min

In this module we explored the first way to make forms in ANgular using template driven forms.
