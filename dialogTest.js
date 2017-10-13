var builder = require('botbuilder');

var card = {"$schema":"http://adaptivecards.io/schemas/adaptive-card.json","type":"AdaptiveCard","version":"1.0","body":[{"type":"Container","items":[{"type":"TextBlock","text":"INC0010021","weight":"bolder","size":"medium"},{"type":"ColumnSet","columns":[{"type":"Column","width":"stretch","items":[{"type":"TextBlock","spacing":"none","text":"2017-10-13 18:11:06","isSubtle":true,"wrap":true}]}]}]},{"type":"Container","items":[{"type":"TextBlock","text":"","wrap":true},{"type":"FactSet","facts":[{"title":"Urgency:","value":"3"},{"title":"Status","value":"Not Available"},{"title":"Assigned to:","value":"Matt Hidinger"}]}]}],"actions":[{"type":"Action.OpenUrl","title":"View","url":"https://dev10994.service-now.com/nav_to.do?uri=%2Fincident.do%3Fsys_id%59c384690ff10300f71f4c6be1050ef8"}]};

module.exports = [
    (session,args) => {
        var msg = new builder.Message(session)
        .addAttachment(card);
    session.send(msg);
    }
    
];