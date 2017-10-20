var builder = require('botbuilder');
var isThatCorrect = ['Yes', 'No'];
var buttonStyle = {listStyle: builder.ListStyle.button};
var snow = require('./snow')
var cards = require('./helperCard');

Locations = {
    "North America": [
     "Laptop","Desktop"
    ],
    "India": [
        "Laptop","Desktop"
       ]

}

MinReq = [
    "PC is damaged or has become unreliable or unusable; it is either not repairable (per End \
        User Computing team), out of warranty, or repair costs would exceed the cost of a \
        comparable replacement PC.",
    "Laptop/notebook PC is a minimum of 4 years old and out of warranty.",
    "Employee role or job function change requiring change in PC (desktop to laptop, client provided \
        PC to Company PC, for example).",
        "Employee work location change (such as office to remote or home office worker).",
        "NTT DATA client-specific requirements.",
        "Employee disability requirements, as determined by the Company. (Note: Employees \
            should contact his / her HR Business Partner to discuss any requests.)",
            "None of the above"
       ]
module.exports = (bot) => {
    bot.dialog('/PCReplacement',[
        (session) => {
            builder.Prompts.choice(session, 'I understand that you would like to get a replacement for your current Corporate PC. Is that correct?', isThatCorrect, buttonStyle, "Invalid Choice");
        },
        function (session, results) {
            if (results.response.entity.toString() === 'No') {
                session.endDialog('No problem. So, how may I help you?')
                session.send("I can create an incident for Applications, Hardware and Software, Read out the FAQ's or help you get a replacement for your Corporate PC.")
            } else {
                builder.Prompts.choice(session, "Do you have approval from your direct supervisor or hardline manager", "Yes|No",buttonStyle);
            }
        },
        function (session, results) {
            if (results.response.entity.toString() === 'No') {
                session.send('Sorry, we will not be able to proceed with your request.');
                session.send('Please initiate a conversation with your supervisor & get an approval first.');
                session.endDialog('Goodbye!');
            } else {
                builder.Prompts.choice(session, 'Where are you located?', Locations, buttonStyle)
            }
        },
        function (session, results) {
            session.dialogData.Location = results.response.entity.toString();
            session.send("You have selected " + session.dialogData.Location + " as your location");
            var choices = Locations[session.dialogData.Location];
            builder.Prompts.choice(session, 'Please specify what system do you want to change? ', choices, buttonStyle);
        },
        function (session, results) {
            session.dialogData.systemType = results.response.entity.toString();
            
            if (session.dialogData.systemType == "Laptop" && session.dialogData.keyword == "India") {
                
                builder.Prompts.choice(session,"In order to proceed, please select a reason for replacement", MinReq);
                // At the moment the policy is the same. If there are more changes it makes sense to bifurcate
                // here at the code
                return;
                
            } else if(session.dialogData.systemType == "Laptop" && session.dialogData.keyword == "India") {
                builder.Prompts.choice(session,"In order to proceed, please select a reason for replacement", MinReq);
                return;
            } else if(session.dialogData.systemType == "Desktop" && session.dialogData.keyword == "North America") {
                builder.Prompts.choice(session,"In order to proceed, please select a reason for replacement", MinReq);
                return;
            }else  
            builder.Prompts.choice(session,"In order to proceed, please select a reason for replacement", MinReq);
            return;
            
        },
        function(session, results){
            session.dialogData.MinReqReason = results.response.entity.toString();
            var minReqSatisifiedBool = session.dialogData.MinReqReason;
            if (minReqSatisifiedBool == "None of the above"){
                session.send("Sorry. You cannot apply for a new PC but you could still try to get a \"Loaner\" PC");
                session.send("Please have a discussion with your manager first and initiate the process.");
                session.endDialog("Goodbye!");
                
           } else{
               session.send("You are eligible to request a replacement for your PC! ");
           session.send("Here is the flow for the NTT Data Request Procedure, with steps: ");
           var msg = new builder.Message(session)
           .attachments([{
               contentType: "image/jpg",
               contentUrl: "https://raw.githubusercontent.com/mailforsachin/BOTsom/master/1.jpg"
           }]);
           session.send(msg);
           builder.Prompts.choice(session,"Do you want to open raise a IT Service request for replacement? ", "Yes|No", buttonStyle);
        }      
        },

        function(session, results){

            if (results.response.entity.toString() === 'No') {
                session.endDialog('No problem. Is there anything else I can assist you with?')
                session.send("I can create an incident for Applications, Hardware and Software, Read out the FAQ's or help you get a replacement for your Corporate PC.")
            } else {
                session.send(session, 'So I am now raising a request for replacement of PC with the following details.');

                builder.Prompts.choice(session, 'Reason for replacement: ' + '**' + session.dialogData.MinReqReason  +'**'+ '\n The location selected is: ' +'**' + session.dialogData.Location +'**'+ 
                '.\n The PC applied for is: \'' +'**'+   session.dialogData.systemType +'**'+  '.\n Am I correct?', isThatCorrect, buttonStyle);
                               
            }
        },

        function (session, results) {
            var confirmation = results.response.entity.toString();
            if (confirmation === 'No') {
                session.endDialog('No problem. We can start with the process again. Say \"Hello\" to restart the workflow');
            }
            else if (confirmation === 'Yes') 

            {
                var data = {
                    "caller_id": session.dialogData.Location,
                    "short_description": session.dialogData.systemType,
                    "description": session.dialogData.MinReqReason,
                    "u_phone": session.dialogData.phone
                };

            onSuccess = (session,incident)=>{
                console.log(JSON.stringify(session));
                var incidentCard;
                if (session.message.address.channelId == 'cortana'){
                    session.send("I have created: " + incident.number );
                    session.endDialog();
                }else{
                    var incidentCard = cards.incidentInfoCard(session,incident);
                    session.send(incidentCard);
                    session.send("Goodbye!");
                    session.endDialog();
                }
            
            }
            onError = (session) => {
                session.endDialog('Failed to create a Laptop replacement request. Please try again!');
            }
            snow.createSnowTicket(data,session, builder, onSuccess, onError);
        }   
    }
    ])
}