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
            builder.Prompts.text(session,"What is the issue that you are facing?")
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

    ]);

    bot.dialog('extractInfo',[
        (session, args, next) => {
            //args is an array of Entities/Issues mentioned by user.

            session.dialogData.identifiedApps = args || {};
            if (args.length == 0) {
                session.endDialog();
            }else {
                entity = session.dialogData.identifiedApps.shift();
                console.log(entity.entity);
                if (apps.indexOf(entity.entity.toLowerCase()) > -1) {
                    session.send("Let's discuss " + entity.entity);
                    session.beginDialog('dialog-' + entity.entity);
                }else {
                    session.send("Sorry, I could not find anything for " + entity.entity);
                    session.send("Please try again! ");
                }
            }
        },
        (session,next) => {
            session.replaceDialog('extractInfo',session.dialogData.identifiedApps);
        }
    ]);


};


getDialog = (listOfDialogs)=>{
    return listOfDialogs[Math.floor(Math.random()*listOfDialogs.length)];   
}

var none = function(){
    return
}

