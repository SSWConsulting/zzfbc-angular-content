## Overview
##### Time: 5min

In this lesson, we will look at one of the biggest benefits to using ngrx, the dev tooling. At the end of this lesson, you will know how to install and use the redux dev tools.

### Learning Outcomes
- How to install ngrx dev tools
- Hot to use ngrx dev tools

## Install ngrx
##### Time: 5min
- install npm by running the following command

```
npm install @ngrx/store-devtools --save
```


## Register dev tools in AppModule
##### Time: 5min

We will not install dev tools but use the Chrome extension tools. You can install dev tools that do not rely on the Chrome extension but the extension is great. You can learn more about other extensions here (remotedev.io)[http://extension.remotedev.io/]

- Dev tools to imports in ```AppModule```

**src/app/app.module.ts**

```
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
```

```
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    StoreModule.forRoor({ companies: companyReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })  ],

```


## Install the Chrome extension 
##### Time: 5min

- Go to the chrome store and install this extension at the following URL https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd.

## Explore the dev tools
##### Time: 5min

- Run the application and then open the Chrome extension by clicking on the ellipsis on the right of the Chrome menu bar as shown in the image below.

![](https://firebootcamp.ghost.io/content/images/2017/02/2017-02-21_13-32-21.png)







