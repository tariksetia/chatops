var builder = require('botbuilder');
var snow = require('./snow');
var cards = require('./helperCard');

module.exports = (bot) => {
    bot.dialog('dialog-create-incident',[
        (session,args,next) => {
            
            session.dialogData.description = args.description||none();

            if (session.dialogData.description) {
                next()
            }else{
                builder.Prompts.text(session,"Please enter the description of the issue.")
            }
        },
        
        (session,results) => {
            if(results.response){
                session.dialogData.description = results.response;
            }

            onSuccess = (session,incident)=>{
                //console.log(JSON.stringify(session));
                var incidentCard;
                if (session.message.address.channelId == 'cortana'){
                    session.send("I have created " + incident.number );
                    session.endDialog();
                }else{
                    var incidentCard = cards.incidentInfoCard(session,incident);
                    session.send(incidentCard);
                    session.endDialog();
                }
                                
            }
            onError = (session) => {
                session.endDialog('Failed to create Incidnet. Please try again');
            }

            snow.createSnowTicket({
                "caller_id": 'admin',
                "category": 'HelpDesk',
                "subcategory": 'HelpDesk',
                "short_description": session.dialogData.description,
                "description": session.dialogData.description,
            }, session, builder, onSuccess, onError);
        }
    ])
}

none = function() {
    return null
}