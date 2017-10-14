var builder = require('botbuilder');
var snow = require('./snow')
var cards = require('./helperCard');
var luis = require('./luis')


var apps = ['outlook', 'vpn'];

module.exports = (bot) => {

    bot.dialog('/helpDesk',[
        (session, args,next) => {
            var args = args || none;
            var entities = args.entities || [];
            var intents = args.intents || [];
            if (!entities || entities.length == 0) {
                session.replaceDialog('askForIssue');
            }else {
                session.replaceDialog('extractInfo',entities);
            }
        },
    ]);

    bot.dialog('askForIssue', [
        (session) => {
            builder.Prompts.text(session,"What are you facing issues with?")
        },
        (session,results,next) => {
            var intents;
            var entities;
            luis.recognize(results.response, next, function(err){
                next(results.response);
            })
        },
        (session,args,next)=>{
            entities = args.entities || none;
            session.replaceDialog('extractInfo', entities)
        }

    ])

    bot.dialog('extractInfo',[
        (session, args) => {

           var allApps = args.map((item)=>{
                return item.entity;
           });

           var dialogs = allApps.map(function(app){
            if (apps.indexOf(app)>-1){
               return (sesion)=>{
                    session.beginDialog('dialog-'+ app);
                };
            }
           });
           
           bot.dialog('resolveIssues',dialogs);
           session.beginDialog('resolveIssues');
        }
    ]);

   


};


getDialog = (listOfDialogs)=>{
    return listOfDialogs[Math.floor(Math.random()*listOfDialogs.length)];   
}

var none = function(){
    return
}