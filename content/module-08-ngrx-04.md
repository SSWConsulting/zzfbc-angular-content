## Overview
##### Time: 5min

In this lesson, we will look at getting better strong typing around our action methods and remove all the object creation to a single place.

### Learning Outcomes
- How to make action creators

## Add Action Creators
##### Time: 10min

- Make a new ```company.actions.ts``` file in the actions folder inside the app folder.
- Add the below Action creators

***src/app/reducers/company.actions.ts***

```
import { Action } from '@ngrx/store';
import { Company } from '../company/company';

export const LOAD_COMPANIES = '[Companies] Load';
export const DELETE_COMPANY = '[Companies] Delete';

export class LoadCompanies implements Action {
  readonly type = LOAD_COMPANIES;
  constructor(public payload: Company[]) { }
}

export class DeletCompany implements Action {
  readonly type = DELETE_COMPANY;
  constructor(public payload: number) { }
}

export type All
  = LoadCompanies
  | DeletCompany;


```

## Update companyReducer to use action creators
##### Time: 5min

```
import { Company } from './../company/company';
import { ActionReducer, Action } from '@ngrx/store';
import * as CompanyActions from './../actions/company.actions';

export function companyReducer(state = [], action: CompanyActions.All) {
  switch (action.type) {
    case CompanyActions.LOAD_COMPANIES:
      return action.payload;
    default:
      return state;
  }
}


```

## Update Company Service to use the action creators
##### Time: 5min

***src/app/company/company.service.ts***

```
  loadCompanies(): void {
    this.httpClient.get(`${this.API_BASE}/company`)
      .catch(this.errorHandler)
      .subscribe(companies => this.store.dispatch(new CompanyActions.LoadCompanies(companies)));
  }
```


## Summary
##### Time: 2min

In this module, we replaced our inline objects for dispatching actions to all be in one place with action creators.


