var builder = require('botbuilder');


module.exports = (bot) => {
    bot.dialog('dialog-incident-form',[
        (session) => {      
            session.endDialog()
          }
    ]);


}


//Helper Cards