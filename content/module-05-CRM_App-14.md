## Overview  
##### Time: 5min

In this module, we will learn to use the Jasmine Testing Framework Basics

### Learning Outcomes:
- How to write BDD (Behavior Driven Design) unit tests with Jasmine

## Jasmine Introduction
##### Time: 5min

Jasmine is an open source testing framework from Pivotal Labs that uses behaviour-driven notation resulting in a fluent and improved testing experience.

Main concepts:
1. Suites — describe(string, function) functions, take a title and a function containing one or more specs.
2. Specs — it(string, function) functions, take a title and a function containing one or more expectations.
3. Expectations — are assertions that evaluate to true or false. Basic syntax reads expect(actual).toBe(expected)
4. Matchers — are predefined helpers for common assertions. Eg: toBe(expected), toEqual(expected). Find a complete list here.

## Delete the contents of the auto generated AppComponent Spec file
##### Time: 5min

- Delete the default tests made by the Angular CLI

**src/app/app.component.spec.ts

## Add a simple test (1+1=2)
##### Time: 10min

- Add a `describe` block.

**src/app/app.component.spec.ts**
```
describe(`Component: App Component`, () => {

});
```

**src/app/app.component.spec.ts**

- Add a `it` block.

```
describe(`Component: App Component`, () => {
  it('add 1+1 - PASS', () => {

  });
});

```

**src/app/app.component.spec.ts**
- Add an expectation.

```
describe(`Component: App Component`, () => {
  it('add 1+1 - PASS', () => {
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

## Add a simple failing test (1+1=42)
##### Time: 1min

- Add another test, this time with a failing assumption.

**src/app/app.component.spec.ts**


```
describe(`Component: App Component`, () => {
  it('add 1+1 - PASS', () => {
        expect(1 + 1).toEqual(2);
  });
  
  it('add 1+1 - FAIL', () => {
        expect(1 + 1).toEqual(42);
  });
});

```

- run ng test again. This time, you should see one failure.

## Add another test to check a property 
##### Time: 10min

- remove the failing test

- Under the last `it` block add another `it` block and write a test to check the title property is set correctly


**src/app/app.component.spec.ts**
```
import { AppComponent } from './app.component';
describe(`Component: App Component`, () => {
  it('add 1+1 - PASS', () => {
        expect(1 + 1).toEqual(2);
  });
  
  it(`title equals 'Angular Superpowers'`, () => {
    const component = new AppComponent(null);
    expect(component.title).toEqual('Angular Superpowers');
  });
});
```


- set the title accordingly in the component
**src/app/app.component.ts**
```
export class AppComponent implements OnInit {
  title = 'Angular Superpowers';
  ...
}
```

- Note that the AppComponent requires a CompanyService parameter. For now, we won't use it in the test though, so we just pass null.


- Karma should still be running from your last test and on save of the spec file automatically re-run.

## Test the Component logic using a mocked up Service
##### Time: 15min

- Add a 'BeforeEach' section before the tests. This will run before each test ('it' sections).

**src/app/app.component.spec.ts**
```
  ...
  import { of } from 'rxjs';
  ...
  let component;
  let companySvc;
  
  beforeEach(() => {
    companySvc = {
      getCompanies: () => of([{
        name: 'Fake Company',
        email : 'fakeEmail@ssw.com.au',
        number: 12345,
      }])
    };
    component = new AppComponent(companySvc);
  });
  ...
```

- Add another test for the companyCount$ property

**src/app/app.component.spec.ts**
```
  ...
  it(`companyCount = 1`, () => {
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    });
  });
  ...
```

## Test the Component logic using SpyOn
##### Time: 10min

SpyOn is a Jasmin feature that allows dynamically intercepting the calls to a function and change its result. This example shows how spyOn works, even if we are still mocking up our service.

- Change the Mockup service so getCompanies returns nothing

**src/app/app.component.spec.ts**
```
  ...
  beforeEach(() => {
    companySvc = {
      getCompanies: () => {}
    };
    component = new AppComponent(companySvc);
  });
  ...
```

- Add a new Test case 

**src/app/app.component.spec.ts**
```
  ...
  it(`companyCount = 2`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: "Fake Company A",
        email: "fakeEmail@ssw.com.au",
        number: 12345
      },
      {
        name: "Fake Company B",
        email: "fakeEmail@ssw.com.au",
        number: 12345
      }
    ]))
    component.ngOnInit();
    component.companyCount$.subscribe(c => {
      expect(c).toEqual(2);
    });
  });
  ...
```


## TestBed and Fixtures
##### Time: 10min

The TestBed is the first and largest of the Angular testing utilities. It creates an Angular testing module — a @NgModule class — that you configure with the configureTestingModule method to produce the module environment for the class you want to test. 

- Remove the newed up AppComponent and replace it with a TestBed module
**src/app/app.component.spec.ts**
```
  ...
    import { ComponentFixture, TestBed } from '@angular/core/testing';
    import { DebugElement } from '@angular/core';
    import { of } from 'rxjs';
  ...
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);
  });
  ...
```

> **IMPORTANT** - You need to copy the whole module declaration from 'src/app/app.module.ts' as we are mocking up the complete Angular Module. 
> You will also need to copy all imports from the very top of you module file.

We now have a completely mocked up module, with our AppComponent and CompanyService bound to it.

- Change the test to use the created fixture

**src/app/app.component.spec.ts**
```
  ...
  it(`companyCount = 1`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: "Fake Company C",
        email: "fakeEmail@ssw.com.au",
        number: 12345
      }
    ]))
    fixture.detectChanges();

    expect(component.companyCount$.subscribe(c => {
      expect(c).toEqual(1);
    }))
  });
  ...
```

Now we have a test that runs against a completely mocked up AppComponent bundled with its dependencies. The fixture creates the component just like it the browser would in real life. Using DebugElement, you can even query the DOM for further tests.

- Make sure the navigation DOM has an idea on the span containing companyCount, as we will use a CSS Selector to query the DOM

***src/app/app.component.html***
```
...
    <li class="nav-item" [routerLinkActive]="'active'">
        <a class="nav-link" [routerLink]="['/company/list']">
          Companies (<span id="company-count">{{ companyCount$ | async }}</span>)
        </a>
    </li>
...
```

- Create a new test to query the DOM

**src/app/app.component.spec.ts**
```
  ...
      import { By } from '@angular/platform-browser';
  ...
  it(`CompanyCount HTML should update`, () => {
    spyOn(companySvc, 'getCompanies').and.returnValue(of([
      {
        name: "Fake Company C",
        email: "fakeEmail@ssw.com.au",
        number: 12345
      }
    ]))
    fixture.detectChanges();

    let el = fixture.debugElement.query(By.css('#company-count')).nativeElement;

    expect(el.textContent).toEqual('1');
  });
  ...
```

