Angular applications dont use href attribute.
example: <a href="#">
because this causes the entire angular application to reload which causes the page to flicker with a noticeable delay

// simple routes:
<a routerLink="/followers">
// if dealing with route parameters, use property binding syntax
<a [routerLink]="['followers', follower.id]">
//<a [routerLink]="['path', route arguments]">


Making elements "active":
<li class="active"><a routerLink="..."...
becomes:
<li routerLinkActive="active current"><a routerLink="/followers">Followers</a></li>
where here "active current" are two css classes then get added when these links are clicked
you can add as many as you want, just seperate with spaces
