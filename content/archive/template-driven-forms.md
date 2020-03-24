## Overview:
##### Time: 5min

In this lesson, we will create data entry screens for managing Companies using template driven forms.

- We will create a CompanyService that can be used to talk to a back-end API.
- We will create a CompanyList component that renders a list of contacts
- We will create a CompanyDetail component that shows a single Companies details
- We will create the ability to add and edit companies via the CompanyEdit component 

Once we have completed this lesson, we will add the ability to add contacts to each company. 

### Learning Outcomes:
- How to perform the common create, read, update and delete functionality often found in forms-over-data applications using template driven Angular forms 

### Repository code for complete project
```
git clone 'https://firebootcamp:Angular2rocks!@firebootcamp.visualstudio.com/FireBootCamp.Angular/_git/firebootcamp-crm
```

## Create the shared models and config 
##### Time: 5min

Before we can start building our data-entry components, we need to have our data service.

Before we can start working with our data service, we need to have

1. The location of the service
2. The models that the service will work with

Because both of these pieces of information are used throughout the application, we store them in the 'shared' module.

#### Create a config file

We need to get our data from somewhere, and this is usually an HTTP end-point. We will save this endpoint in a config file.

In the 'src' folder create 'app.config.ts'.

**src/app/app.config.ts**

```
export const API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api/';

```

>Note: Contact your mentor for instructions on how to download the API and run it locally on your machine.

## Add the company and contact model files
##### Time: 5min

Under their corresponding feature folders create a new file for Company model and Contact model

**src/app/company/company.ts**
```
export interface Company {
    id: number;
    name: string;
    phone: string;
    email: string;
}

```

**src/app/contact/contact.ts**
```
export class Contact {
    id: number;
    companyId: number;    
    name: string;
    address: string;
    city: string;
    state: string;
    postCode: string;
    phone: string;
    email: string;
    companyName: string;
}

```

**src/app/shared/models/index.ts**
```
export * from '../../company/company';
export * from '../../contact/contact';
```

To save writing an import statement for every model file we create it can be easier to make a 'Barrel.' A barrel is a collection of exported things you can then reference from one file. We will add the models to a barrel like above to make it easy to import many models without having multiple import statements at the top of each file.

## Create the Company Service
##### Time: 5min

We will add a company service to keep our company feature components 'skinny' as they do should be responsible for the logic that drives their HTML templates but not for HTTP request. It also means we avoid duplicate code by sharing the logic and error handling across multiple components. In Angular, it is encouraged to make many small components, and this then pushes more responsibility into the Angular services than ever before.

- In the 'src\company' folder create 'company.service.ts'

**src/app/company/company.service.ts**
```
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

import { API_BASE } from '../app.config';
import { Company } from './../shared/models/company.model';

@Injectable()
export class CompanyService {

    constructor(private _http: Http) { }

    getCompanies(): Observable<Company[]> {
        return this._http.get(API_BASE + 'company')
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }

    getCompany(companyId: number): Observable<Company> {
        return this._http.get(API_BASE + `company/${companyId}`)
            .map((companies: Response) => companies.json())
            .catch(this.handleError);
    }

    addCompany(company: Company): Observable<Company> {

        let companyJson = JSON.stringify(company);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.post(API_BASE + `company`, companyJson, options)
            .map((response: any) => response.json())
            .catch(this.handleError);
    }


    updateCompany(company: Company): Observable<Company> {

        let companyJson = JSON.stringify(company);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        return this._http.put(API_BASE + `company/${company.id}`, companyJson, options)
            .map((response: any) => response.json())
            .catch(this.handleError);
    }

    deleteCompany(companyId: number): Observable<Company> {
        return this._http.delete(API_BASE + `company/${companyId}`)
            .map((companies: Response) => companies.json())
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

Below you can see we are newing up new Headers in a RequestOptions object for our post and put requests. Because of the backend API set up we have but it very common to need to add custom headers to any application. Adding authentication tokens to the headers is how most people authenticate their Angular applications. You do not have to do it like this in each request and could add this logic to a helper function in a separate file and share it like we do the config file. One step better is to intercept every HTTP request and add on the auth tokens without having to add this code to all HTTP request by overriding the base class responsible for making HTTP requests like discussed here http://stackoverflow.com/questions/35498456/what-is-httpinterceptor-equivalent-in-angular2.

```
let companyJson = JSON.stringify(company);
let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });
```

## Add the Company Service to the core.module.ts Providers
##### Time: 5min

Even though we are lazy loading the logic for the Company and Contacts feature modules the services we will share across both features. For this reason, we will register these services in the main AppModule. If you are confident your service is only ever used in a certain feature module, then you could register it in that modules providers. However, it is most common to register them at the top level.

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
