## Overview
##### Time: 5min

In this lesson, we will use reactive forms to build the functionality to allow us to add new customers to the database.

### Learning Outcomes: 
- How to build reactive forms
- How to use [FormControl](https://angular.io/api/forms/FormControl) and [FormGroup](https://angular.io/api/forms/FormGroup) classes
- How to obtain query string parameters

## Add reactive forms to the module
##### Time: 2 mins

To be able to create reactive forms, we first need to add the ReactiveFormsModule to our app module. 

- Open the app module and update the import line for ```FormsModule``` to include ```ReactiveFormsModule```.

***src/app/app.module.ts***

```
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
```

- Add the ```ReactiveFormsModule``` to the ```imports``` array.

***src/app/app.module.ts***

```
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
```


## Build the Edit component
##### Time: 10 min

- Open the company-edit component and import the required modules for working with forms, the router, and our companies

***src/app/company/company-edit/company-edit.component.ts***
```
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../company.service';
import { Company } from '../company';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
```

- Update the company-edit component constructor. 

***src/app/company/company-edit/company-edit.component.ts***

```
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private companyService: CompanyService,
    private fb: FormBuilder) { }
```

- Declare the properties required on the component.

***src/app/company/company-edit/company-edit.component.ts***
 
```
  companyId: any;
  isNewCompany: boolean;
  companyForm: FormGroup;
```

- When the component is loaded get the 'id' property from the route and use this to determine if you are creating a new company or editing an existing one.

***src/app/company/company-edit/company-edit.component.ts***

```
  ngOnInit() {
    this.companyId = this.activatedRoute.snapshot.params.id;
    this.isNewCompany = !this.companyId;
    this.buildForm();

    if (!this.isNewCompany) {
      // TODO:
      // this.getCompany();
    }
  }
```

- Add the ```buildForm``` method to construct the reactive form. 


***src/app/company/company-edit/company-edit.component.ts***

```
  buildForm(): void {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: [''],
    });
  }
```

> Note: Using FormBuilder service is a shortcut to the following syntax:
> ```
> this.companyForm = new FormGroup({
>     name: new FormControl('', Validators.required),
>     email: new FormControl(),
>     phone: new FormControl()
>  });
> ```
## Adding the form template
##### Time: 10 min

Now that we have created the form on the component, we can declare the user interface for our reactive form.

- Build the HTML template for the form.

***src/app/company/company-edit/company-edit.component.html***

```
<form [formGroup]="companyForm" novalidate>  
  <div class="form-group">
    <label for="name">Name</label>
    <input type="text" class="form-control" name="name" formControlName="name">
    <div *ngIf="companyForm.get('name').hasError('required') && companyForm.get('name').touched" class="alert alert-danger">
      Name is required
    </div>
  </div>
  <div class="form-group">
    <label for="phone">Phone</label>
    <input type="text" class="form-control" name="phone" formControlName="phone" />
  </div>
  <div class="form-group">
    <label for="email">Email</label>
    <input type="text" class="form-control" name="email" formControlName="email" />
  </div>
  <div class="form-group">
    <button type="button" (click)="saveCompany()" [disabled]="!companyForm.valid" class="btn btn-default">Submit</button>
  </div>
</form>  
```


## Update the Company service
##### Time: 5 min

- Update the component ```saveCompany``` method to pass the value of the form to the service.

***src/app/company/company-edit/company-edit.component.ts***

```
  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value)
        .subscribe(() => this.router.navigate(['/company/list']));
    }
  }
```

- Import the ```Company``` interface into the service

***src/app/company/company.service.ts***

```
import { Company } from './company';
```

- Import the HttpHeaders module from HttpClientModule into the service

***src/app/company/company.service.ts***

```
import {HttpClient, HttpHeaders } from '@angular/common/http';
```

- Add the 'addCompany' method to the service.

***src/app/company/company.service.ts***

```
  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(
      `${this.API_BASE}/company`, company, { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(e => this.errorHandler<Company[]>(e));
  }
```
