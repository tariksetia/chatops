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
            session.send('Okay! Let us proceed to create a ticket.');
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
                session.endDialog('Sorry! I failed to create an incident. The issue has been reported to my developers. Please try again!');
            }
            snow.createSnowTicket(data,session, builder, onSuccess, onError);
        }   
        
    ]);
    
    bot.dialog('/askForCategory', [
        (session) => {
            builder.Prompts.text(session,"Please enter an existing category.");
            
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);

    bot.dialog('askForSubCategory', [
        (session) => {
            builder.Prompts.text(session,"Please specify a sub-category.");
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
            builder.Prompts.text(session,"Could you please describe the issue for the ticket assignee?");
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);

    bot.dialog('askForShortDescription',  [
        (session) => {
            builder.Prompts.text(session,"We are almost there! Please enter the subject or a quick summary.");
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);

    bot.dialog('askForPhone', [
        (session) => {
            builder.Prompts.text(session,"Finally, what is your contact number?");
        },
        (session,results) => {
            session.endDialogWithResult(results);
        }
    ]);
};

