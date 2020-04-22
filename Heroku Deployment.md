# Deployment instructions for Heroku
These instructions are intended for deploying the current application to Heroku if that is necessary. The second portion of this instruction set will talk about deploying and building the application if you need to make changes to it in any way.

To redeploy the application in its current state, log into Heroku using the climber.crowd.contact@gmail.com email and password. Then go to [https://dashboard.heroku.com/apps/obscure-scrubland-82904/deploy/heroku-git](https://dashboard.heroku.com/apps/obscure-scrubland-82904/deploy/heroku-git) and simply follow the instructions to install the Heroku CLI to clone the back-end repository and deploy the app in its current state.

## Cloning the front-end
In the previous instructions, you git cloned the back-end repository. To work on the front-end run the following command to clone it - this should be done in a separate place than the back-end folder. `git clone https://github.com/Ryguy11o/climber_crowd_frontend`

## Local Development
Both the front-end and back-end were created to support local development. To start local development, first make sure you have both the back-end and front-end repositories cloned to your local machine. `cd` into the back-end folder and run `node index.js` or `npm run start` either one will work. If you are making changes to the node.js server, then it is recommended to download the nodemon package and run `nodemon index.js`. This will make the server automatically restart after saving changes, instead of having to stop the server and restarting it manually after every change. Once the server is started, go back to your front-end folder. Now you are going to want to run `npm run serve` which will create a local development server for your front-end. To view the local application go to `localhost:8080` in your browser. This application is dependent on your back-end server being ran at the same time so make sure that it is running in a different console or terminal window.

## Front-end building
As is typical with web development, there is both front-end code and back-end code. The front-end has to be 'built' with a service called Webpack and then served from the back-end. 

In the front-end repository you can make changes to the front-end and test locally (see previous section for instructions on how to do this). When you are done with development you are then ready to build and deploy. In the front-end folder type the command `npm run build`, this will build the front-end and create a `/dist` folder in the front-end directory. Copy the whole `/dist` folder, go to the back-end repository, delete the `/dist` folder currently in the back-end repository, and replace it with the folder you currently have copied. The app now has your changes set locally, to deploy to production follow the first section of these instructions that links to Heroku's website to redeploy.
 
## Change the production domain name
If you need to change the applications domain name to something else, first you will need to find the instructions on Heroku for changing your domain to that you DNS provider that you bought the domain name from,  then you will have to make a small change to the front-end code. 

Follow the previous steps for cloning the front-end repo, then go into the file named `.env.production` there should only be one line in there that currently says `VUE_APP_BASE_URL=https://obscure-scrubland-82904.herokuapp.com` to change the domain on the code side simply replace the url in this code to whatever the new domain is `VUE_APP_BASE_URL=https://www.example.com` for example. You will then need to re-build and deploy the front-end following the previous instructions.

