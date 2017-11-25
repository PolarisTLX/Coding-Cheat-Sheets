/* Cheat-sheet to setup Angular environment:
(as per Udemy course Angular Complete Course Beginner to Advanced)

1. Create repository / folder with github desktop.
2. Use Command Prompt (CP) to cd into that folder
3. In CP type:  npm install -g @angular/cli


TO CREATE A NEW ANGULAR PROJECT:
example: in CP type:  ng new  hello-world


ALSO NEED TO INSTALL TYPESCRIPT:
in CP type:  npm install -g typescript


to run server to load page into browser:
in CP type: ng serve

then in browser localhost:4200

Angular components filenames convention is:
courses.component.ts
course-forms.component.ts

then you must convert all TypeScript files, .ts  into  JavaScript files, .js
by running in CP:
tsc  filename.ts

(tsc stands for typescript compiler)
this creates the same filename.js  but in .js

to run / test a file in CP, type node filename.js


To quickly create a component with it's own new folder and all of it's needed files:
in CP type: ng g c component-name
(stands for ng generate component component name)
