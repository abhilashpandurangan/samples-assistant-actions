'use strict';

const functions = require('firebase-functions');
const ActionsSdkApp = require('actions-on-google').ActionsSdkApp;

const FETCH_WEATHER_INTENT = `FetchWeatherIntent`;

exports.action = functions.https.onRequest((request, response) => {
    const app = new ActionsSdkApp({ request: request, response: response });

    function responseHandler(app) {
        let intent = app.getIntent();
        switch (intent) {
            case app.StandardIntents.MAIN:
                app.ask(`Welcome! Say number.`);
                break;
            case app.StandardIntents.TEXT:
                let text = app.getArgument(`text`);
                app.tell(`You said '${text}'`);
                break;
            case FETCH_WEATHER_INTENT:
                let city = app.getArgument(`city`);
                app.tell(`${city} is cleary.`);
                break;
        }
    }

    app.handleRequest(responseHandler);
});

