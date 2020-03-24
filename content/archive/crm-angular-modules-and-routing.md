## Overview
##### Time: 5min

In this lesson, we will create a framework that we can use to explore building a forms-over-data application.

- We will create three feature folders and put one component in each feature folder (home, contacts, companies).
- We will create a class to store the routes for each of these feature folders
- We will import the separate routes files into our top-level route module 'app.routes.ts'
- We will add the routing module from app.routes.ts to our application in app.module.ts
- We will add some styling to our application
- We will add navigation to our application to demonstrate navigating between the three components  

Once we have completed this lesson, we will expand upon the companies and contacts features to teach how to build a typical data-entry application. 

### Learning Outcomes: 
- How to create multiple features, and navigate between them
- Understanding how to create modules, and the modules we create by default

### Repository code for complete project
```
git clone 'https://firebootcamp:Angular2rocks!@firebootcamp.visualstudio.com/FireBootCamp.Angular/_git/firebootcamp-crm
```

## Understanding Angular Modules
##### Time: 5min

One of the coolest features of Angular 2 is the ability to lazy load the required JavaScript as you navigate around the application. 

Remember how Angular 1 (and most other JavaScript frameworks) work. When you first load the application, it downloads all of the JavaScript for the whole application into the user's browser. 

The application that we are going to build is going to have three sections, and each of these will be a separate Angular Module

- The Home module. It requires almost no JavaScript. It just serves the first page.
- The Company module. It is used for maintaining Companies.
- The Contacts module. It it is used for maintaining Contacts.

What's cool about Angular 2 is that with Angular Modules when we first navigate to the application and the home page opens it will only download the code for the Home module (which will be tiny as it doesn't do anything).

If the user then navigates to the Companies section, the JavaScript for the companies module will be downloaded.

When the user navigates to the Contacts module, the JavaScript just for that modules will be downloaded.

Cool hey! 

It's obvious that on large applications this is going to result in much, much better performance. 

## Inspect AppModule - the Root Module
##### Time: 10min

Every app has a Root Module that is bootstrapped to launch the application.

As the application grows, we will add feature modules and then import them into the root module. (e.g. the ContactModule and the CompanyModule)

Open the root module. 

**src/app/app.module.ts**
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Notice that

- we use the `@NgModule` decorator to define the metadata for the module.
- the 'declarations' array defines which components, directives, and pipes belong to the module.
   - the AppComponent is the created when the application is created and is included in the AppModule

- the 'imports' array defines components, directives, and pipes needed by the components in this module.
  - we import BrowserModule which is used for many common directives like `NgIf` and `NgFor`.
  - we import FormsModule to make template-driven forms available
  - we import HttpModule to enable the ability to call API endpoints 

- the 'providers' array declares services declared at the application level that any component can use.
- the 'bootstrap' property indicates the component that will place in the DOM when the application launches.

## Create the Shared and Core modules
##### Time: 5min

Before we start building out the functional modules of our application we want to introduce two new modules.
The 'Shared' module and the 'Core' module.

The 'Shared' module

- holds common components, directives, and pipes and allows them to be shared with any modules that need them.
  
  i.e.,. If the ContactsModule and the CustomerModule both need a custom SpecialDatePickerComponent that we have created, we would add that component to the SharedModule. 
- Most components in the system will need the FormsModule and the HttpModule, so it makes sense to include them once on the shared module to save importing them on all the feature-specific modules.

The 'Core' module

- holds application-wide singeton providers that we will import once when the application starts, and never import anywhere else.
  
  i.e., If you have a service (e.g. a UserService) that you want to be created once and shared amongst different components in different modules, it should be specified in the CoreModule.
- helps to keep the 'AppModule' from becoming too cluttered.


### Create the Shared module

- in the 'src/app/shared' folder create a new file called 'shared.module.ts'

- add the following code

**src/app/shared/shared.module.ts**
```
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
    ],
    declarations: [
    ]
})
export class SharedModule { }
```

Notice in the above code 

- we import the CommonModule because the SharedModule needs common directives
- we re-export CommonModule, RouterModule, and the forms Modules.

  The shared module will be imported by most of the other modules in the application.
  By exporting CommonModule, RouterModule and the forms modules we enable all of those modules not to need to include those imports themselves.

For more information on the Shared Module refer to the [Angular.IO docs for Shared Module](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#shared-module)



### Create the Core module

Services are used throughout Angular 2 and for many of our services we require them to be instantiated once and only once.

A common mistake that is made is that shared services are declared in the 'Shared' module. The danger with this is that each time the Shared module is instantiated within a lazy-loaded component a new instance of its services is created. Especially when dealing with services that maintain state, this is a problem.

Rather than declaring all of these services in the AppModule (which would allow them to be only instantiated once) the best practice [as per the Angular documentation](https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-module) is to create a Core module, declare the globally available services in the Core module, and import the Core module into the App module. 

- in the 'src' folder, create a new folder called 'core.'

- in the 'src\core' folder create a new file called 'core.module.ts'

- add the following code

**src/app/core/core.module.ts**
```
import { NgModule } from '@angular/core';


@NgModule({
    imports: [],
    exports: [],
    declarations: [],
    providers: [
      //services that we want to declare globally will go here
    ],
})
export class CoreModule {}

```

Notice in the above code

- we have created a module whose sole purpose is to declare application wide singleton services
- we will import those services into the Core module and then include them in the `providers` array.


Update the App module to import the Core module


**/src/app/app.module.ts**
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoreModule }   from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### Check Point

Run the application and ensure that everything is working correctly.

Yikes.. all that work and it looks the same.

Yes. We've just added a fair bit of structure for no visible outcome, but this is important in large applications to ensure that we head off down the right track




## Add styling to the application
##### Time: 5min

Before we go and add our new modules and components to the application, let's add some styling, so those components look nice.

- On 'index.html': 
    - Add a link to the Twitter Bootstrap style sheet to the `<head>`.
    - Add the 'content' class to the `<body>` element. 

**src/index.html**
```
...
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet">
</head>
<body  class="content">
  <fbc-root>Loading...</fbc-root>
</body>

```
 

- open styles.css and add the bootstrap styling that we will use for the application.

**src/styles.css**
```
.content {
    margin-top: 55px;
}

.button-column {
    width: 150px;
}

.heading-row
{
    padding-top:20px;
    padding-bottom:10px;
}

.heading-row h2 {
    margin: 0px;
    padding: 0px;
}

.ng-valid[required], .ng-valid.required  {
  border-left: 5px solid #42A948; /* green */
}

.ng-invalid:not(form)  {
  border-left: 5px solid #a94442; /* red */
}
```


## Introducing Routing Between Components
##### Time: 10min

The basics of routing are easy.

1. We create multiple components
2. We put a `<router-outlet>` element on the page. The path of the application will determine what is rendered in the router-outlet 
3. We create some 'routing configuration' that tells our app 'when this path is navigated to, render this particular component in the router-outlet'.

To define the top level configuration for the router we *could* hard wire in our routing as follows

*bad example - hard wired routes in top level routing*
```
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { CompanyListComponent } from './company/company.list.component';
import { ContactListComponent } from './contact/contact.list.component';

const appRoutes: Routes = [
    
    { path: '', component: HomeComponent  },
    { path: 'contacts', component: ContactListComponent  },
    { path: 'companies', component: CompanyListComponent  },
    
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
```

How this works is straightforward

- all of the components that need to be navigated to are imported into the routing component
- an array of routes is created. Each route contains a path and maps to a component
- when that path is entered onto the URL, the associated component is loaded into a specified area of the screen (the 'router-outlet')

For example

- when the app loads and there is no extra path information, it will display the HomeComponent in the DOM where the `<router-outlet>` tag exists
- when I click a link that navigates to '/contacts' or enter that in the browser the ContactListComponent will be rendered in the router-outlet

This approach has two drawbacks

- for a large application the routing file is going to become huge.
- all of the JavaScript for the components is going to be downloaded in one chunk as they are all going to be in the same module.

A much better approach is to

- have one top-level routing configuration
- have separate feature areas divided up into modules.

  Each module will contain multiple components and the routing information required for navigating within those components. 

- the top level config will know about the modules but will know to only load them into memory when they are navigated to.

We are going to start down this road by adding a light-weight 'home' component.



## Create the Home component
##### Time: 5min

As we've mentioned, when an Angular 1 application first loaded, ALL the JavaScript for the application was downloaded, but with Angular 2 we only need to download the JavaScript that we need as we navigate around our application.

A good practice is to create a 'Home' module and component that contains minimal functionality for a super-fast initial page-load, and then when your user chooses the area of the application that they would like to navigate to, to then download the JavaScript just for that module.

What we are going to do next is create the 'Home' page for our application.

To this, we are going to do the following

1. create the component
2. create the routing for the module
3. create the module for the component
4. setup the top level routing to know about our HomeComponent
5. add the router-outlet to app.component.html


#### Add the Home component to the project

To make that happen, we are going to create a HomeModule, with a very simple HomeComponent.

- under the 'src\app' folder create a new folder called 'home'

- add the home component 'home.component.ts'

**src/app/home/home.component.ts**
```
import { Component } from '@angular/core';

@Component({
    template: `
     <h1>Welcome to the FireBootCamp CRM App</h1>
    `
})
export class HomeComponent { }

```

#### Define the routes for the Home module

- add the routes for the home module 'home.routes.ts'

**src/app/home/home.routes.ts**
```
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', component: HomeComponent}
]);

```

Notice that this is the default route.

If no path is entered into the URL, the HomeComponent will be rendered.

#### Create the home module

- add the home module. This is the module that will be responsible for all the functionality of the 'home' feature.
  
**src/app/home/home.module.ts**
```
import { NgModule } from '@angular/core';

import { HomeComponent }   from './home.component';
import { routing } from './home.routes';

@NgModule({
    imports: [routing],
    exports: [],
    declarations: [HomeComponent],
})
export class HomeModule { }

```

Note that the only interesting code here is that the routes from 'home.routes.ts' are imported into the module.


#### Test it out

Nothing happens! (I'm sure you knew this was going to happen.)

We have created a module, specified it's routes and created a component, but we have not wired it into the broader application yet.

We will do that next.

## Configure Routing for the Application
##### Time: 5min

To wire up routing in the application we need to

- create the top level configuration for the router
- import the router configuration into the App module
- update the index.html to include a router-outlet (where we want to render where we navigate to)


#### Define our top level routes


We are going to configure our top level routing to lazily load the routing from the Home module, when there is no path information.

- Create 'app.routes.ts' in the app folder

- Add the following code to 'app.routes.ts'

```
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

```

The route included above is the root of the application (path:''). 

Instead of navigating to a component using `{ path: '', component: HomeComponent  },`  the 'loadChildren' syntax is used to point to a module that has associated routing. 

The property `{ path: '', loadChildren: 'app/home/home.module#HomeModule' },` tells the router the path to the routing configuration before the '#' and the module name after it. So in this example the path is 'app/home/home.module' and the module name is 'HomeModule'.

#### Update the App Module: Import components and routes

For the application to know to load the top level routing configuration, it must be specified in the App module.

- Open 'app.module.ts'
  - import the 'routing' module from app.routes
    `import { routing } from './app.routes';`
  - add 'routing' to the imports array

- the app module should now resemble the following

```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoreModule }   from './core/core.module';

import { routing } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```


#### Update the App Component template with the router-outlet


Instead of rendering a single component on our App component, we are now going to add a router-outlet element that will render the component that is currently being navigated to.

Because we also intend to add modules for Company and Contacts, we will also put some simple Twitter Bootstrap navigation in place.

- open 'app.component.html' and make the following changes to the template

```
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">FireBootCamp Angular - CRM</a>
    </div>
    <ul class="nav navbar-nav pull-right">
      <li><a routerLink="company">Companies</a></li>
      <li><a routerLink="contact">Contacts</a></li>
    </ul>
  </div>
</nav>
<div class="main container">
  <router-outlet></router-outlet>
</div>
```

- notice in the above
  - we are using a Twitter Bootstrap navbar
  - `<a class="navbar-brand" href="/">FireBootCamp Angular - CRM</a>` is a link to the root of the application
  - `<a [routerLink]="['companies']">Companies</a>` links to the companies component (not yet created)
  - `<a [routerLink]="['contacts']">Contacts</a>` links to the contacts component (not yet created)

  

#### Inspect your handiwork

When you run the application, you are now presented with the nicely formatted AppComponent template, and within the router-outlet the HomeComponent will be rendered.


## Create the Companies component
##### Time: 5min

Now that we have created a single component and wired it up, it will be quite simple to add two more components.

We aren't going to flesh these components out in this lesson. We are just going to add them as placeholders.

- under the 'src\app' folder create a new folder called 'company'

- under the 'company' folder, create a 'company-list' folder

  We are going to have multiple components under the 'company' folder, and each of these may be composed of multiple smaller components so we create a folder for each 'view'.

- add the companies list component

**src/app/company/company-list/company-list.component.ts**
```
import { Component, OnInit } from '@angular/core';

@Component({
    template: `
        <div class="row">
           <h2>Companies</h2>
       </div>
    `,
})
export class CompanyListComponent {    
}
```

- add the routes for the companies module into the 'company' folder

**src/app/company/company.routes.ts**
```
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CompanyListComponent } from './company-list/company-list.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', redirectTo: 'list', pathMatch: 'full' },  
  { path: 'list', component: CompanyListComponent },
]);

```

The point of interest above is that when this collection of routes is handled '' is the default, but it immediately redirects to the 'list' route.

Because we intend to route anything coming in from '/company' to this collection, it will initially be handled by the default route, and redirected to 'list' in the browser.


- add the company module

**src/app/company/company.module.ts**
```
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule }  from '../shared/shared.module';
import { routing } from './company.routes';
import { CompanyListComponent }   from './company-list/company-list.component';

@NgModule({
    imports: [
        SharedModule, 
        routing, 
        FormsModule
        ],
    declarations: [
        CompanyListComponent
        ]
})
export class CompanyModule { }

```


- add the route to the company module to the top level routing config

**src/app/app.routes.ts**
```
...
const appRoutes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
    { path: 'company', loadChildren: 'app/company/company.module#CompanyModule' },
];
```

Now when 'company' appears on the path, the handling of the routing will be passed to the company module.

- click on the 'Companies' navigation link and observe that the page redirects to '/company/list' and that the CompanyList component is rendered.

## Create the Contacts component
##### Time: 5min

- under the 'src\app' folder create a new folder called 'contact' and under that a folder called 'contact-list'

- add the contact list component

**src/app/contact/contact-list.component.ts**
```

import { Component } from '@angular/core';

@Component({
    template: `
     <div class="row">
        <div class="col-sm-3">
           <h2>Contacts</h2>
        </div>
     </div>
    `,
})
export class ContactListComponent {    
    
}
```

- add the contacts routing 'contact.routes.ts'

**src/app/contact/contact.routes.ts**
```
import { ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';

export const routing: ModuleWithProviders = RouterModule.forChild([
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: ContactListComponent },
]);

```

- add the contacts module

**src/app/contact/contact.module.ts**

```
import { ContactListComponent } from './contact-list/contact-list.component';

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { routing } from './contact.routes';

@NgModule({
    imports: [SharedModule, routing],
    declarations: [
        ContactListComponent,
        ]
})
export class ContactModule { }
```

- add the route to the contacts module to the top level routing config

 
The top level routing should now resemble the below

**src/app/app.routes.ts**
```
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const appRoutes: Routes = [
    { path: '', loadChildren: 'app/home/home.module#HomeModule' },
    { path: 'company', loadChildren: 'app/company/company.module#CompanyModule' },
    { path: 'contact', loadChildren: 'app/contact/contact.module#ContactModule' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

```


#### View your handiwork

- Click the 'FireBootCamp Angular - CRM' link in the top left.
  Note that you are directed to the root of the application, and the HomeComponent is rendered.

- Click the 'Companies' link and the 'Contacts' links.
  Note that the URL changes to the correct route and that you are directed to the appropriate components.


## Summary
##### Time: 5min

- In this lesson, we created three feature folders and put one component in each feature folder (home, contacts, companies)
- We created a Shared module for common components, directives and pipes
- We created a Core module for application-wide singleton services
- We added some styling to our application
- We implemented lazy loading of our components 
- We added navigation to our application to demonstrate navigating between the three components  


#### Further Reading

- For a thorough discussion refer to the [Angular Modules Documentation](https://angular.io/docs/ts/latest/guide/ngmodule.html).

In the following lessons, we will expand upon the companies and contacts features to teach how to build data entry forms using several different methods. 