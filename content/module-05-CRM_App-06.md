## Overview
##### Time: 5min

In this lesson, we will use Angular's Http Client Module to make a real request.

### Learning Outcomes: 
- How to make Http requests to a web server
- How to subscribe to an observable
- How to manage error handling
- How to use RXJS operators through .pipe() function

## Call a real API from CompanyService
##### Time: 10min

The ```CompanyService``` currently returns an in-memory list. 

The following changes will enable the service to call a real back-end, hosted on Microsoft Azure.

 - Add the `HttpClientModule` to your `app.module`. From version  1.1  of the angular cli, the HttpClientModule is not included by default.

**src/app/app.module.ts**

```
import { HttpClientModule } from '@angular/common/http';
```
```
 imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
```

- Import the Http, Headers, RequestOptions and Observable into the service

**src/app/company/company.service.ts**

```
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
```

- Add a property for the ```API_BASE``` and inject the Http module into the component.

**src/app/company/company.service.ts**

```
@Injectable()
export class CompanyService {
  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  constructor(private httpClient: HttpClient) { }

}
```

- Update the ```getCompanies``` method to call the API endpoint on Azure 
```
 getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`);
  }
```

- update the component to call the updated service

**src/app/company/company-list/company-list.component.ts**

```
  getCompanies() {
    this.companyService.getCompanies()
      .subscribe(companies => this.companies = companies);
  }
```

- Refresh your browser. The list of companies now being shown is coming from the Microsoft Azure API! 

## Add error handling to the service
##### Time: 5 min

- Import the RxJS operators at the top of the file.

```
import { catchError } from 'rxjs/operators';
```

- add a catchError to the HTTP request in case of an error

**src/app/company/company.service.ts**

```
  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
      .pipe(catchError(this.errorHandler));
  }
```

- add the error handler to the service

**src/app/company/company.service.ts**

```

  private errorHandler(error: Error): Observable<Company[]> {
    console.error('implement custom errort handler here', error);
    return new Observable<Company[]>();
  }

 // 1/ return union type so 400(bad request), 422(unprocessable) and 404(notfound)
 // 2/ return an empty observable means it is completed
 // 3/ use http interceptor and move this logic to a globale handler vs 500(server error)

}


```

## Using the async pipe
##### Time: 5 min

Introduced with Angular 4, the async pipe provides a way for us to bind observables directly into our templates without manually subscribing in our components.

- Add an Observable import to CompaniesList component

```
import { Observable } from 'rxjs';
```

- update the type of the companies collection to be an `Observable`. Note the $ suffix on the property name. This is a convention used to label observable properties.

```
public companies$: Observable<Company[]>;
```

- update the `getCompanies()` method to remove the subscription and pass the observable directly to `companies$`
```
getCompanies() {
    this.companies$ = this.companyService.getCompanies();
}
```

- update the template to use the async pipe.  

```
<tr *ngFor="let company of companies$ | async">
```


## Using RXJS .pipe()
##### Time: 5 min

RxJS operators can be applied anywhere on Observables to perform operation. We've seen how to add a "catchError" to handle our errors in the Service. We can also add pipe() in our Component to perform any operation required.

- Add 'tap' & 'finalise' operators both in Service and Component :

**src/app/company/company.service.ts**

```
    import { tap, finalize } from 'rxjs/operators';
    
    ...
    
    getCompanies(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
          .pipe(
            tap(x => console.log('TAP - Service', x)),
            catchError(this.errorHandler)
          );
      }
```


**src/app/company/company-list/company-list.component.ts**

```
    import { tap, finalize } from 'rxjs/operators';
    
    ...

     ngOnInit() {
        this.companies$ = this.companyService.getCompanies()
          .pipe(
            tap(x => console.log('TAP - Component', x)),
            finalize(() => console.log('Finalize: Complete'))
          );
      }
```

'tap' operator let you Transparently perform actions or side-effects, such as logging. 
(https://www.learnrxjs.io/operators/utility/do.html)

'finalize' let you call a function (callback) when the observable completes.
(https://www.learnrxjs.io/operators/utility/finalize.html)

You can chain as many RxJS operators as you need to implement any complex scenario.

## EXTRA RxMarbles
##### Time: 10 min

- RxMarbles (https://rxmarbles.com/) is an awesome website that lets you play with an interactive representation of all Rx Operators
- It is very useful in understanding how the most common RxJS operators work