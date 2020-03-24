## Overview
##### Time: 5min

In this challenge, we will build a search input field with ngModel

### Learning Outcomes: 
- How to use ngModel
- How to call HTTP endpoints


## Challenge steps
##### Time: 0min

- Create a new project

```
ng new challenge --prefix fbc
```

- Add a people component in a people feature folder
```
ng g c people/people --spec false
```

- Add a people service in a people feature folder
```
ng g c people/service --spec false
```

- Add a ```getPeople``` method in the ```PeopleService``` that calls this endpoint ```https:swapi.co/api/people```. 
- Bind the returned data to an unordered list in the component with an async pipe and a property called people$
```
<ul>
  <li *ngFor="let person of people$ | async">{{person.name}}</li>
</ul>
```
- Add an imput with ngModel and bind it to a component property called ```searchTerm```
- Add button that calls a ```searchPeople``` method in the people service with the below endpoint.
```
https://swapi.co/api/people/?search=${searchTerm}
```
- Output the returned json from the searchPeople method bound to a ```people``` property with the json pipe to the top of the page.
```
{{person | json}}
```

***Figure: Working app in browser***
![](https://firebootcamp.ghost.io/content/images/2017/02/2017-02-23_07-37-13.jpg)