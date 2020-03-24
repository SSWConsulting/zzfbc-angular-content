## Overview
##### Time: 5min

In this lesson, we will add the code required to allow deleting a company record.

### Learning Outcomes: 
- How to call a service method from a button click (via a component)

## Add the delete method to the service
##### Time: 5min

**src/app/company/company.service.ts**

```
deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`);
  }
```

Now, if you try to pipe through our error handler, Typescript will give you an error:

```
deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(catchError(this.errorHandler));
  }
```

The reason is that errorHandler is returning an Observable of Company[], where deleteCompany is supposed to return an Observable of Company.

The best way to fix the issue is to make our errorHandler generic :

**src/app/company/company.service.ts**

- Change errorHandler function :

```
    private errorHandler<T>(error: Error): Observable<T> {
        console.error('implement custom errort handler here', error);
        return new Observable<T>();
    } 
```

- Change pipe(catchError) calls :
```
    getCompanies(): Observable<Company[]> {
        return this.httpClient.get<Company[]>(`${this.API_BASE}/company`) 
        .pipe(
            tap(x => console.log('TAP - Service', x)),
            catchError(e => this.errorHandler<Company[]>(e))
          );
    }

    deleteCompany(company: Company): Observable<Company> {
        return this.httpClient.delete<Company>(`${this.API_BASE}/company/${company.id}`)
        .pipe(catchError(e => this.errorHandler<Company>(e)));
    }
```

## Add the delete method to the component
##### Time: 5min

**src/app/company/company-list/company-list.component.ts**

```
  deleteCompany(companyId: number) {
    this.companyService.deleteCompany(companyId)
      .subscribe(() => this.getCompanies());
  }
```
## Add 'id' to the Company model
##### Time: 2min

- Open the company model and add the 'id' as an optional number

**src/app/company/company.ts**

```
export interface Company {
    id?: number;
    name: string;
    email: string;
    phone: number;
}
```
## Wire up the delete button
##### Time: 5min

- Open the company-list template and add the ```(click)``` event the delete button.

**src/app/company/company-list/company-list.component.html**

```
<button class="btn btn-default" (click)="deleteCompany(company.id)">Delete</button>
```




