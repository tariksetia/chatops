var builder = require('botbuilder');

module.exports = {
    incidentInfoCard : (session, incident)=>{
        var card = getIncidnetInfoCard(incident);
        return new builder.Message(session).addAttachment(card);
    }
};

var getIncidnetInfoCard = (incident) => {
    var incidentInfoJson = {
        'contentType': 'application/vnd.microsoft.card.adaptive',
        'content':{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": incident.number,
                            "weight": "bolder",
                            "size": "medium"
                        },
                        {
                            "type": "ColumnSet",
                            "columns": [
                                
                                {
                                    "type": "Column",
                                    "width": "stretch",
                                    "items": [
                                        {
                                            "type": "TextBlock",
                                            "spacing": "none",
                                            "text": incident.sys_created_on,
                                            "isSubtle": true,
                                            "wrap": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "Container",
                    "items": [
                        {
                            "type": "TextBlock",
                            "text": incident.description,
                            "wrap": true
                        },
                        {
                            "type": "FactSet",
                            "facts": [
                                {
                                    "title": "Urgency:",
                                    "value": incident.urgency
                                },
                                {
                                    "title": "Priority",
                                    "value": priority[incident.priority]
                                },
                                {
                                    "title": "Assigned to:",
                                    "value": getAssignee(incident.assigned_to)
                                }
                            ]
                        }
                    ]
                }
            ],
            "actions": [
                
                {
                    "type": "Action.OpenUrl",
                    "title": "View",
                    "url": getUrl(incident.sys_id)
                }
            ]
        }
    };
    //console.log(JSON.stringify(incidentInfoJson));
    return incidentInfoJson;
}



// Helper Function
var getStatus = (state) => {
    if (state == ''){
        return 'Not Available';
    }else{
        return state;
    }
};

var getAssignee = (assignee) => {
    
    return assignee == '' ? 'Unassigned':assignee; 

}
var getUrl = (sys_id) => {
    return "https://dev10994.service-now.com/nav_to.do?uri=%2Fincident.do%3Fsys_id%" + sys_id;
};

var states = {
    '1' :  'New',
    '2' : 'Assigned',
    '12' : 'Referred',
    '4' : 'Awaiting User Info',
    '5' : 'Awaiting Evidence',
    '10' : 'Awaiting Change',
    '8' : 'Awaiting Vendor',
    '11' : 'Awaiting Vendor Change',
    '6' : 'Resolved',
    '7' : 'Closed'
}

var priority = {
    '1' : 'Critical',
    '2' : 'High',
    '3' : 'Moderate',
    '4' : 'Low',
    '5' : 'Planning'
}