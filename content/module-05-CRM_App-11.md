## Overview
##### Time: 5min

In this lesson, we will build on the work we did in the previous lesson to allow editing companies.

## Add navigation to the 'Edit' button
##### Time: 1 min

- Add the routerLink to the edit button on the company table.

***src/app/company/company-table/company-table.component.html***
```
<button class="btn btn-default" [routerLink]="['/company/edit', company.id]">Edit</button>
```


## Implement the getCompany logic
##### Time: 5 min

- If we determine from the route params that we are editting an existing component 
- load the component from the database.

***src/app/company/company-edit/company-edit.component.ts***

```
ngOnInit() {
  this.companyId = this.activatedRoute.snapshot.params.id;
  this.isNewCompany = !this.companyId;
  this.buildForm();

  if (!this.isNewCompany) {
    this.getCompany();
  }
 }

  getCompany():void {
    this.companyService.getCompany(this.companyId)
      .subscribe(company => {
        this.companyForm.patchValue(company);
      });
  }
```


- Update the company service to be able to query a single company.

***src/app/company/company.service.ts***

```
  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
      .pipe(catchError(e => this.errorHandler<Company[]>(e));
  }
```

## Implement the saveCompany logic
##### Time: 5 min

- Update the component to call updateCompany instead of addCompany if the company already exists.

***src/app/company/company-edit/company-edit.component.ts***

```
  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value)
        .subscribe(() => this.router.navigateByUrl('/company/list'));
    } else {
      const newCompany = {...this.companyForm.value, id: this.companyId };
      this.companyService.updateCompany(newCompany)
        .subscribe(() => this.router.navigateByUrl('/company/list'));
    }
  }
```

- Update the company service to contain a method to update a company.

***src/app/company/company.service.ts***

```
  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(
      `${this.API_BASE}/company/${company.id}`, company,
      { headers: new HttpHeaders().set('content-type', 'application/json') }
    ).pipe(catchError(e => this.errorHandler<Company[]>(e));
  }
```

## EXTRA : Dynamic Reactive Forms
##### Time: 10min
Reactive Forms make dynamic validation easy to implement. In this section, we will see a very simple example of dynamic validation for the Phone number.

### Add a checkbox to the Edit form

***src\app\company\company-edit\company-edit.component.html***
```
    <div class="form-group">
      <label for="phone">Phone</label>
      <input type="text" class="form-control" name="phone" formControlName="phone" />
    </div>
    <div *ngIf="companyForm.get('phone').hasError('required')" class="alert alert-danger">
        Phone number is required
    </div>
```

***src\app\companycompany-edit\company-edit.component.ts***
```
  buildForm(){
    this.companyForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: [''],
      phone: [''],
      checkPhone: []
    });
  }
```

- Add checkbox control to the Form
- Add the checkPhone property to the form object

### Add the logic for validation
Reactive Forms controls exposes useful Observables, such as "valueChanges", which emits new values everytime it changes.

***src\app\companycompany-edit\company-edit.component.ts***
```
...
    this.companyForm.get('checkPhone').valueChanges
    .subscribe(value => {
      if(value){
        this.companyForm.get('phone').setValidators(Validators.required)
      }else{
        this.companyForm.get('phone').clearValidators();
      }
      this.companyForm.get('phone').updateValueAndValidity();
    });
...
```

- Subscribe to the valueChanges observable
- if 'value' is true (checkbox ticked), set 'Required' validator on 'phone' control
- if 'value' is false, reset validators and update validity

