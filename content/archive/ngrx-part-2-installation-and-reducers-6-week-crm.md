## Overview
##### Time: 5min

In this lesson, we will take the CRM app and convert the company list page to use ngrx. In the following lessons, we will explore using more parts of ngrx like action creators and effects.
We will not convert the whole application and hope that this module will inspire you to want to use ngrx in your large or complex applications and will be able to convert the rest of the CRM app with the knowledge you learn in this module.

### Learning Outcomes
- How to install ngrx
- How to create a reducer
- How to configure ngrx
- How to select state from the store and bind these into your HTML templates with the async pipe
- How to dispatch actions against reducers to update the store
- How to avoid mutating state in your app and especially reducers


### Repository code
```
git clone 'https://firebootcamp.visualstudio.com/FireBootCamp.Angular/_git/firebootcamp-crm-2day?version=GBmaster&_a=contents'

git branch -a

git checkout -q ngrx-01
```

## npm install ngrx
##### Time: 10min

Like most JavaScript libraries the best way to install and manage them is through npm

- install npm by running the following command

```
npm install @ngrx/core @ngrx/store --save
```

## Create a company reducer and simple LOAD_COMPANIES action
##### Time: 5min

Before we can configure ngrx in our AppModule, we first need to make at least one reducer to configure it with. In these lessons, we will make only a companyReducer, but in a larger application, you will make many reducers one for each related section of the state. Remember the reducer is a pure function, accepting two arguments, the previous state and an action with a type and optional data (payload) associated with the event.

- Make a new folder called reducers underneath the ```src/app``` folder
- Make a file called ```company.reducer.ts``` in the reducers folder

Notice the reducer is just a function that takes in the current state and the action to change the state. The reducer then implements a switch statement that then updates the state. It is always a good idea to initialise the default state versus leaving it null so that in general your team expects an initial default state as normal. 

Here we have a single action that can be dispatched ```ADD_COMPANIES``` which we will declare as a constant so we can import it around the application. In another lesson, we will implement another way of achieving this with action creators that will give us better type safety, refactoring and terser code for dispatching events.

In this reducer currently if an event of ```ADD_COMPANIES``` is dispatched the reducer will update the store with the actions payload which will be a new array of Companies. It is important to note reducers are immutable, meaning you always create a new object or array when mutating state versus mutating an existing version. You should not push or pop items onto an array for example but rather create a new array with the new properties. To do this, you will need to be proficient at many of the new ES6 array methods like find, filter, map and also the new spread operators for both arrays and object. You will get into a whole bunch of headaches with the stale state being polluted with the new state if you do not strictly follow this principle, so much so many teams utilise a free or immutable.js library to throw errors when team members accidentally mutate state.

**src/app/reducers/companyReducer.ts**
```
import { Company } from './../company/company';
import { ActionReducer, Action } from '@ngrx/store';

export const ADD_COMPANIES = 'ADD_COMPANIES';

export function companyReducer(state = [<Company>{}], action: Action) {
    switch (action.type) {
        case ADD_COMPANIES:
            return action.payload;
        default:
            return state;
    }
};

```

## How to configure ngrx in the AppModule
##### Time: 5min

**src/app/app.module.ts**
```
import { companyReducer } from './reducers/company.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    routing,
    StoreModule.provideStore({ companies: companyReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Create a interface for the AppState
##### Time: 5min

To be able to have strong typing and the benefits of TypeScript in our ngrx code we need to add some interfaces for our ngrx code.

- Add a new folder called models inside the core folder.
- Add a new interface called ```appState``` for our ngrx code.

***src/app/core/models/appState.ts***

```
import { Company } from '../../company/company';

export interface AppState {
    companies: Company[];
}

```

***src/app/core/models/index.ts***
```
export * from '../../company/company';
export * from '../../contact/contact';
export * from './appState';
```



## Subscribe to the store and replace the CompanyListComponents approach to getting the companies

##### Time: 5min

```

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../../core/models/appState';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companies$: Observable<Company[]>;

  constructor(
    private store: Store<AppState>,
    private companyService: CompanyService) {
    this.companies$ = this.store.select(state => state.companies);
  }

  ngOnInit() {
    this.loadCompanies();
  }

  loadCompanies() {
    this.companyService.loadCompanies();
  }

  deleteCompany(companyId: number) {
    this.companyService.deleteCompany(companyId);
  }
}



```

## Update the CompanyService to dispatch events
##### Time: 5min- update the CompanyService to ```loadCompanies```

***src/app/company/company.service.ts***

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Store } from '@ngrx/store';

import { Company } from './company';
import { ADD_COMPANIES } from 'app/reducers/companyReducer';

@Injectable()
export class CompanyService {
  API_BASE = 
  'http://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private http: Http,
    private store: Store<Company[]>) { }

  loadCompanies(): void {
    this.http.get(`${this.API_BASE}/company`)
      .map((response) => response.json())
      .catch(this.errorHandler)
      .subscribe(companies => this.store.dispatch({
        type: ADD_COMPANIES,
        payload: companies
    }));
  }

```

## Update the ContactEditComponent that uses the Company list
##### Time: 5min

We need to refactor which is awesome and gives a chance to reflect on the best practices we are implementing
```
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from './../../shared/models';
import { ContactService } from './../contact.service';
import { Store } from '@ngrx/store';
import { Company } from '../../company/company';
import { Observable } from 'rxjs/Observable';
import { AppState } from '../../shared/models/appState';

@Component({
    selector: 'fbc-contact-edit',
    template: `
    <fbc-contact-edit-form 
        (onSubmit)="saveContact($event)" 
        [companies]="companies$ | async"
        [contact]="selectedContact">
    </fbc-contact-edit-form>
    `
})
export class ContactEditComponent implements OnInit {
    selectedContact = <Contact>{ id: 0 };
    companies$: Observable<Company[]>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private contactService: ContactService,
        private store: Store<AppState>,
        private router: Router
    ) {
        this.companies$ = this.store.select(state => state.companies);
    }

    ngOnInit(): void {
        this.activatedRoute.params
            .filter((params: any) => params['id'] !== 'new')
            .subscribe((params) => {
                this.getContact(+params['id']);
            });
    }

    getContact(contactId: number) {
        this.contactService.getContact(contactId)
            .subscribe(contact => {
                this.selectedContact = contact;
            });
    }

    saveContact(contact: Contact) {
        this.contactService.saveContact(contact)
            .subscribe(c => {
                this.router.navigate([`/contact/detail`, c.id]);
            });
    }

}

```

```
import { CompanyService } from '../../company/company.service';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Contact, Company } from './../../shared/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'fbc-contact-edit-form',
    template: `
    <h2>Edit Contact</h2>  
    <div class="well">
    <form [formGroup]="contactForm" novalidate>
        <div class="form-group">
            <label for="name">Name</label>
            <input type="text" class="form-control" name="name" required formControlName="name">
            <div *ngIf="contactForm.get('name').hasError('required') && contactForm.get('name').touched" class="alert alert-danger">
                Name is required
            </div>
        </div>
        <div class="form-group">
            <label for="companyId">Company</label>
            <select class="form-control" name="companyId" required formControlName="companyId">                
                <option *ngFor="let c of companies" [value]="c.id">{{c.name}}</option>
            </select>
            <div *ngIf="contactForm.get('companyId').hasError('required') && contactForm.get('companyId').touched" class="alert alert-danger">
                Company is required
            </div>
        </div>
        <div *ngIf="showAdditionalInfo">
            <div class="form-group">
                <label for="address">Address</label>
                <input type="text" class="form-control" name="address" formControlName="address" />
            </div>
            <div class="form-group">
                <label for="city">City</label>
                <input type="text" class="form-control" name="city" formControlName="city" />
            </div>
            <div class="form-group">
                <label for="state">State</label>
                <input type="text" class="form-control" name="state" formControlName="state" />
            </div>
            <div class="form-group">
                <label for="postCode">Post Code</label>
                <input type="text" class="form-control" name="postCode" formControlName="postCode" />
            </div>
            <div class="form-group">
                <label for="phone">Phone</label>
                <input type="text" class="form-control" name="phone" formControlName="phone" />
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" name="email" formControlName="email" />
            </div>
            </div>
        <div class="form-group">
            <button (click)="saveContact()" [disabled]="!contactForm.valid" class="btn btn-default" >Submit</button>
            <button type="button" class="btn btn-link" *ngIf="!showAdditionalInfo" 
            (click)="showAdditionalInfo = true">Show Additional Information
            </button>
            <button type="button" class="btn btn-link" *ngIf="showAdditionalInfo" 
            (click)="showAdditionalInfo = false">Hide Additional Information
            </button>
        </div>
    </form>
    </div>
    `
})
export class ContactEditFormComponent implements OnInit {
    @Input() contact;
    @Input() companies;
    @Output() onSubmit = new EventEmitter<Contact>();
    showAdditionalInfo: boolean;

    contactForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private store: Store<Company[]>
    ) { }


    ngOnInit(): void {
        this.buildForm();
    }

    buildForm(): void {
        this.contactForm = this.fb.group({
            name: ['', Validators.required],
            companyId: ['', Validators.required],
            address: [''],
            city: [''],
            state: [''],
            postCode: [''],
            phone: [''],
            email: [''],
        });
    }

    saveContact(): void {
        this.onSubmit.emit(this.contactForm.value);
    }

}
```

## Dispatch and action to delete a store
##### Time: 10min

Now we have implemented out ADD_COMPANIES reducer we can start to implement some more actions. We will now add the DELETE_COMPANIES action to consolidate our learning. 

### Update the ```company.reducer```

- First add another action method of DELETE_COMPANIES then add another case to the switch statement that will create a new array minus the company to delete.

***src/app/reducers/company.reducer.ts***
```
export function companyReducer(state = [<Company>{}], action: Action) {
export const ADD_COMPANIES = 'ADD_COMPANIES';
export const DELETE_COMPANIES = 'DELETE_COMPANIES';

export function companyReducer(state = [<Company>{}], action: Action) {
    switch (action.type) {
        case ADD_COMPANIES:
            return action.payload;
        case DELETE_COMPANIES:
            return state.filter(company => company.id !== action.payload.id);
        default:
            return state;
    }
};
```

- Second update the company service delete method to dispatch an action.

***src/app/company/company.service.ts***
```
    deleteCompany(companyId: number): void {
         this.http.delete(API_BASE + `company/${companyId}`)
            .map((company: Response) => company.json())
            .catch(this.handleError)
            .subscribe(companies => this.store.dispatch({ type: DELETE_COMPANIES, payload: companies }));
    }
```

## Summary
##### Time: 3min

In this lesson we have add the ngrx library to the CRM app and implemented the reduc pattern for adding and deleting companies.

