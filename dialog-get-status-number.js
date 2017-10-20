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
                    session.endDialog('Sorry! I failed to retrieve the incident details. The issue has been reported to my developers. Please try again!');
                }

                snow.getSnowTicket(session, number.entity, onSuccess, onError);
            }else{
                builder.Prompts.text(session,"Unfortunately, I couldn't recognize the Incident Number. Please try again!")
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
                session.endDialog('Sorry! I failed to retrieve the incident details. The issue has been reported to my developers. Please try again!');
            }
            snow.getSnowTicket(session, number,onSuccess, onError);


        }
    ])
}