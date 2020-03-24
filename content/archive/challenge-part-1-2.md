## Final Code
##### Time: 0min


```
git clone 'https://firebootcamp:Angular2rocks!@firebootcamp.visualstudio.com/FireBootCamp.Angular/_git/firebootcamp-challenge'
```

### Code for the Completed Lesson
To obtain the code for the completed lesson execute the following git commands.
***src/app/app.component.html**
```
<fbc-people></fbc-people>
```

***src/app/app.module.ts**
```
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PeopleComponent } from './people/people/people.component';
import { PeopleService } from './people/people.service';

@NgModule({
  declarations: [
    AppComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

***src/app/people/people.component.html**

```
{{person | json}}
<input type="text" name="seartchTerm" [(ngModel)]="searchTerm">
<button (click)="searchPeople()">Get</button>
<ul>
  <li *ngFor="let person of people$ | async">{{person.name}}</li>
</ul>
```

***src/app/people/people.component.ts**

```
import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../people.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'fbc-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people$: Observable<any[]>;
  person: any;
  searchTerm: string;

  constructor(private peopleService: PeopleService) { }

  ngOnInit() {
    this.getPeople();
  }

  getPeople() {
    this.people$ = this.peopleService.getPeople();
  }

  searchPeople() {
    this.peopleService.serachPeople(this.searchTerm)
      .subscribe(person => this.person = person);
  }

}
```

***src/app/people/people.service.ts**

```
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {

  constructor(private http: Http) { }

  getPeople() {
    return this.http.get(`https:swapi.co/api/people`)
      .map(response => response.json().results);
  }

  serachPeople(searchTerm: string) {
   return this.http.get(`https://swapi.co/api/people/?search=${searchTerm}`)
     .map(response => response.json().results);
  }

}

```