var restify = require('restify');
var builder = require('botbuilder');
var createTicket = require('./dialogCreateTicket');

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector();

// Listen for messages from users 
server.post('/api/messages', connector.listen());


// Create your bot with a function to receive messages from the user
var bot = new builder.UniversalBot(connector);

const LuisModelUrl = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/061cfb89-c4af-471e-80bb-662d5d096d38?subscription-key=62ea92a6dad241628c1489c0333d166f&timezoneOffset=0&verbose=true&q=';

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);
var intents = new builder.IntentDialog({ recognizers: [recognizer] })
.onDefault((session) => {
    session.send('Sorry, I did not understand \'%s\'.', session.message.text);
});
intents.matches('openTicket','/createTicket');
intents.matches('greeting','/greeting');

bot.dialog('/', intents);
createTicket(bot);
bot.dialog('/greeting', require('./dialogGreeting'));

/*
Below are the dialogs and helper dialogs for creating INC in SNOW
*/

