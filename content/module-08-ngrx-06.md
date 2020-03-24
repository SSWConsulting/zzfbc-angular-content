## Overview
##### Time: 5min

In this lesson, we will add the delete companies ability to be managed by ngrx.

### Learning Outcomes
- How add to a reducer


## Update the companyReducer
##### Time: 10min

Now we have implemented out ADD_COMPANIES reducer we can start to implement some more actions. We will now add the DELETE_COMPANIES action to consolidate our learning. 

- Add another action method of DELETE_COMPANIES in the companyReducer - Add another case to the switch statement that will create a new array minus the company to delete.

***src/app/actions/company.actions.ts***

```
import { Action } from '@ngrx/store';
import { Company } from '../company/company';

export const LOAD_COMPANIES = '[Companies] Load';
export const LOAD_COMPANIES_SUCCESS = '[Companies] Load Success';
export const LOAD_COMPANIES_ERROR = '[Companies] Load Error';
export const DELETE_COMPANY = '[Companies] Delete';
export const DELETE_COMPANY_SUCCESS = '[Companies] Delete Success';
export const DELETE_COMPANY_ERROR = '[Companies] Delete Error';

export class LoadCompanies implements Action {
  readonly type = LOAD_COMPANIES;
}

export class LoadCompaniesSuccess implements Action {
  readonly type = LOAD_COMPANIES_SUCCESS;
  constructor(public payload: Company[]) { }
}

export class LoadCompaniesError implements Action {
  readonly type = LOAD_COMPANIES_ERROR;
}

export class DeleteCompany implements Action {
  readonly type = DELETE_COMPANY;
  constructor(public payload: number) {}
}

export class DeleteCompanySuccess implements Action {
  readonly type = DELETE_COMPANY_SUCCESS;
  constructor(public payload: number) { }
}

export class DeleteCompanyError implements Action {
  readonly type = DELETE_COMPANY_ERROR;
}

export type All
  = LoadCompanies
  | LoadCompaniesSuccess
  | LoadCompaniesError
  | DeleteCompany
  | DeleteCompanySuccess
  | DeleteCompanyError;

```

***src/app/reducers/company.reducer.ts***
```
import { Company } from './../company/company';
import { ActionReducer, Action } from '@ngrx/store';
import * as companyActions from './../actions/company.actions';
import { LOAD_COMPANIES_SUCCESS } from '../actions/company.actions';

export function companyReducer(state = [], action: companyActions.All) {
  switch (action.type) {
    case companyActions.LOAD_COMPANIES_SUCCESS:
      return action.payload;
    case companyActions.DELETE_COMPANY_SUCCESS:
          return state.filter(company => company.id !== action.payload);
    default:
      return state;
  }
}

```

## Update the effect
##### Time: 5min 
***src/app/effect/company.effect.ts***
```
import { Injectable } from '@angular/core';
import { CompanyService } from '../company/company.service';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import * as companyActions from './../actions/company.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class CompanyEffects {

  @Effect() loadCompanies$ = this.actions$
    .ofType(companyActions.LOAD_COMPANIES)
    .switchMap(() => {
      return this.companyService.loadCompanies()
        .map(companies => (new companyActions.LoadCompaniesSuccess(companies)))
        .catch(() => of(new companyActions.LoadCompaniesError()));
    });

  @Effect() deleteCompany$ = this.actions$
    .ofType(companyActions.DELETE_COMPANY)
    .map(toPayload)
    .switchMap(companyId => {
      return this.companyService.deleteCompany(companyId)
        .map(company => (new companyActions.DeleteCompanySuccess(company.id)))
        .catch(() => of(new companyActions.DeleteCompanyError()));
    });

  constructor(
    private companyService: CompanyService,
    private actions$: Actions
  ) { }
}

```

## Update the CompanyService
##### Time: 10min

- Update the company service delete method to dispatch an action.

***src/app/company/company.service.ts***
```
  deleteCompany(companyId: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${companyId}`);
  }
```

update deleteCompany function in the company list component.

***src/app/company/company-list.component.ts***

```
  deleteCompany(companyId: number) {
    this.store.dispatch(new companyActions.DeleteCompany(companyId));
  }
```

## Summary
##### Time: 2min

In this module, we saw how easy it is to add more methods to an existing reducer and to swap out old methods in the service. 