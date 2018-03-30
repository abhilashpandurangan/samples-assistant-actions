# weather

This is an action that tells current weather of the city by using the Actions SDK.

# Get Started

## Create a project

1. Go to the Actions on Google Developer Console.
1. Click on Add Project, enter name for the project, and click Create Project.
1. In the Overview screen, click BUILD on the Actions SDK card, and make note of the gactions command. You'll need to use this command when uploading your action package for approval.

``` bash
$ gactions update --action_package PACKAGE_NAME --project PROJECT_NAME
```

[Create a project and action package - Create a project](https://developers.google.com/actions/sdk/create-a-project)

## Download the gactions CLI.

Install the gactions CLI from [here](https://developers.google.com/actions/tools/gactions-cli).

## Deploy the fulfillment

Download and install [Node.js](https://nodejs.org/en/).

Set up and initialize the Firebase CLI. If the following command fails with an EACCES error, you may need to [change npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

``` bash
$ npm install -g firebase-tools
```

Authenticate the firebase tool with your Google account:

``` bash
$ firebase login
```

Associate the firebase tool with your Actions project:

``` bash
$ cd ./fulfillment
$ firebase use <GOOGLE_PROJECT_ID>
```

Initialize a Firebase project in this directory.

```
NOTE: Please don't overwrite ```functions/package.json``` and ```functions/index.js```.
```

``` bash
$ firebase init

     🔥🔥🔥🔥🔥🔥🔥🔥 🔥🔥🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥     🔥🔥🔥     🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥
     🔥🔥        🔥🔥  🔥🔥     🔥🔥 🔥🔥       🔥🔥     🔥🔥  🔥🔥   🔥🔥  🔥🔥       🔥🔥
     🔥🔥🔥🔥🔥🔥    🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥   🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥
     🔥🔥        🔥🔥  🔥🔥    🔥🔥  🔥🔥       🔥🔥     🔥🔥 🔥🔥     🔥🔥       🔥🔥 🔥🔥
     🔥🔥       🔥🔥🔥🔥 🔥🔥     🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥 🔥🔥🔥🔥🔥🔥🔥🔥  🔥🔥     🔥🔥  🔥🔥🔥🔥🔥🔥  🔥🔥🔥🔥🔥🔥🔥🔥

You're about to initialize a Firebase project in this directory:

  /Users/lakeel/actions-on-google/weather-actions-sdk

? Which Firebase CLI features do you want to setup for this folder? Press Space to select features, then Enter to confirm your choices. Functions: Configure and deplo
y Cloud Functions

=== Project Setup

First, let's associate this project directory with a Firebase project.
You can create multiple project aliases by running firebase use --add,
but for now we'll just set up a default project.

? Select a default Firebase project for this directory: actions-on-google (actions-on-caaac)

=== Functions Setup

A functions directory will be created in your project with a Node.js
package pre-configured. Functions can be deployed with firebase deploy.

? What language would you like to use to write Cloud Functions? JavaScript
? Do you want to use ESLint to catch probable bugs and enforce style? No
? File functions/package.json already exists. Overwrite? No
i  Skipping write of functions/package.json
? File functions/index.js already exists. Overwrite? No
i  Skipping write of functions/index.js
? Do you want to install dependencies with npm now? No

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

✔  Firebase initialization complete!
```

Get the fulfillment dependencies and deploy the fulfillment:

``` bash
$ cd ./functions
$ npm install
$ firebase deploy --only ../functions
```

The deployment takes a few minutes. Once completed, you'll see output similar to the following. You'll need the Function URL to enter in Dialogflow.

``` bash
✔  Deploy complete!

Project Console: https://console.firebase.google.com/project/myprojectname-ab123/overview
Function URL (cloudFunctionName): https://us-central1-myprojectname-ab123.cloudfunctions.net/cloudFunctionName
```

Create an object inside the conversations object to declare your fulfillment in your action package:

``` json

"conversations": {
  "myFulfillmentFunction": {
    "name": "myFulfillmentFunction",
    "url": "https://us-central1-myprojectname-ab123.cloudfunctions.net/cloudFunctionName"
  }
}

```

[Deploy Fulfillment](https://developers.google.com/actions/sdk/deploy-fulfillment)

## Deploy the action

Updates the draft action in the Assistant app for the given project:

``` bash
$ gactions update --action_package action.json --project <GOOGLE_PROJECT_ID>
```

## Test

Pushes an action package to the Assistant Platform for testing:

``` bash
$ gactions test --action_package action.json --project <GOOGLE_PROJECT_ID>
```

After pushing an action package, use the Actions Web Simulator for test.