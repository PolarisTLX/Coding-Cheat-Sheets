<----DEVELOPMENT ENVIRONMENTS--->

when building the website, you can place certain identifiers for the state of the page/application
into the environment.ts file. Example:
You can place the word TESTING when the version of the page is the testing / non-final one
or the color othe navbar is bright red instead.

then when loading the page,
INSTEAD of using "ng serve"
type  "ng serve --prod"
(which apparently is the same as typing: "ng serve --environment=prod")

NavBar Example:

file environment.ts:
        export const environment = {
         production: false,
         // make the navbar red for the testing version of the page/app (the testing "environment")
ADDED-->  navBarBackgroundColor: 'red'
       };

//normal environment, final / latest stable version that the user sees?
file environment.prod.ts:
         export const environment = {
           production: true,
ADDED-->    navBarBackgroundColor: 'blue'
         };

file navbar.component.ts:
         import { Component, OnInit } from '@angular/core';
ADDED-->  import { environment } from './../../environments/environment';

         @Component({
           selector: 'navbar',
           templateUrl: './navbar.component.html',
           styleUrls: ['./navbar.component.css']
         })
         export class NavbarComponent implements OnInit {

ADDED-->    //  changing based on the page/app environment such as development
ADDED-->    backgroundColor = environment.navBarBackgroundColor;

           constructor() { }

           ngOnInit() {
           }
         }


file navbar.component.html:
       <nav
ADDED-->  [style.backgroundColor]="backgroundColor"
         class="navbar navbar-default">
         <div class="container-fluid">
           <div class="collapse navbar-collapse">
             <ul class="nav navbar-nav">
               <li routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                 <a routerLink="/">Home</a>
               </li>
               <li routerLinkActive="active">
                 <a routerLink="/followers">Followers</a>
               </li>
             </ul>
           </div>
         </div>
       </nav>



<---CUSTOM ENVIRONMENTS--->
duplicate file: environemt.prod.ts and name that:
environment.test.ts  for example

now open file: .angular-cli.json
and add / list your new file in the "environments" section

       "environments": {
         "dev": "environments/environment.ts",
         "prod": "environments/environment.prod.ts",   (',' added at end here)
ADDED---> "test": "environments/environment.test.ts"
       }

then when all files saved, in CP type:
"ng serve --environment=test"
or
"ng build --environment=test" ???

NOTE unlike normal dev environment ("ng serve"),
in other environments hotsaves will not be visible on the page when you make changes and like normal
will need to stop and run server each time
