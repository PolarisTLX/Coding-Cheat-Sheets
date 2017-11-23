2 types of forms in Angular:

Template-driven forms:  better for simple forms with simple validation

Reactive forms: Gives you more control over validation logic
Good for complex forms
Unit Testable

validators in template driven forms, use HTML5 validators
but reactive forms do not

they use, in the .ts file:
Validators.required
Validators.minLength(#)
Validators.maxLength(#)
Validators.pattern
Validators.email
(check spelling of these, different in the .ts file versus all small-caps in the .html file)



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
