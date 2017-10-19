var builder = require('botbuilder');
var cards = require('./helperCard');
var snow = require('./snow')

module.exports = (bot) => {
    bot.dialog('get-incident-info-number',[
        (session,args,next) => {
            var number = builder.EntityRecognizer.findEntity(args.entities, 'recNumber');
            if(number){

                onSuccess = (session,incident)=>{
                    //console.log(JSON.stringify(session));
                    var incidentCard;
                    if (session.message.address.channelId == 'cortana'){
                    }else{
                        var incidentCard = cards.incidentStatusCard(session,incident);
                        session.send(incidentCard);
                        session.endDialog();
                    }
                }

                onError = (session) => {
                    session.endDialog('Could not get incident information at the moment. Please try again later.');
                }

                snow.getSnowTicket(session, number.entity, onSuccess, onError);
            }else{
                builder.Prompts.text(session,"I couldn't recognize any Incident Number. Please enter one.")
            }
        },
        (session,results,next) => {
            var number = results.response;

            onSuccess = (session,incident)=>{
                //console.log(JSON.stringify(session));
                var incidentCard;
                if (session.message.address.channelId == 'cortana'){
                }else{
                    var incidentCard = cards.incidentStatusCard(session,incident);
                    session.send(incidentCard);
                    session.endDialog();
                }
            }


            onError = (session) => {
                session.endDialog('Could not get incident information at the moment. Please try again later.');
            }
            snow.getSnowTicket(session, number,onSuccess, onError);


        }
    ])
}