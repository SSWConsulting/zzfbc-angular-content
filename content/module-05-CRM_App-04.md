## Overview
##### Time: 5min

In this lesson, we will create a ```CompanyService``` and inject it into our CompanyListComponent.

### Learning Outcomes: 
- How to generate and use Angular Services.
- How to use Angular dependency injection.


## Create the CompanyService 
##### Time: 5min


- Make a new CompanyService with the CLI by running the following command in the terminal. 

```
 ng generate service company/company --skipTests
```

- Open 'company.service.ts' and inspect the created service.

***src/app/company/company.service.ts***

```
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }
}

```

Note the ```@Injectable``` decorator - this is what registers the class with the Angular dependency injection service as injectable as a service.

Note the ```providedIn: 'root'``` - this attribute lets you define where your provider (service) is registered. 'Root' is the default value, but you can specify any module.
 
## Add the getCompanies function
##### Time: 5min

Next, we are going to add the ```getCompanies``` function to the service.

For the first version of the service, we are going to return a hard coded array as Observable.

- update the service to reflect the following changes

***src/app/company/company.service.ts***

```
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Company } from './company';

@Injectable()
export class CompanyService {

  constructor() { }

  getCompanies () : Company[] {
    return [
      { name: 'company 1', email: 'email 1', phone: 111 },
      { name: 'company 2', email: 'email 2', phone: 111 }
    ];
  }
}
```

Note: 

- We are importing several modules from RxJS. We will discuss RxJS in more detail in a later module.
- The important takeaway here is that we have added the getCompanies method that returns an array of companies.

## Inject CompanyService into CompanyListComponent
##### Time: 2min

To be able to access the ```CompanyService``` from inside the ```CompanyListComponent``` we need to inject the service via the constructor of the component.

- add the following import statement to the company-list component

***src/app/company/company-list/company-list.component.ts***

```
import { CompanyService } from '../company.service';
```

- update the constructor of the company-list component to inject the ```CompanyService```.

***src/app/company/company-list/company-list.component.ts***

```
  constructor(private companyService: CompanyService) { }
```

In the next step, we will use the service we just injected to load companies.

```
    getCompanies() {
        this.companies = this.companyService.getCompanies();
    }
```

## Final code
##### Time: 0min

The files that we modified should now look like this:

***src/app/company/company-list/company-list.component.html***

```
<h1>  
  Companies
  <button class="btn btn-success float-right">Add</button>
</h1> 
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
```

***src/app/company/company-list/company-list.component.ts***

```
import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  companies: Company[];

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this.companies = this.companyService.getCompanies();
  }

}
```

***src/app/company/company.service.ts***

```
import { Injectable } from '@angular/core';
import { Company } from 'src/app/company/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor() { }

  getCompanies(): Company[] {
    return [
      { name: 'company 1', email: 'email 1', phone: 111 },
      { name: 'company 2', email: 'email 2', phone: 111 }
    ];
  }
}
```
## EXTRA: VS Code Chrome Debugger
##### Time: 5min

The best way to debug is still with Chromes dev tools for all the extra analysis but it is surprisingly nice for simple break points to stay in the IDE. 

Follow the latest instructions here to configure debugging the Angular CLI code here 

[https://code.visualstudio.com/docs/nodejs/angular-tutorial](https://code.visualstudio.com/docs/nodejs/angular-tutorial)

![](https://firebootcamp.ghost.io/content/images/2017/07/2017-07-25_19-35-16-1.jpg)

1. Add the below code when prompted after selecting "Add Configuration" under the "Debug" option in VS Codes main menu.
2. You will need the Chrome debugger extension installed
3. Press F5 to run the debugger while you have "ng serve" running on port 4200.

![](https://firebootcamp.ghost.io/content/images/2017/07/reactjs_debugger-for-chrome.png)

***.vscode/launch.json***
```
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "Launch Chrome against localhost",
            "url": "http://localhost:4200",
            "webRoot": "${workspaceRoot}"
        },
        {
            "type": "chrome",
            "request": "attach",
            "name": "Attach to Chrome",
            "port": 9222,
            "webRoot": "${workspaceRoot}"
        }
    ]
}
```ow>
        <ui-row label="Email"  value="{{contact?.email}}" ></ui-row>        
    </div>
    `
})
export class ContactDetailComponent implements OnInit {
   contact: Contact = <Contact>{};

    constructor(
        private contactService: ContactService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.activatedRoute
            .params
            .filter((params: any) => params['id'] !== 'new')
            .subscribe((params) => {
                this.getContact(+params['id']);
            });
    }

    getContact(contactId: number) {
        this.contactService.getContact(contactId)
            .subscribe(contact => this.contact = contact);
    }
}


```


**src/app/contact/contact-detail/contact-detail-component.html**
```
<div class="row heading-row contact-list-component">
	<div class="col-sm-9">
		<h2>Contact: {{contact?.name}}</h2>
	</div>
	<div class="col-sm-3">
		<button routerLink="/contact/edit/{{contact?.id}}" class="btn btn-success pull-right">Edit</button>
	</div>
</div>

<div class="well">
	<div class="row">
		<div class="col-xs-2">Phone</div>
		<div class="col-xs-10">{{contact?.phone}}</div>
	</div>
	<div class="row">
		<div class="col-xs-2">Email</div>
		<div class="col-xs-10">{{contact?.email}}</div>
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
			<td colspan="3">There are no contacts for this contact</td>
		</tr>
	</tbody>
</table>
```


## Create the resuable UIRowComponent for the ContactDetailComponent
##### Time: 5min

We could have just added this logic to the ContactDetailComponent. However, it is another good example of making simple presentational (or dumb) components.

- Create a re-usable row component

**src/app/shared/ui-row.component.ts**

```
import { Input, Component } from '@angular/core';

@Component({
    selector: 'ui-row',
    template: `
        <div class="row">
            <div class="col-{{size}}-{{widthOfLabel}}">{{label}}</div>
            <div class="col-{{size}}-{{widthOfValue}}">{{value}}</div>
        </div>
    `
})
export class UIRowComponent {

    widthOfLabel: number = 3;
    widthOfValue: number = 9;

    @Input() label: string;
    @Input() value: string;
    @Input() size: string = 'xs';

    @Input('labelWidth')
    set rowLabelWidth(value: number) {
        this.widthOfLabel = value;
        this.widthOfValue = 12 - value;
    }
}

```

## Add the ui-row component to the shared module
##### Time: 5min

Becuase we can use this reusable component in any detail component in this app for example in the CompanyModule we want to add it to the SharedModule so it is separate from the lazy loaded files in the CompanyModule or ContactModule. Note we are also adding ReactiveFormsModule to the module as we need several of the form helpers it provides like the ForemBuilder. Having to declare which type of form module we need is a good example of how Modules help specify only the parts of the angular platform you need so at build time the unneeded code can be 'tree shaken' out.

**src/app/shared/shared.module.ts**
```
@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ContactListTableComponent,
        UIRowComponent
    ],
    declarations: [
        ContactListTableComponent,
        UIRowComponent
    ]
})
export class SharedModule { }

```


## Create the Contact Edit Component 
##### Time: 5min

The ContactEditComponent is a container component (smart component) for its child ContactEditFormComponent. It is responsible for getting the data for the Contact to edit from the service and for saving the edited Contact back to the server via the service. It has no understanding of how the form works it just passes in a Contact to edit from the server and listens for Submit events coming from the child presentational component.

- Create the contact edit component

**src/app/contact/contact-edit/contact-edit.component.ts**
```
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Contact } from './../../shared/models';
import { ContactService } from './../contact.service';

@Component({
    selector: 'fbc-contact-edit',
    template: `
    <fbc-contact-edit-form (onSubmit)="saveContact($event)" [contact]="selectedContact"></fbc-contact-edit-form>
    `
})
export class ContactEditComponent implements OnInit {
    selectedContact = <Contact>{ id: 0 };

    constructor(
        private activatedRoute: ActivatedRoute,
        private contactService: ContactService,
        private router: Router
    ) { }

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


## Create the Contact Edit Form Component 
##### Time: 5min

The ContactEditFormComponent uses reactive forms. Reactive forms have a few major benefits over template driven forms:
 1. Form logic is specified in the component logic making it easier to test
 2. You can create your own custom validators. For example checking for a valid email which Angular does not supply out of the box
 3. Being reactive forms, you can subscribe to changes on the form elements as observables

The downside is it takes a little bit of learning how they work and also to map the form elements in the component.

To register a ```<form></form>``` element as a reactive form you need to use a property binding with square brackets  to register a FormGroup ```<form [formGroup]="contactForm">```.  We will get to registering the FormGroup in the component next. To register a form element is simpler in the HTML template than a template driven form and you add a formControl attribute ```<input formControlName="name">``` to the element. Again all the logic for the form is in the component. Submitting the form and checking for form errors is similar except for the name of the property set in the component on the ContactEditFormComponent model.

In the component we need to first import a few Angular helpers from ```import { FormBuilder, FormGroup, Validators } from '@angular/forms';``` specifically for working with reactive forms. The main one here of importance is the FormBuilder which allows a terse syntax to create a FormGroup and its FormControls with validators all in one Object.

```
    buildForm(): void {
        this.contactForm = this.fb.group({
            'name': [this.contact.name, Validators.required],
            'companyId': [this.contact.companyId, Validators.required],
            'address': [this.contact.address],
            'city': [this.contact.city],
            'state': [this.contact.state],
            'postCode': [this.contact.postCode],
            'phone': [this.contact.phone],
            'email': [this.contact.email],
        });
```
***Figure: ForemBuilder group object***


As we can see above the name of the FormGroup is ```contactForm``` which we use in the HTML template on the form element. Each property on the FormGroup object becomes a FormControl we can listen to changes on. At the same, time we can register any validation needed inline. Here you can see the only FormControls with validators are the name and companyId FormControls. The rest of the FormControls are optional. We wrap the FormBuilder in a ```buildForm()``` function we call on ```ngOnInit()```.

Similar to validation in the CompanyEditFormComponents template driven forms we can get a handle of the form elements but, rather than using a template reference to get the form elements we use the FormGroup object and call ```.get('name')``` to access the name input elements FormControl like this ```<div *ngIf="!contactForm.get('name').hasError('required')" class="alert alert-danger">```.

To get a hold of the FormGroups data you can call .value on the companyform which we will do last thing when this presentational component emits the contact object on its onSubmit event ```this.onSubmit.emit(this.contactForm.value;);```


- Create the contact edit form component

**src/app/contact/contact-edit/contact-edit-form.component.ts**
```
import { CompanyService } from '../../company/company.service';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Contact, Company } from '../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
                <option *ngFor="let c of availableCompanies" [value]="c.id">{{c.name}}</option>
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
    @Output() onSubmit = new EventEmitter<Contact>();
    availableCompanies: Company[] = [];
    showAdditionalInfo: boolean;

    contactForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private companyService: CompanyService
    ) { }


    ngOnInit(): void {
        this.loadAvailableCompanies();
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

    loadAvailableCompanies(): void {
        this.companyService.getCompanies()
            .subscribe(companies => {
                this.availableCompanies = companies;
            });
    }

    saveContact(): void {
        this.onSubmit.emit(this.contactForm.value);
    }

}

```


- Add the new components to the Contact Module.

**src/app/contact/contact.module.ts**

```
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactEditComponent } from './../contact/contact-edit/contact-edit.component';

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { routing } from './contact.routes';

@NgModule({
    imports: [SharedModule, routing],
    declarations: [
        ContactListComponent,
        ContactDetailComponent,
        ContactEditComponent,
        ContactEditFormComponent
    ]
})
export class ContactModule { }


```


## Add the ContactDetail and ContactEdit component routes
##### Time: 5min

- in the 'src\app\contact\contact.routes.ts' add these new routes.

**src/app/contact/contact.routes.ts**

```
  { path: 'detail/:id', component: ContactDetailComponent },
  { path: 'edit/:id', component: ContactEditComponent }

```

## Summary
##### Time: 5min

In this module we learnt about reactive forms which should be used for complex forms.