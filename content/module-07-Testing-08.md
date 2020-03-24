## Summary
##### Time: 5min



```
import { ImportDestructuringSpacingRule } from 'codelyzer';
import { JokeService } from './joke.service';
import { TestBed, inject } from '@angular/core/testing';
import {
    BaseRequestOptions,
    Http,
    HttpModule,
    RequestMethod,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


describe('Service: HeroSearch', () => {
    let mockBackend: MockBackend;
    let jokeService: JokeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                JokeService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });
    });

    beforeEach(inject([XHRBackend, Http],
        (mb: MockBackend, http: Http) => {
            mockBackend = mb;
            jokeService = new JokeService(http);
        }));

    it('should exist', () => {
        expect(jokeService).toBeTruthy();
    });

    it('should return observable with a joke', (done) => {
        mockBackend.connections.subscribe((connection: MockConnection) => {
            expect(connection.request.method).toEqual(RequestMethod.Get);
            expect(connection.request.url).toEqual('http://api.icndb.com/jokes/random');
            connection.mockRespond(new Response(new ResponseOptions({
                body: { value: { joke: 'FAKE JOKE' } }
            })));
        });
        jokeService.getJoke().subscribe(result => {
            expect(result).toEqual('FAKE JOKE');
            done();
        });
    });
});

```

## With long version 
##### Time: 5min

```
import { JokeService } from './joke.service';
import { TestBed, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';


describe('Service: HeroSearch', () => {
  let mockBackend: MockBackend;
  let jokeService: JokeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        JokeService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  });

  beforeEach(inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      jokeService = new JokeService(http);
    }));

  it('should exist', () => {
    expect(jokeService).toBeTruthy();
  });

  it('should return observable with a joke', (done) => {
    mockBackend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('http://api.icndb.com/jokes/random');
      connection.mockRespond(new Response(new ResponseOptions({
        body: {value: {joke: 'FAKE JOKE'}}
      })));
    });
    jokeService.getJoke().subscribe(result => {
      expect(result).toEqual('FAKE JOKE');
      done();
    });
  });
});

```