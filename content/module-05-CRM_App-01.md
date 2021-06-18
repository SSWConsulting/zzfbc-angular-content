## Overview
##### Time: 2min 

In this Module, we will build a simple CRM application that uses many key features of Angular including:

- Angular CLI
- Angular Modules
- Component Architecture
- Component Communication
- Angular Services and Dependancy Injection
- Angular HTTP Module
- RxJS and Observables
- Routing
- Reactive Forms
- Code splitting
- AoT (ahead of time compilation)
- Module bundling
- State Management

### Finished Code for the CRM Module
```
git clone "https://firebootcamp:Angular2rocks!@firebootcamp.visualstudio.com/FireBootCamp.Angular/_git/firebootcamp-crm-2day"

cd firebootcamp-crm-2day

npm install

``` 

### WIP Course Code 
```
git clone "https://github.com/duncanhunter/canberra-angular-2day.git”

cd firebootcamp-crm-2day

npm install

``` 


## Create a new Angular CLI application
##### Time: 5min

> See [Intro to the Angular CLI](https://courses.firebootcamp.com/courses/Angular/Fundamentals/lesson/30#0) for more information about the Angular CLI

- In the folder, you would like to create this project run the following command

```
ng new firebootcamp-crm --prefix fbc --routing  --style scss  --dry-run

//   --prefix = add prefix to all component template element names (see Angular.json)

//   --style = Specify the css pattern css, less or scss (see Angular.json)

//   --routing = Make a default routing module for the app

//   --dry-run = do not run anything to disk

```

- If the dry run output looks right then remove the ```--dry-run``` flag and re-run the ng new command.

```
ng new firebootcamp-crm --prefix fbc --routing  --style scss 
```

- Change directory into the new project and open the CLI in Visual Studio Code

```
cd firebootcamp-crm && code .
```

- Run the application

```
ng serve -o
```

- Open the application in your web browser at http://localhost:4200

## Commit changes locally to default git repo
##### Time: 5min

By default, the Angular CLI will set up git for source control and a ```.gitignore``` file by default.

After getting a default Angular CLI application working, commit the initial changes to your local git repo with the below command.

```
git commit -m "initialise cli project"
```

> It is possible when creating a new CLI app to pass in the flag ```--skip-git``` to turn off the default create a git repo setting.

## Course slides
##### Time: 0min

### Course slides

You can access the course slides here:

[https://docs.google.com/presentation/d/1_nDVY7qIcM7jGI_yWSaRcjcmRz0aNAEMsA837OHWrsI/edit?usp=sharing](https://docs.google.com/presentation/d/1_nDVY7qIcM7jGI_yWSaRcjcmRz0aNAEMsA837OHWrsI/edit?usp=sharing)
