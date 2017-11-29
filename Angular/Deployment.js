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

a short it seems is to go to file package.json
in "scripts" section, add a new line:
"deploy:gh": "ng build --prod --base-href='https://polaristlx.github.io/Portfolio/' && ngh"

then in CP type:  npm run deploy:gh


2. FireBase

-provided by google, used for front-end+back-end/database of web/mobile apps
- go to https://console.firebase.google.com and sign-in
-click create new project and name it.
-intall firebase:  in CP type: "npm i -g firebase-tools"
-log into firebase account in CP, type: "firebase login"
-initialise firebase in the project folder. In CP type: "firebase init"
- You are presented with ~5 options that you can select with the up/down arrow keys
- selected "Hosting:..."
- then select the app you want to host with up/down arrow keys
-this creates 2 files, one of which is Firebase.json
-open firebase.json in editor and type:
          {
            "hosting": {
              "public": "dist"
            }
          }

-make ure project is ready for Firebase deployment,
do this by typing in teh directoryt in CP: "ng build --prod"
-Now deploy to firebase, in CP type: "firebase deploy"
-Now need to add corrections to firebase.json:
        {
          "hosting": {
            "public": "dist",
            //this is to correct errors with regards to index.html and extra directories
            //your site/app has that is beyond the the main site
            "rewrites": [
              {
                "source": "**",
                //"**" means any.all URLs/directories
                "destination": "/index.html"
                //redirect all to index.html every time
              }
            ]
          }
        }
-Now repeat deploy, by typing in CP: "firebase deploy"
-All sub-directories/deeper URL directories will work now and not just home page

-Shortcut to all that is to write in file "package.json" a script to do all this at once:
-"deploy:firebase": "ng build --prod && firebase deploy"
-Now can deploy by going to directory in CP and typing: "npm run deploy:firebase"

3. Heroku. Like Firebase but when you want to build your back-end yourself
(such as Node, or ASP.net etc).
-Need to Download and install Heroku-CLI installer for Windows at:
https://devcenter.heroku.com/articles/heroku-cli

//NOTE SURE WHY THIS IS HERE
(-in your project forlder, find the file "server.js")

-in CP type "heroku login" and do so
-in CP type: "heroku create app-name (or leave blank)"
-it gives you the link.  Ex: polaris-first-angular.herokuapp.com
-in CP type: "heroku open" //doesn't work in CP?

-now to place our app in that place:
-in file package.json:
-need to cut "@angular/cli": "1.2.4" + "@angular/compiler-cli": "^4.0.0" + "typescript": "~2.3.3"  (check for comma errors)
 from the "devDependencies" to the "dependencies" in this order:
    -The angular ones go to thhe top of the list
    -The typescript goes between "rxjs" and "zone.js" near the bottom as so:

        "bootstrap": "^3.3.7",
        "core-js": "^2.4.1",
        "rxjs": "^5.4.1",
        "typescript": "~2.3.3",
        "zone.js": "^0.8.14"

-now in the "scripts" section:
  -add "postinstall": "ng build --prod",  AFTER "e2e"

-Now backend?
-in CP type: "npm i express --save"
-in pacakage.json, in "scripts" section,
    -change "start": "ng serve"  to  "start": "node server.js"
    this is our web server. The file server.js is involved in this but nothing needs to be done to it.

-need to commit our changes to git:
  -in CP type: "git add ."
  -then type: "git commit -m "Description of commit (Ex: Prepare for heroku)""
  -then type: "git push heroku master"



Precautionary step: Engines:
-in the package.json add:
      "engines": {
        "node": "6.11.0",
        "npm": "5.5.1"
      }
-check first to see what version of node and npm you are running
 by typing in CP: "node --version" and "npm --version"
 and make sure those numbers are what is above.



Steps below seemed to not be needed when I made sure that my app was completely by itself in its own repository.


-need to add heroku as a remote:
  -in CP type: "heroku git:remote -a heroku-app-name"  //this only works with "Heroku Toolbelt"?
     Ex: "polaris-first-angular"
  -then type: "git push heroku master"
  -if that doesnt work (needs Heroku Toolbelt?) then do this:
     -type: "git remote add heroku git@heroku.com:heroku-app-name.git"
     Ex: git remote add heroku git@heroku.com:polaris-first-angular.git




ERROR RESOLUTIONS:

https://devcenter.heroku.com/articles/keys

A common key error is: Permission denied (publickey). You can fix this by using keys:add to notify Heroku of your new key. Or by using http-git.

In order to run these commands on a Windows machine, run the Git Bash application. A shortcut for this application should be on your desktop, installed as part of the Heroku CLI.

To generate a public key:
$ "ssh-keygen -t rsa"
        Generating public/private rsa key pair.
        Enter file in which to save the key (/Users/adam/.ssh/id_rsa):
        Enter passphrase (empty for no passphrase):
        Enter same passphrase again:
        Your identification has been saved in /Users/adam/.ssh/id_rsa.
        Your public key has been saved in /Users/adam/.ssh/id_rsa.pub.
        The key fingerprint is:
        a6:88:0a:0b:74:90:c6:e9:d5:49:d6:e3:04:d5:6c:3e adam@workstation.local
Press enter at the first prompt to use the default file location. Next, type a secure passphrase for the key.

Adding keys to Heroku
Upload your key to heroku with:
"heroku keys:add"


ERROR:

No default language could be detected for this app.
			HINT: This occurs when Heroku cannot detect the buildpack to use for this application automatically.
			See https://devcenter.heroku.com/articles/buildpacks

Setting a buildpack on an application
You can change the buildpack used by an application by setting the buildpack value. When the application is next pushed, the new buildpack will be used.
$ "heroku buildpacks:set heroku/nodejs"
    Buildpack set. Next release on random-app-1234 will use heroku/php.
    Run `git push heroku master` to create a new release using this buildpack.
