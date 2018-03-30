'use strict';

const functions = require('firebase-functions');
const DialogflowApp = require('actions-on-google').DialogflowApp;

const FETCH_WEATHER = `fetchweather`;
const CITY_ARGUMENT = `city`;

exports.action = functions.https.onRequest((request, response) => {
    const app = new DialogflowApp({ request: request, response: response });

    console.log(JSON.stringify(request.body));

    function responseHandler(app) {
        // Dialogflow is designed to get the action name by calling the 'getIntent()'.
        let intent = app.getIntent();
        switch (intent) {
            case FETCH_WEATHER:
                let city = app.getArgument(CITY_ARGUMENT);
                app.tell(`${city} is cleary.`);
                break;
            default:
                app.tell('Since I\'m still having trouble, so I\'ll stop here. Let’s play again soon.');
                break;
        }
    }

    app.handleRequest(responseHandler);
});