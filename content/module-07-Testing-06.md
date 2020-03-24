## Overview  
##### Time: 5min

In this module, we will learn to use manage async code in our tests with Angulars async and fakeAsync utilities

### Learning Outcomes
- How to make a new async and fakeAsync
- How and when to use `.async` and `.whenStable()`
- How to use `.fakeAsync()` and `tick()`

## Add a fakeAsync test to check the next joke button is working
##### Time: 15min

The `fakeAsync()` function is one of the Angular testing utilities along with async() which we will discuss next. It simplifies coding of asynchronous tests by arranging for the tester's code to run in a special async test zone. The fakeAsync function enables a linear coding style by running the test body in a special fakeAsync test zone. The main advantage of fakeAsync over async is that syntax makes the code look synchronous, and you have no promise to manage just use the `.tick()` method. When you have to manage time for example if you need to have known if a UI element has disappeared after three seconds you can fast forward to time by using `tick(3000)`.

The main limitations of fakeAsync is you cannot make an XHR call from within a fakeAsync.

- Add a new test to check when the "Get next joke" button is clicked a new joke is rendered onto the page
- Wrap it block in a fakeAsync function. ` it('should get next quote on click - with fakeAsync', fakeAsync(() => { });`
- Add a spyOn function to spy on the same getJoke method in the joke service. However this time we will use `.returnValues()` with an s vs `.getValue` which will return the next value specified in order of the calls being made
- Add a timeout operator to the second value returned from the spy to simulate a longer running asynchronous operation `Observable.of('FAKE JOKE 2').timeout(2000)`.
- Call `fixture.detectChanges()` to initialize the component and set the first joke
- Set an expectation the first joke was set correctly
- Get a handle on the native element of the button and call `.click()` on it
- Call `fixture.detectChanges()` again to update the UI with the second joke
- Call `.tick(3000)` to move time forward three seconds to after the timeout set already.
- Assert the text content in the components HTML Template is equal to the returned value from the spy
- Run the tests with `ng test` in the command line

**src/app/joke/joke.component.spec.ts**

```
 it(`should get next quote on click - with fakeAsync`, fakeAsync(() => {
    spyOn(jokeService, 'getJoke')
      .and.returnValues(
      Observable.of('FAKE JOKE'),
      Observable.of('FAKE JOKE 2').timeout(2000));

    fixture.detectChanges();
    let el = de.query(By.css('p')).nativeElement;
    expect(el.textContent).toEqual('FAKE JOKE');
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    tick(3000);
    expect(el.textContent).toEqual('FAKE JOKE 2');
  }));

```

## Add an async test to check the next joke button is working
##### Time: 15min

The async function is one of the Angular testing utilities. It simplifies coding of asynchronous tests by arranging for the tester's code to run in a special async test zone.
Using async in a test can reduce verbose code blocks and avoid some of the issues discussed in the net step when using a done callback from Jasmine. However, sometimes it is necessary to call `.fixture.whenStable()` in some async tests as asynchronous code continues to finish executing.

- Add a new test to check when the "Get next joke" button is clicked a new joke is rendered onto the page
- Wrap it block in an async function. ` it('should get next quote on click - with async', async(() => { });`
- Add a spyOn function to spy on the same getJoke method in the joke service. However, this time we will use `.returnValues()` with an s vs `.getValue` which will return the next value specified in order of the calls being made
- Call `fixture.detectChanges()` to initialize the component and set the first joke
- Set an expectation the first joke was set correctly
- Get a handle on the native element of the button and call `.click()` on it
- Call `fixture.detectChanges()` again to update the UI with the second joke
- Call `fixture.whenStable().then`
- Assert the text content in the components HTML Template is equal to the returned value from the spy in the code block of the whenStables `.then()`
- Run the tests with `ng test` in the command line

**src/app/joke/joke.component.spec.ts**

```
it(`should get next quote on click - with async`, async(() => {
    spyOn(jokeService, 'getJoke')
      .and.returnValues(
      Observable.of('FAKE JOKE'),
      Observable.of('FAKE JOKE 2'));

    fixture.detectChanges();
    let el = de.query(By.css('p')).nativeElement;
    expect(el.textContent).toEqual('FAKE JOKE');
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.textContent).toEqual('FAKE JOKE 2');
    });
  }));

```

## Jasmine done( ) alternative method to async and fakeAsync
##### Time: 15min

While fakeAsync and even async function greatly simplifies Angular asynchronous testing, you can still fallback to the traditional Jasmine asynchronous testing technique.

You can still pass it a function that takes a done callback. Now you are responsible for chaining promises, handling errors, and calling done at the appropriate moment.

```
it('should get next quote on click - with done', (done) => {

    let spy = spyOn(jokeService, 'getJoke')
      .and.returnValues(
      Observable.of('FAKE JOKE'),
      Observable.of('FAKE JOKE 2'));

    fixture.detectChanges();
    let el = de.query(By.css('p')).nativeElement;

    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    spy.calls.mostRecent().returnValue
    .subscribe(() => {
      fixture.detectChanges();
      expect(el.textContent).toEqual('FAKE JOKE 2');
      done();
    });

  });

```
Although we have no direct access to the getJoke promise inside JokeComponent, the spy does and that makes it possible to wait for getJoke to finish.

The jasmine.done technique, while discouraged, may become necessary when neither async nor fakeAsync can tolerate a particular asynchronous activity. That's rare but it happens.

## Final code
##### Time: 0min

**src/app/joke/joke.component.spec.ts**

```
import { JokeComponent } from './joke.component';
import { Observable } from 'rxjs/Observable';
import { TestBed, ComponentFixture, tick, async, fakeAsync } from '@angular/core/testing';
import { JokeService } from './joke.service';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import 'rxjs/Rx';
import { By } from '@angular/platform-browser';

describe(`Component: JokeComponent`, () => {

  let component: JokeComponent;
  let jokeService: JokeService;
  let fixture: ComponentFixture<JokeComponent>;
  let de: DebugElement;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [JokeComponent],
      providers: [
        JokeService
      ]
    });

    fixture = TestBed.createComponent(JokeComponent);
    component = fixture.componentInstance;
    jokeService = TestBed.get(JokeService);
    de = fixture.debugElement;

  }));

  it(`should add 1 + 1 `, () => {
    expect(1 + 1).toEqual(2);
  });

  it(`should have a title of "Chuck Norris Quotes"`, () => {
    expect(component.title).toEqual('Chuck Norris Jokes');
  });

  it(`should set the joke property when component initialized`, () => {
    spyOn(jokeService, 'getJoke')
      .and.returnValue(Observable.of('FAKE JOKE'));

    fixture.detectChanges();

    expect(component.joke).toEqual('FAKE JOKE');
  });

  it(`should have the joke content bound to the the page`, () => {
    spyOn(jokeService, 'getJoke')
      .and.returnValue(Observable.of('FAKE JOKE'));

    fixture.detectChanges();

    let el = de.query(By.css('p')).nativeElement;

    expect(el.textContent).toEqual('FAKE JOKE');

  });

  it(`should get next quote on click - with fakeAsync`, fakeAsync(() => {
    spyOn(jokeService, 'getJoke')
      .and.returnValues(
      Observable.of('FAKE JOKE'),
      Observable.of('FAKE JOKE 2').timeout(2000));

    fixture.detectChanges();
    let el = de.query(By.css('p')).nativeElement;
    expect(el.textContent).toEqual('FAKE JOKE');
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.detectChanges();
    tick(3000);
    expect(el.textContent).toEqual('FAKE JOKE 2');
  }));

  it(`should get next quote on click - with async`, async(() => {
    spyOn(jokeService, 'getJoke')
      .and.returnValues(
      Observable.of('FAKE JOKE'),
      Observable.of('FAKE JOKE 2'));

    fixture.detectChanges();
    let el = de.query(By.css('p')).nativeElement;
    expect(el.textContent).toEqual('FAKE JOKE');
    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      expect(el.textContent).toEqual('FAKE JOKE 2');
    });
  }));

  it('should get next quote on click - with done', (done) => {

    let spy = spyOn(jokeService, 'getJoke')
      .and.returnValues(
      Observable.of('FAKE JOKE'),
      Observable.of('FAKE JOKE 2'));

    fixture.detectChanges();
    let el = de.query(By.css('p')).nativeElement;

    let button = fixture.debugElement.query(By.css('button')).nativeElement;
    button.click();

    spy.calls.mostRecent().returnValue
    .subscribe(() => {
      fixture.detectChanges();
      expect(el.textContent).toEqual('FAKE JOKE 2');
      done();
    });
  });

});
```

## Summary
##### Time: 5min

In this lesson, we looked at how to create an ```async``` and ```fakeAsync``` utilities to help manage asynchronous code in our unit tests