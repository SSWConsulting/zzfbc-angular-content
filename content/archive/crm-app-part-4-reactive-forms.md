## Overview:
##### Time: 5min

In this lesson, we will create data entry screens for managing Contacts using template driven forms.

- We will create a ContactList component that renders a list of contacts
- We will create a ContactDetail component that shows a single ContactDetail
- We will create the ability to add and edit contacts via the ContactEdit component 

### Learning Outcomes:
Many parts of the ContactModule or feature will be the same as the last lesson for making the CompanyModule feature, except we will be using reactive forms. So the ContactListComponent, ContactService, ContactModule and routing will be the same except for the word Contact versus Company. The main difference will be the ContactEditComponent and ContactEditFormComponent inwhich will use reactive forms (also known as model-driven forms).

- How to perform the common create, read, update and delete functionality often found in forms-over-data applications using reactive Angular forms 

### Repository code for complete project
```
git clone 'https://firebootcamp:Angular2rocks!@firebootcamp.visualstudio.com/FireBootCamp.Angular/_git/firebootcamp-crm
```

## Create the Contact List  and Contact List Table Components
##### Time: 5min

**src/app/contact/contact-list/contact-list-table.component.ts**

- The contact detail for the View and Edit buttons will not work until we finsih implementing the components and wire up the routing towards the end of this module.

- in the 'src/app/contact/contact-list' folder create 'contact-list-table.component.ts'

```
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from './../../shared/models';

@Component({
    selector: 'fbc-contact-list-table',
    template: `
     <table class="table table-hover table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Company Name</th>
                    <th>Email</th>
                    <th></th>
                </tr>
            </thead>
            <tr *ngFor="let contact of contacts">
                <td>{{contact.name}}</td>
                <td>{{contact.companyName}}</td>
                <td>{{contact.email}}</td>
                <td class="button-column">
                    <button routerLink="/contact/detail/{{contact.id}}" class="btn btn-default" >Details</button>
                    <button routerLink="/contact/edit/{{contact.id}}" class="btn btn-default" >Edit</button>
                    <button (click)="confirmDelete(contact)" class="btn btn-default delete-btn">Delete</button>
                </td>
            </tr>
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
export class ContactListTableComponent {
    @Input() contacts: Contact[] = [];
    @Output() deleteContactSelected = new EventEmitter<number>();

    confirmDelete(contact: Contact) {
        let confirmed = confirm(`Are you sure you want to delete ${contact.name}?`);

        if (confirmed) {
            this.deleteContactSelected.emit(contact.id);
        }
    }
}


```

**src/app/contact/contact-list/contact-list.component.ts**
```
import { Component, OnInit } from '@angular/core';
import { Contact } from './../../shared/models';
import { ContactService } from './../contact.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
    template: `   
        <div class="row heading-row contact-list-component">
            <div class="col-sm-9">
                <h2>Contacts</h2>
            </div>
            <div class="col-sm-3">
                <button routerLink="/contact/edit/new" class="btn btn-success pull-right">Add</button>
            </div>
        </div>
        <div class="row">  
            <div class="col-sm-12">   
            <fbc-contact-list-table 
                (deleteContactSelected)="deleteContact($event)" 
                [contacts]="contacts">
            </fbc-contact-list-table>
            </div>
        </div>  
    `
})
export class ContactListComponent implements OnInit {
    contacts: Contact[];
    result: any;

    constructor(
        private contactService: ContactService) {
    }

    ngOnInit() {
        this.getcontacts();
    }

    getcontacts() {
        this.contactService.getContacts()
            .subscribe((contacts: Contact[]) => this.contacts = contacts);
    }

    deleteContact(contactId: number) {
        this.contactService.deleteContact(contactId)
            .subscribe((deletedContact: Contact) => {
                this.contacts = this.contacts.filter((contact: any) => contact.id !== deletedContact.id);
            });
    }

}

```

## Create the Contact Detail Component
##### Time: 5min

**src/app/contact/contact-detail/contact-detail-component.ts**
```
import { ActivatedRoute } from '@angular/router';
import { ContactService } from './../contact.service';
import { Component, OnInit } from '@angular/core';
import { Contact } from './../../shared/models/contact.model';

@Component({
    selector: 'fbc-contact-detail',
    template: `
    <div class="row heading-row company-list-component">
        <div class="col-sm-9">
            <h2>{{contact?.name}}</h2>
        </div>
        <div class="col-sm-3">
            <button routerLink="/contact/edit/{{contact?.id}}" class="btn btn-success pull-right">Edit</button>
        </div>
    </div>
    <div class="well">
        <ui-row label="Company" value="{{contact?.company}}" ></ui-row>
        <ui-row label="Address" value="{{contact?.address}}" ></ui-row>
        <ui-row label="City" value="{{contact?.city}}" ></ui-row>
        <ui-row label="State" value="{{contact?.state}}" ></ui-row>
        <ui-row label="PostCode" value="{{contact?.postCode}}" ></ui-row>
        <ui-row label="Phone" value="{{contact?.phone}}" ></ui-row>
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