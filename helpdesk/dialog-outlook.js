var builder = require('botbuilder');


module.exports = (bot) => {
    bot.dialog('dialog-outlook',[
        (session) => {
            session.endDialog("Outlook Conversation Not Implemented");
        }
    ])
}