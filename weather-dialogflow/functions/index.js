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
				conv.ask(new BasicCard({
  text: `This is a basic card.  Text in a basic card can include "quotes" and
  most other unicode characters including emoji 📱.  Basic cards also support
  some markdown formatting like *emphasis* or _italics_, **strong** or
  __bold__, and ***bold itallic*** or ___strong emphasis___ as well as other
  things like line  \nbreaks`, // Note the two spaces before '\n' required for
                               // a line break to be rendered in the card.
  subtitle: 'This is a subtitle',
  title: 'Title: this is a title',
  buttons: new Button({
    title: 'This is a button',
    url: 'https://assistant.google.com/',
  }),
  image: new Image({
    url: 'https://example.com/image.png',
    alt: 'Image alternate text',
  }),
  display: 'CROPPED',
}));
                break;
            default:
                app.tell('Since I\'m still having trouble. Let’s play again soon. Bye!');
                break;
        }
    }

    app.handleRequest(responseHandler);
});