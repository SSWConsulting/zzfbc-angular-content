## Overview  
##### Time: 5 mins

In this module, we will learn how to setup a basic State Management using RXJS Behavior Subjects

### Learning Outcomes:
- How to implement state management in Angular using RXJS BehaviorSubject

## Add a company counter to the AppComponent
##### Time: 5 mins

Let's add an indicator, next to the application title, to display the number of companies currently in our CRM application. In a real life scenario, the same method could be used to display a shopping cart for example, or any information relative to the current state of the application.

- open the app component and add a companyCount property, reading from our Company Service

***src/app/app.component.ts***
```
export class AppComponent implements OnInit {

  constructor(
    private companyService: CompanyService
  ) {}

  title = 'Melbourne :) ';
  prodMode: boolean;
  companyCount$ : Observable<number>;

  ngOnInit(): void {
    this.prodMode = environment.production;
    this.companyCount$ = this.companyService.getCompanies().pipe(map(c => c.length))
  }
}
```

- Add a company in the navigation

***src/app/app.component.html***
```
...
    <li class="nav-item" [routerLinkActive]="'active'">
        <a class="nav-link" [routerLink]="['/company/list']">
          Companies (<span id="company-count">{{ companyCount$ | async }}</span>)
        </a>
    </li>
...
```

- Notice that we are now displaying the number of companies in the CRM when the page loads... but it does not update when we remove or add a company !

- This is because there is no way for the app component to know that the list of companies has changed. 

> Note that we added an ID to the companyCount$ container span - this will be used later on when writing integration tests

## Change CompanyService to use BahviorSubject
##### Time: 15 mins

Let's update our Service to manage to use BehaviorSubject. 
A BehaviorSubject is a special kind of Observable, being also an Observer. This allows us to not only subscribe to it, but also publish new values to the stream.

Instead of managing the Observable<Company[]> in each component, the service itself will hold the "State" of the company list, allowing different component to get updated in real time.

- add a BehaviorSubject<Company[]> property to the CompanyService

***src/app/company/company.service.ts***
```
  companies$ : BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([])
```

- Change getCompanies() to loadCompanies(), updating our BehaviorSubject 

***src/app/company/company.service.ts***
```
    loadCompanies(){
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
        ...
    ).subscribe(c => {
      this.companies$.next(c);
    });
  }
```

Note that we can apply here any rxjs operator

- Add a getCompanies() to return the BehaviorSubject

***src/app/company/company.service.ts***
```
  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }
```

- Change our service actions to reload the companies after each action

***src/app/company/company.service.ts***
```
deleteCompany(id: number) {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(this.errorHandler)
    )
    .subscribe(() => this.loadCompanies());
  }

  addCompany(company: Company){
    return this.httpClient.post<Company>(`${this.API_BASE}/company`,
     company,
     { headers: new HttpHeaders().set('content-type', 'application/json')})
     .pipe(
       catchError(this.errorHandler)
     ).subscribe(() => this.loadCompanies());
  }

  getCompany(companyId: number): Observable<Company>{
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  updateCompany(company: Company) {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json')})
    .pipe(
      catchError(this.errorHandler)
    )
    .subscribe(() => this.loadCompanies());
  }
```

***src/app/company/company-edit/company-edit.component.ts***
```
  saveCompany(): void {
    if (this.isNewCompany) {
      this.companyService.addCompany(this.companyForm.value);
    } else {
      const newCompany: Company = {...this.companyForm.value, id: this.companyId}
      this.companyService.updateCompany(newCompany);
    }
    this.router.navigateByUrl('/company/list');
  }
```

- Finally, load the companies calling getCompanies() in the service constructor

***src/app/company/company.service.ts***
```
 constructor(private httpClient: HttpClient) {
    this.loadCompanies();
  }
```


## Observe the results
##### Time: 1 min

Now, our service itself holds the state of our company list. We just implemented our first state management.

As the service itself (singleton) holds the list of companies, the components subscribe to the same Observable. Whenever this observable changes, the new stream value is emitted and all the components (Observers) update accordingly.

More complex scenarios ?
See NGRx : https://docs.google.com/presentation/d/1_nDVY7qIcM7jGI_yWSaRcjcmRz0aNAEMsA837OHWrsI/edit#slide=id.g244087087b_0_1013
