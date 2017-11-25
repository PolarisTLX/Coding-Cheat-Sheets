
to use a fake back-end server to test:
jsonplaceholder.typicode.com
Fake Online REST API for Testing and Prototyping


Angular applications dont use href attribute.
example: <a href="#">
because this causes the entire angular application to reload which causes the page to flicker with a noticeable delay




The Seperation of Concerns Principle:
in OOP, a class should only be responsible for ONLY 1 thing.
A class that does many things is hard to maintain and hard to test.
Also often means that one change needs to be updated in many locations.
Should ideally only have to make 1 change to update everything.



"Observables" and "Promises" are used to work with asynchronous operations.
Angular works primarily with "Observables"

"Observables" are lazy.
"Promises" are eager.
With "Observables" nothing happens until you "subscribe" to them with .subscribe()

The 2 most common operators used with "Observable" in Angular are .map and .catch

"Observables" allow "Reactive Programming" (rxjs):
There is an Observable operator called .retry(#) that is very powerful/handy
if you get a failed call to the server, this will retry however many times you want
this saves you many lines of code which would need for loops etc.

You can always convert an obserable into a promise if you absolutely need to

<---LINTER for Angular (built-in)--->
(NOTE I actually prefer just the lints I added myself to atom than these details below)

in the file tslint.json you can configure the way your code editor prompts you to use certainstyling
example, alway use "" insetad of ''.
can type in CP: "ng lint" to see all errors that dont conform to the styles you established in tslint.json
then in CP type:  "ng lint --fix" to automaticaly fix many of the small errors
the type in CP: "ng lint" again to see what errors are left
