var builder = require('botbuilder');
var snow = require('./snow')

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
    ],
    "Other" : [
      "Other"
    ]
  };

module.exports = (bot) => {
    
    bot.dialog('/createTicket', [
        
        (session) => {
            builder.Prompts.text(session,'Cool! Let us start creating ticket. Please enter a category');
        },
    
        (session,results,next) => {
            session.dialogData.category  = results.response.toString().toLowerCase();
            builder.Prompts.text(session,"Okay! lets drill down...What is the subcategory?");
        },
        (session, results, next) => {
            session.dialogData.subCategory = results.response.toString().toLowerCase();
            builder.Prompts.text(session,"We are almost there! please enter the subject or summary.");
        },
        (session, results, next) => {
            session.dialogData.shortDescription = results.response.toString();
            builder.Prompts.text(session,"Write down the description.");
        },
        (session, results, next) => {
            session.dialogData.description = results.response.toString();
            builder.Prompts.text(session,"Last thing! What is your contact number?");
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
            onSucess = (session,number)=>{
                session.endDialog(`Done! I Have created ${number}`);
            }
            onError = (session) => {
                session.endDialog('Failed to create Incidnet. Please try again');
            }
            snow.createSnowTicket(data,session,builder, onSucess, onError);

            
        }
        
    ]);
};

