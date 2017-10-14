var restify = require('restify');
var builder = require('botbuilder');

var luis = require('./luis');

var createTicket = require('./dialogCreateTicket');
var helpDeskFlow = require('./dialogHelpDesk');
var helpdesk = require('./helpdesk/all');



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
//intents.matches(/\b(tset|tedt|test|test)\b/i, '/test');
intents.matches('helpdesk','/helpDesk');

//bot.dialog('/test', require('./dialogTest'));
bot.dialog('/', intents);
bot.dialog('/greeting', require('./dialogGreeting'));
createTicket(bot);
helpDeskFlow(bot);
helpdesk.outlook(bot);
helpdesk.vpn(bot);
/*
Below are the dialogs and helper dialogs for creating INC in SNOW
*/

