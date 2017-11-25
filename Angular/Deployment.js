<--DEPLOYEMENT-->

Optimising code to make deployment easier with less data spaces
This includes:
    -Minification
    -Uglyfication
    -Bundling
    -Dead code elimination
    -Ahead-of-time (AOT) compilation

Angular has built-in Command Promt function to optomise:
 ng build --prod



<---- 3 WAYS TO DELPOY SITES ONLINE!!!----->
1.GitHub Pages: Simple 1 page sites with  NO BACK-END OR DATABASE!!
Can only deply apps with HTML/CSS/JavaScript files (ie "static content"), nothing else
2. FIREBASE: Google cloud based BACKEND & DATABASE!!! for web/mobile apps
3. HEROKU: Similar to FIREBASE but less simple, it allows you to build your own custom back-end (/database?)
4. Azure by Microsoft is another option, its more sofisticated with more features but Heroku is simpler and more elegant
used in larger organisations, slower to get started.

1. Github Pages (how to run Angular in github pages:)

-missed a step involving git and command prompt?
-need to type in CP: npm i -g angular-cli-ghpages
//EXACT SPELLING BELOW VERY IMPORTANT, THE WHOLE THING
-type in CP: ng build --prod --base-href="https://polaristlx.github.io/Portfolio/"
//change "/Portfolio/ to whatever repository name"
-to deplay to github pages, type in CP:
"angular-cli-ghpages"  or "ngh" (same but shorthand?)
-it should now be up on GH-Pages
