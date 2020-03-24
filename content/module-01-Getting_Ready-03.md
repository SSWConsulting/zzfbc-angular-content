## Best VSCode extensions
##### Time: 15min

![Example Image](https://firebootcamp.ghost.io/content/images/2017/02/ext-bar.png)

Using VSCode extensions can make your IDE more fun and you more efficient. Below are the best extensions for VSCode and Angular.

###1. [angular2-switcher ](https://marketplace.visualstudio.com/items?itemName=infinity1207.angular2-switcher)
![Example Image](https://firebootcamp.ghost.io/content/images/2017/02/switch.png)

###2. [TypeScript Importer ](https://marketplace.visualstudio.com/items?itemName=pmneo.tsimporter)
![Example Image](https://firebootcamp.ghost.io/content/images/2017/02/tsc.jpg)

###3. [Wallaby.js ](https://marketplace.visualstudio.com/items?itemName=WallabyJs.wallaby-vscode)
![WallabyJS](https://firebootcamp.ghost.io/content/images/2017/02/wallaby.png)

###4. [Angular 2 TypeScript Snippets](https://marketplace.visualstudio.com/items?itemName=johnpapa.Angular2)
![Example Image](https://firebootcamp.ghost.io/content/images/2017/02/snippets.png)

###5. [tslint ](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
![Example Image](https://firebootcamp.ghost.io/content/images/2017/02/tslint.png)

###6. [Path Autocomplete ](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete)
![Example Image](https://firebootcamp.ghost.io/content/images/2017/02/path-auto.png)

One to watch out for is https://github.com/angular/vscode-ng-language-service which gives you code completion in your HTML  templates. I use it and a big fan of where this is going. 

![](https://firebootcamp.ghost.io/content/images/2017/02/html-codecomplete.jpg)

Figure: Autocomplete and errors in the HTML!




Jump to the next step 'Updating the CLI'.

Use npm to install the CLI with the below command
```
npm install -g @angular/cli
```

As a refresher, the `-g` flag installs this package globally, which means we can run it from anywhere on the machine. 

Once installed you should be able to create a new Angular project 
```
ng new hello-world
```

Once created you can change directory into the project and run it with `ng serve`.
```
cd hello-world
ng serve
```

You should now be able to open a browser at [http://localhost:4200](http://localhost:4200) and view your website.


## Updating the CLI
##### Time: 10min

If you have installed the CLI before it is best to check you have the latest version. If you do not follow the below steps to reinstall it:

```
ng -v
npm uninstall -g angular-cli @angular/cli
npm cache clean
npm install -g @angular/cli

```


## Troubleshooting
##### Time: 5min
If you get node-gyp errors follow instructions here 
  https://github.com/nodejs/node-gyp 

If you get permission errors follow instructions here 
https://docs.npmjs.com/getting-started/fixing-npm-permissions 
