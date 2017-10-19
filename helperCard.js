var builder = require('botbuilder');

module.exports = {
    incidentInfoCard : (session, incident)=>{
        var card = getIncidnetInfoCard(incident);
        return new builder.Message(session).addAttachment(card);
    },

    incidentStatusCard : (session, incident) => {
        var card = getIncidentStatusCard(incident);
        return new builder.Message(session).addAttachment(card)
    },

    incidentHeroCard : (session, incident) => {
        return new builder.HeroCard(session)
        .title(incident.number)
        .subtitle(incident.description)
        .text('Created: ' + incident.sys_created_on + '\nStatus:    '+states[incident.state]  )
        .buttons([
            builder.CardAction.openUrl(session, getUrl(incident.sys_id), 'Get Started')
        ]);
    },

    dropDownCard: (session, id ,text, choices) => {
        var card = getDropDownCard(id, text, choices);
        return new builder.Message(session).addAttachment(card);

    },

    cardList : (session,heroCards) => {
        return new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(heroCards);
    }
};


//Helper Card Function

// This funciton returns Adaptive Card, Containing infomartion about the the INX
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

var getIncidentStatusCard = (incident) => {
    return {
            "contentType" : "application/vnd.microsoft.card.adaptive",
            "content" : {
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "type": "AdaptiveCard",
                "version": "1.0",
                "body": [
                    {
                        "type": "ColumnSet",
                        "columns": [
                            {
                                "type": "Column",
                                "width": "stretch",
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": incident.number,
                                        "horizontalAlignment": "left",
                                        "isSubtle": true
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": states[incident.state],
                                        "horizontalAlignment": "left",
                                        "spacing": "none",
                                        "color" : 'accent',
                                        "size": "large",
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "type": "Container",
                        "separator":"true",
                        "items": [
                            {
                                "type": "TextBlock",
                                "text": incident.short_description,
                                "wrap": true
                            }
                        ]
                    },
                    {
                        "type": "ColumnSet",
                        "spacing": "medium",
                        "separator": true,
                        "columns": [
                            {
                                "type": "Column",
                                "width": 1,
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": "Priority",
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "Assigned To",
                                        "spacing": "small"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "Created",
                                        "spacing": "small"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": "Last Updated",
                                        "spacing": "small"
                                    }
                                ]
                            },
                            {
                                "type": "Column",
                                "width": 1,
                                "items": [
                                    {
                                        "type": "TextBlock",
                                        "text": priority[incident.priority]
                                    
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": getAssignee(incident.assigned_to),
                                        "spacing": "small"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": incident.sys_created_on,
                                        "spacing": "small"
                                    },
                                    {
                                        "type": "TextBlock",
                                        "text": incident.sys_updated_on,
                                        "spacing": "small"
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
        }
}


var getDropDownCard = ( id, text, choices) => {

    //if = variable name you want to use
    //Text = Heading for the selection you want to make
    //Choice = array of {"title": "Red", "value": "1"},
 
    card =  { 
        'contentType': 'application/vnd.microsoft.card.adaptive',
        'content':{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
                {
                    "type": "TextBlock",
                    "text": text
                },
                {
                    "type": "Input.ChoiceSet",
                    "id": "value",
                    "style": "compact",
                    "placeholder": "Pick a category",
                    "value": "1",
                    "choices": choices
                }
            ],
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Choose",
                    "data": {
                        "id": id
                      }
                }
            ]
        }
    }
    return card;

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