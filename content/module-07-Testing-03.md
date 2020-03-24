## Overview  
##### Time: 5min

In this module, we will learn to use the Jasmine Testing Framework Basics

### Learning Outcomes:
- How to write BDD (Behavior Driven Design) unit tests with Jasmine

### Code for the Completed Lesson
To obtain the code for the completed lesson execute the following git commands.

```
git clone 'https://firebootcamp:Angular2rocks!@firebootcamp.visualstudio.com/FireBootCamp.Angular/_git/firebootcamp-testing'

git branch -a

git checkout -q 03 
```

## Jasmine Introduction
##### Time: 5min

Jasmine is an open source testing framework from Pivotal Labs that uses behaviour-driven notation resulting in a fluent and improved testing experience.

Main concepts:
1. Suites — describe(string, function) functions, take a title and a function containing one or more specs.
2. Specs — it(string, function) functions, take a title and a function containing one or more expectations.
3. Expectations — are assertions that evaluate to true or false. Basic syntax reads expect(actual).toBe(expected)
4. Matchers — are predefined helpers for common assertions. Eg: toBe(expected), toEqual(expected). Find a complete list here.

## Add a new file to the joke folder
##### Time: 5min

- Add a new spec empty file to the joke folder

**src/app/joke/joke.component.spec.ts

## Add a simple test to add 1 + 1
##### Time: 10min

- Add a `describe` block.

**src/app/joke/joke.component.spec.ts**
```
describe(`Component: Joke Component`, () => {

});
```

**src/app/joke/joke.component.spec.ts**
- Add a `it` block.

```
describe(`Component: Joke Component`, () => {
  it('add 1 + 1', () => {

  });
});

```

**src/app/joke/joke.component.spec.ts**
- Add an expectation.

```
describe(`Component: Joke Component`, () => {
  it('add 1 + 1', () => {
        expect(1 + 1).toEqual(2);
  });
});

```

### Run the test with Karma test runner
- In the terminal at the path of the project start the unit tests with the following command
```
ng test
```

![](https://firebootcamp.ghost.io/content/images/2017/02/2017-02-21_22-27-45.jpg)

**Figure: Karma output in terminal**

## Add another test to check the title property 
##### Time: 10min

- Under the last `it` block add another `it` block and write a test to check the title property is set correctly


**src/app/joke/joke.component.spec.ts**
```
import { JokeComponent } from './joke.component';
describe(`Component: Joke Component`, () => {  
  it(`should add 1 + 1`, () => {
    expect(1 + 1).toEqual(2);
  });

  it(`should have a title of 'Chuck Norris Jokes`, () => {
    let component = new JokeComponent(null)
    expect(component.title).toEqual('Chuck Norris Jokes');
  });
});

```
- Karma should still be running from your last test and on save of the spec file automatically re run.

In this case we are newing up the `JokeComponent(null)` with a null value passed in for the joke components joke service dependency. In the next lesson we will look at how we can fake this dependency and its implementation.
