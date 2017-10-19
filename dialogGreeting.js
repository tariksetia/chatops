var builder = require('botbuilder');

module.exports = [
    (session,args) => {
        var name = builder.EntityRecognizer.findEntity(args.entities, 'greeting.Name');
        if (name && !session.conversationData.name){
            session.conversationData.name = name.entity;
            session.endDialog(`Hi! ${session.conversationData.name}. How can I help?`);
        }
        else if (!session.conversationData.name){
            builder.Prompts.text(session,"Hi! What's your name?");
        }else {
            session.endDialog(`Hi! ${session.conversationData.name}`);
        }
    },
    (session, results, next) => {
        if (results.response) {
            session.conversationData.name = results.response;
            session.endDialog(`Hi! ${session.conversationData.name}`);
        }
    }
    
];