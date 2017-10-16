/* Cheat-sheet to setup React environment:

1. Create repository / folder with github desktop.
2. Use Command Prompt (CP) to cd into that folder
3. In CP type:  npm init,  then yes to everything (
this creates the package.JSON file

4. Install the production dependencies (--save):

in CP type:
 "npm install react react-dom --save"

 Install development dependencies (--save-dev):
 (these will not be run during deployment, only development)
 "npm install webpack webpack-dev-server babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-2 --save-dev"

 babel-preset-stage-2 is for some extra features like structuring

 5. prepare files as provided in this cheat-sheet folder

 6. Run in CP:  npm start
