var builder = require('botbuilder');


module.exports = (bot) => {
    bot.dialog('dialog-vpn',[
        (session) => {
            session.endDialog("VPN Conversation Not Implemented");
        }
    ])
}