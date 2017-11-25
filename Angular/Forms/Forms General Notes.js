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
