## Summary 
##### Time: 5min

In this module, we will learn to use the Angular testing utility the TestBed API

### Learning Outcomes
- How to to configure a testing module with `TestBed.configureTestingModule()`
- How to create a component instance
- How to use the TestBed to inject services
- How to use the debug element to access the components instances HTML Template


## Refactor code to use a TestBed to configure a testing module
##### Time: 15min

The TestBed is the first and largest of the Angular testing utilities. It creates an Angular testing module — a @NgModule class — that you configure with the configureTestingModule method to produce the module environment for the class you want to test. In effect, you detach the tested component from its application module and re-attach it to a dynamically-constructed, Angular test module tailored specifically for this battery of tests.

- Remove the newed up joke component and replace it with a TestBed module

The TestBed.ConfigureModule() function allows us to create a module. The main parts are:
1. Declarations - Specifies the components and directives this test module need
2. Imports - The Angular, custom and third party module needed
3. Providers - The services needed and also the place to pass in fakes shown in commented out code 

**src/app/joke/joke.component.spec.ts**

```
import { JokeService } from '../joke.service';
import { TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
```

```
 beforeEach(() => {
    // jokeService = {
    //   getJoke: () => Observable.of('FAKE JOKE')
    // };

    TestBed.configureTestingModule({
      declarations: [JokeComponent],
      imports: [HttpModule],
      providers: [
        JokeService
        // Also could pass in a fakes
        // { provide: JokeService, userValue: jokeService }
      ]
    });
  });

```

## Create a component instance
##### Time: 10min

- Once we have a working TestBed, we can use it to create a component, but this instance is different than the one we newed up in the previous lessons as we can get a handle on its associated HTML template.
- Inject the joke service using the Test Bed
- Get an instance of the component using the fixture
**src/app/joke/joke.component.spec.ts**

```
  beforeEach(() => {
    jokeService = {
      getJoke: () => Observable.of('FAKE JOKE')
    };

    TestBed.configureTestingModule({
      declarations: [JokeComponent],
      imports: [HttpModule],
      providers: [
        JokeService
      ]
    });

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    jokeService = TestBed.get(JokeService);
  });

```

## Create a debug element from the component instance 
##### Time: 10min 

As mentioned the big deal about the fixture we created just now is that we have access to the component instances HTML template or DOM

- Add a `de` (Debug Element) property to the before each block
- Initialize `de` property in the before each block 


**src/app/joke/joke.component.spec.ts**

```
  let fixture: ComponentFixture<JokeComponent>;
  let component: JokeComponent;
  let jokeService: any;
  let de: DebugElement;

  beforeEach(() => {
    jokeService = {
      getJoke: () => Observable.of('FAKE JOKE')
    };

    TestBed.configureTestingModule({
      declarations: [JokeComponent],
      imports: [HttpModule],
      providers: [
        JokeService
      ]
    });

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    jokeService = TestBed.get(JokeService);
    de = fixture.debugElement;


});

```

## Write a test to check the HTML Elements initialized joke is binding correctly
##### Time: 15min 

The debug element allows us to query the components dom using CSS selectors and also to use the `nativeElement`, The native DOM element at the root of the component. With the nativeElement we can manipulate and query the DOM like we normally would with methods like `.click()`.

- Add a new test and spy on the `getJoke()` function in the joke service
- Call `fixture.detectChanges()` to initialize the component which will all the components `ngOnInit()` function which will trigger a call to the joke service the spyOn will intercept
- Create and set a local el (element) property to the result of a debugElement query for a `<p></p>` tag, then get the nativeElement
- Assert if the `el.textContent` equals the return vale from our spy
- Run the test runner to ensure your test passes with `ng test`

**src/app/joke/joke.component.spec.ts**

```
  it(`should have joke content bound onto the page`, () => {
    spyOn(jokeService, 'getJoke')
      .and.returnValue(Observable.of('FAKE JOKE'));

    fixture.detectChanges();

    let el = de.query(By.css('p')).nativeElement;

    expect(el.textContent).toEqual('FAKE JOKE');
  });

```

## Summary and final code
##### Time: 5min

 In this lesson, we looked at how to create a TestBed module which is very much a simple NgModule. We also look at how to get a hold of the HTML template for a component using the debug element.

  **src/app/joke/joke.component.spec.ts**
```
import { JokeComponent } from './joke.component';
import { Component, DebugElement } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { JokeService } from './joke.service';
import { By } from '@angular/platform-browser';
describe(`Component: Joke Component`, () => {

  let fixture: ComponentFixture<JokeComponent>;
  let component: JokeComponent;
  let jokeService: any;
  let de: DebugElement;

  beforeEach(() => {
    jokeService = {
      getJoke: () => Observable.of('FAKE JOKE')
    };

    TestBed.configureTestingModule({
      declarations: [JokeComponent],
      imports: [HttpModule],
      providers: [
        JokeService
      ]
    });

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    jokeService = TestBed.get(JokeService);
    de = fixture.debugElement;
  });


  it(`should add 1 + 1`, () => {
    expect(1 + 1).toEqual(2);
  });

  it(`should have a title of 'Chuck Norris quotes`, () => {
    expect(component.title).toEqual('Chuck Norris Jokes');
  });

  it('should set the joke property when component intiialised', () => {
    spyOn(jokeService, 'getJoke')
      .and.returnValue(Observable.of('FAKE JOKE'));

    fixture.detectChanges();

    expect(component.joke).toEqual('FAKE JOKE');
  });

  it(`should have joke content bound onto the page`, () => {
    spyOn(jokeService, 'getJoke')
      .and.returnValue(Observable.of('FAKE JOKE'));

    fixture.detectChanges();

    let el = de.query(By.css('p')).nativeElement;

    expect(el.textContent).toEqual('FAKE JOKE');
  });
});
```