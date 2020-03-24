## Overview
##### Time: 5min

In this lesson, we will introduce routing by moving the company list onto its own route.

### Learning Outcomes: 
- How to route to a component

## Define the routes in app.routes.ts
##### Time: 5 min

- In the 'app' folder the cli auto created us an 'app-routing.module.ts' file.
- Add the following code to app.routes.ts

**src/app/app-routing.module.ts**

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';

const routes: Routes = [
      { path:  '',  redirectTo:  'company/list',  pathMatch:  'full' },
      { path:  'company/list',  component:  CompanyListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

## Import the routes into the App module
##### Time: 5 min

- Inspect the auto-imported required modules from the cli 

**src/app/app.module.ts**

```
import { AppRoutingModule } from './../app-routing.module.ts';
```

- Import the appRoutes constant into the app module.

**src/app/app.module.ts**

```
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
```

## Add a router-outlet to the template
##### Time: 5 min

- Inspect the template for the app component to see the router-outlet (where the routing is embedded).
- You can remove the hard coded value for the CompanyListComponent

**src/app/app.component.html**

- Add navbar HTML

```
<nav class="navbar navbar-light bg-faded">
  <a class="navbar-brand">FireBootCamp CRM</a>
  <ul class="navbar-nav ml-auto">
    <li class="nav-item" [routerLinkActive]="'active'">
      <a class="nav-link" [routerLink]="['/company/list']">Companies</a>
    </li>
  </ul>
</nav>
<div class="container">
  <router-outlet></router-outlet>
</div>
```
**src/app/app.component.scss**

- Add navbar styling

```
.navbar {
    flex-direction: row;
    margin-bottom: 10px;
}
```

## Adding the Edit component
##### Time: 10 min

- Open a command prompt and generate a new company service.

```
ng generate component company/company-edit --skipTests
```

- Open the list component and edit the 'Add' button to route to the new edit component.

***src/app/company/company-list/company-list.component.html***

```
<button class="btn btn-success float-right" [routerLink]="['/company/add']">Add</button>
```

- Import the new component into the app routes and add the route to allow navigating to the component.

Your app.routes.ts should now look like this:

***src/app/app-routing.module.ts***

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'company/list', pathMatch: 'full' },
  { path: 'company/list', component: CompanyListComponent },
  { path: 'company/add', component: CompanyEditComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```

- Try out clicking add and navigating to the new EditComponent.

> Note that for the purpose of this demonstration, we decided to have two routes ('/edit' and '/new') leading to the same component, but we could have used '/edit/0' or '/edit/new'

