var restify = require('restify');
var builder = require('botbuilder');

var luis = require('./luis');

var createTicket = require('./dialogCreateTicket');
var helpDeskFlow = require('./dialogHelpDesk');
var getIncidentStatus = require('./dialog-get-status-number');
var helpdesk = require('./helpdesk/all');
var test = require('./dialogTest');
var kbSearch = require('./dialog-search-base');
var createIncident = require('./dialog-create-incident');
var createIncident = require('./dialog-PCReplacement');


// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector();

// Listen for messages from users 

function respond(req, res, next) {
    res.send('Everyone in IT needs a Dark-Knight');
    next();
  }

server.post('/api/messages', connector.listen());
// Serve a static web page
server.get(/.*/, respond);

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
intents.matches('helpdesk','/helpDesk');
intents.matches('ticketStatus-Number','get-incident-info-number');
intents.matches('laptopReplacement','/PCReplacement');
intents.matches(/\b(hubot||hubot|Hubot)\b/i, 'dialog-search-base');
intents.matches(/\b(tset|tedt|test|test)\b/i, '/test');



test(bot);
createTicket(bot);
helpDeskFlow(bot);
getIncidentStatus(bot);
kbSearch(bot);
createIncident(bot);
helpdesk.outlook(bot);
helpdesk.vpn(bot);
bot.dialog('/', intents);
bot.dialog('/greeting', require('./dialogGreeting'));
