## Overview  
##### Time: 5min

In this module, we will learn to use protractor to run e2e tests

### Learning Outcomes: (What we want to know/understand)  
- How to make e2e tests with Protractor
- How to use the Page Object pattern

### Protractor
Protractor is an end-to-end test framework for AngularJS applications. Protractor runs tests against your application running in a real browser, interacting with it as a user would.
You can read more about Protractor here [http://www.protractortest.org/#/](http://www.protractortest.org/#/)

### Official Style Guide
[http://www.protractortest.org/#/style-guide](http://www.protractortest.org/#/style-guide)

[youtube video on the style guide ](https://youtu.be/-lTGnYwnEuM)

## Delete the default e2e tests the Angular CLI created
##### Time: 10min

- Delete both the `app.e2e-spec.ts` and `app.po.ts` from the e2e folder;

## Add two new e2e test files for both the tests and the page object set up file
##### Time: 10min

- Add the both a `joke.e2e-spec.ts` file and  a `joke.po.ts` file to the e2e folder;

![](https://firebootcamp.ghost.io/content/images/2017/01/testing-e2e-folder-1.png)

**Figure: e2e folder showing new tests files to added**

## Add a simple test to check the title on the page is correct
##### Time: 10min

You will notice we use Jasmine again in our e2e tests as the Angular team has done a lot of work to ensure it works out of the box. Jasmine is not only the most popular assertion library for Protractor it also helps to use the same syntax across all your tests

- Import some useful helpers from Protractor `import { browser, by, element } from 'protractor';` the browser helper enables the ability to request a navigation to a certain route, element and by allow us to query the dom with a CSS selector syntax.
- Create a describe block in Jasmine and add an it block similar to setting up a unit test
- Call `browser.get('/');` to navigate to the route URL of the application
- Initialize a new `title` property to the text of the `<h1></h1>` title element
- Assert if the title is correctly set to 'Chuck Norris Jokes'
- In a terminal start, the application `ng serve` you will get a nondescript error if you try and run e2e tests without a running application to test against
- In another terminal window run the e2e test `ng test`

**e2e/joke.e2e-spec.ts**
```
import { browser, by, element } from 'protractor';

describe(`Page: Joke Page`, () => {
  it(`should have a title of "Chuck Norris Jokes"`, () => {
    browser.get('/');

    let title = element(by.css('h1')).getText();

    expect(title).toEqual('Chuck Norris Jokes');
  });
});
```


## Refactor the e2e test to use page objects
##### Time: 10min

When writing end-to-end tests, a standard pattern is to use Page Objects. Page Objects help you write cleaner tests by encapsulating information about the elements on your application page. A Page Object can be reused across multiple tests, and if the template of your application changes, you only need to update the Page Object.

- Remove the import of the Protractor helper methods and import the JokePage from the `e2e/joke.po.ts` file
- Replace the browser .get with a call to a method you can reuse in the `e2e/joke.po.ts` file. `JokePage.navigateTo();`
- In the page object file create a `JokePage` class and import the previous helpers from Protractor.
- Create a static method on the JokePage class. Using static methods saves extra code newing up an instance of the class in the spec file as these functions do not change.
- Add a `static getTitleText()` function to the JokePage class that returns the same CSS query selector for the page title from the last test
- As the `.getText()` method return a promise we can use the new async/await feature in TypeScript to make our code more readable. To do this we need to change the `e2e/tsconfig.json` file to `    "target": "es6",
` versus es5. es6 would be an issue if we had to run this JavaScript in the browser but as we run Protractor in node it can understand es6. TypeScript 2.1+ now can also compile async await down to es5 in own Angular code also.
- In the spec file we can now use the `await` which will block the code until the promise resolves `let title = await JokePage.getTitleText();`
- Assert if the title is correctly set to 'Chuck Norris Jokes'
- In a terminal start, the application `ng serve`
- In another terminal window run the e2e test `ng test`


**e2e/tsconfig.json**
```
{
  "compileOnSave": false,
  "compilerOptions": {
    "declaration": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "../dist/out-tsc-e2e",
    "sourceMap": true,
    "target": "es6",
    "typeRoots": [
      "../node_modules/@types"
    ]
  }
}
```

**e2e/joke.e2e-spec.ts**
```
import { JokePage } from './joke.po';

describe(`Page: Joke Page`, () => {
  it(`should have a title of "Chuck Norris Jokes"`, async () => {
    JokePage.navigateTo();

    let title = await JokePage.getTitleText();

    expect(title).toEqual('Chuck Norris Jokes');
  });
});

```

**e2e/joke.po.ts**
```
import { browser, element, by } from 'protractor';

export class JokePage {
  static navigateTo() {
    return browser.get('/');
  }

  static getTitleText() {
    return element(by.css('h1')).getText();
  }
});
```

## Add a second test to check the second joke is different to first joke
##### Time: 10min

- In the page object file create a `getParagraphText` and a `getNextQuote()` methods
- In the spec file create a new test to check if the first and second joke are different ` it(`should have a title of "Chuck Norris Jokes"`, async () => {});`
- Initialize a new `firstJoke` property to the text of the `<p></p>` element
- Call all the `getNextQuote()` method in the JokePage class `JokePage.getNextQuote();`
- Initialize a second property `secondJoke` property to the text of the `<p></p>` element after the button click to get the next random joke from the API
- Assert to check the two jokes are different `expect(firstJoke).not.toEqual(secondJoke);`
- In a terminal start, the application `ng serve` you will get a nondescript error if you try and run e2e tests without a running application to test against
- In another terminal window run the e2e test `ng test`


**e2e/joke.e2e-spec.ts**
```
describe(`Page: Joke Page`, () => {
   it(`should have a new joke on button click`, async() => {
    JokePage.navigateTo();

    let firstJoke = await JokePage.getParagraphText();

    JokePage.getNextQuote();

    let secondJoke = await JokePage.getParagraphText();

    expect(firstJoke).not.toEqual(secondJoke);
  });
});
```

**e2e/joke.po.ts**
```
export class JokePage {
  static navigateTo() {
    return browser.get('/');
  }

  static getTitleText() {
    return element(by.css('h1')).getText();
  }

  static getParagraphText() {
    return element(by.css('p')).getText();
  }

  static getNextQuote() {
    return element(by.css('button')).click();
  }

}
```

## Final Code
##### Time: 0min

**e2e/joke.e2e-spec.ts**
```
import { JokePage } from './joke.po';

describe(`Page: Joke Page`, () => {
  it(`should have a title of "Chuck Norris Jokes"`, async () => {
    JokePage.navigateTo();

    let title = await JokePage.getTitleText();

    expect(title).toEqual('Chuck Norris Jokes');
  });

   it(`should have a new joke on button click`, async() => {
    JokePage.navigateTo();

    let firstJoke = await JokePage.getParagraphText();

    JokePage.getNextQuote();

    let secondJoke = await JokePage.getParagraphText();

    expect(firstJoke).not.toEqual(secondJoke);
  });
});
```

**e2e/joke.po.ts**
```
import { browser, element, by } from 'protractor';

export class JokePage {
  static navigateTo() {
    return browser.get('/');
  }

  static getTitleText() {
    return element(by.css('h1')).getText();
  }

  static getParagraphText() {
    return element(by.css('p')).getText();
  }

  static getNextQuote() {
    return element(by.css('button')).click();
  }

}
```

**e2e/tsconfig.json**
```
{
  "compilerOptions": {
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "lib": [
      "es2016"
    ],
    "outDir": "../out-tsc/e2e",
    "module": "commonjs",
    "target": "es6",
    "types":[
      "jasmine",
      "node"
    ]
  }
}

```

## Summary
##### Time: 2min

In this lesson, we looked at how make and run e2e tests. We also looked at how to refactor your e2e tests to follow the page object pattern to make them less brittle
