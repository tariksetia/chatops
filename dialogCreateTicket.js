var builder = require('botbuilder');
var snow = require('./snow')
var cards = require('./helperCard');

categories = {
    "Microsoft Office": [
      "Microsoft Powerpoint",
      "Microsoft Word",
      "Microsoft Excel"
    ],
    "Skype": [
      "Connection problems",
      "Contact list issue",
      "Login not possible"
    ],
    "Finance Portal" : [
      "Information Request",
      "Order",
      "Issue"
    ],
    "HR Services" : [
      "Change account information",
      "Set vacation dates",
      "Relocation service"
    ]
  };

module.exports = (bot) => {
    
    bot.dialog('/createTicket', [
        
        (session) => {
            session.send('Cool! Let us start creating ticket.');
            session.beginDialog('/askForCategory');
        },
        (session,results,next) => {
            session.dialogData.category  = results.response.toString().toLowerCase();
            session.beginDialog('askForSubCategory');
        },
        (session, results, next) => {
            session.dialogData.subcategory = results.response.toString().toLowerCase();
            session.beginDialog('askForShortDescription');
        },
        (session, results, next) => {
            session.dialogData.shortDescription = results.response.toString();
            session.beginDialog('askForDescription');
        },
        (session, results, next) => {
            session.dialogData.description = results.response.toString();
            session.beginDialog('askForPhone');
        },
        (session, results, next) => {
            session.dialogData.phone = results.response.toString();
            var data = {
                "caller_id": session.userData.name,
                "category": session.dialogData.category,
                "subcategory": session.dialogData.subcategory,
                "short_description": session.dialogData.shortDescription,
                "description": session.dialogData.description,
                "u_phone": session.dialogData.phone
            };

            

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
            snow.createSnowTicket(data,session, builder, onSuccess, onError);
        }   
        
    ]);
    
    bot.dialog('/askForCategory', [
        (session) => {
            builder.Prompts.text(session,"Pls enter an existing category.");
            
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);

    bot.dialog('askForSubCategory', [
        (session) => {
            builder.Prompts.text(session,"Okay! lets drill down...What is the subcategory?");
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ])
    .customAction({
        matches: /choice|option/gi,
        onSelectAction: (session, args, next) => {
            // Set reminder...
            session.send("Reminder is set.");
        }
    
    });


    bot.dialog('askForDescription',  [
        (session) => {
            builder.Prompts.text(session,"Write down the description.");
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);

    bot.dialog('askForShortDescription',  [
        (session) => {
            builder.Prompts.text(session,"We are almost there! please enter the subject or summary.");
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);

    bot.dialog('askForPhone', [
        (session) => {
            builder.Prompts.text(session,"Last thing! What is your contact number?");
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);
};

