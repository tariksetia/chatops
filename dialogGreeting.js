var builder = require('botbuilder');

module.exports = [
    (session,args) => {
        var name = builder.EntityRecognizer.findEntity(args.entities, 'greeting.Name');
        if (name && !session.conversationData.name){
            session.conversationData.name = name.entity;
            //session.send("I can create an incident for Applications, Hardware and Software, Read out the FAQ's or help you get a replacement for your Corporate PC.");
            session.endDialog(`**Hello**! ${session.conversationData.name}`);
            session.send("I am capable of creating incident for Applications, Hardware and Software, provide you technical assistance or help you get a replacement for your Corporate PC.");
            session.send("So how can I be of assistance to you today?")
            
        }
        else if (!session.conversationData.name){
            builder.Prompts.text(session,"**Hello**! What is your name?");
            //session.send("I can create an incident for Applications, Hardware and Software, Read out the FAQ's or help you get a replacement for your Corporate PC.");
        }else {
            session.endDialog(`Hi! ${session.conversationData.name}`);
            session.send("I am capable of creating incident for Applications, Hardware and Software, provide you technical assistance or help you get a replacement for your Corporate PC.");
            session.send("So how can I be of assistance to you today?")
        }
    },
    (session, results, next) => {
        if (results.response) {
            session.conversationData.name = results.response;
            session.endDialog(`Hi! ${session.conversationData.name}`);
            session.send("I am capable of creating incident for Applications, Hardware and Software, provide you technical assistance or help you get a replacement for your Corporate PC.");
            session.send("So how can I be of assistance to you today?")
        }
    }
    
];