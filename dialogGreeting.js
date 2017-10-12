var builder = require('botbuilder');

module.exports = [
    (session,args) => {
        var name = builder.EntityRecognizer.findEntity(args.entities, 'greeting.Name');
        if (name && !session.userData.name){
            session.userData.name = name.entity;
            session.endDialog(`Hi! ${session.userData.name}. How can I help?`);
        }
        else if (!session.userData.name){
            builder.Prompts.text(session,"Hi! What's your name?");
        }else {
            session.endDialog(`Hi! ${session.userData.name}`);
        }
    },
    (session, results, next) => {
        if (results.response) {
            session.userData.name = results.response;
            session.endDialog(`Hi! ${session.userData.name}`);
        }
    }
    
];