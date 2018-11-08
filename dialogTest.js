var builder = require('botbuilder');
var cards = require('./helperCard');
var luis  =require('./luis');
var card = {"$schema":"http://adaptivecards.io/schemas/adaptive-card.json","type":"AdaptiveCard","version":"1.0","body":[{"type":"Container","items":[{"type":"TextBlock","text":"INC0010021","weight":"bolder","size":"medium"},{"type":"ColumnSet","columns":[{"type":"Column","width":"stretch","items":[{"type":"TextBlock","spacing":"none","text":"2017-10-13 18:11:06","isSubtle":true,"wrap":true}]}]}]},{"type":"Container","items":[{"type":"TextBlock","text":"","wrap":true},{"type":"FactSet","facts":[{"title":"Urgency:","value":"3"},{"title":"Status","value":"Not Available"},{"title":"Assigned to:","value":"Matt Hidinger"}]}]}],"actions":[{"type":"Action.OpenUrl","title":"View","url":"https://dev10994.service-now.com/nav_to.do?uri=%2Fincident.do%3Fsys_id%59c384690ff10300f71f4c6be1050ef8"}]};



module.exports = (bot) => {
    bot.dialog('/test',[
        (session) => {
           session.beginDialog('dialog-search-base');
        }
    ]);
}


inc = {
    "parent": "",
    "made_sla": "true",
    "caused_by": "",
    "watch_list": "",
    "upon_reject": "cancel",
    "sys_updated_on": "2017-10-17 08:49:56",
    "child_incidents": "0",
    "hold_reason": "",
    "approval_history": "",
    "number": "INC0010059",
    "resolved_by": "",
    "sys_updated_by": "admin",
    "opened_by": {
        "link": "https://dev70683.service-now.com/api/now/v2/table/sys_user/6816f79cc0a8016401c5a33be04be441",
        "value": "6816f79cc0a8016401c5a33be04be441"
    },
    "user_input": "",
    "sys_created_on": "2017-10-17 08:49:56",
    "sys_domain": {
        "link": "https://dev70683.service-now.com/api/now/v2/table/sys_user_group/global",
        "value": "global"
    },
    "state": "1",
    "sys_created_by": "admin",
    "knowledge": "false",
    "order": "",
    "calendar_stc": "",
    "closed_at": "",
    "cmdb_ci": "",
    "delivery_plan": "",
    "impact": "3",
    "active": "true",
    "work_notes_list": "",
    "business_service": "",
    "priority": "5",
    "sys_domain_path": "/",
    "rfc": "",
    "time_worked": "",
    "expected_start": "",
    "opened_at": "2017-10-17 08:49:56",
    "business_duration": "",
    "group_list": "",
    "work_end": "",
    "caller_id": {
        "link": "https://dev70683.service-now.com/api/now/v2/table/sys_user/Hi",
        "value": "Hi"
    },
    "resolved_at": "",
    "approval_set": "",
    "subcategory": "",
    "work_notes": "",
    "short_description": "Summary",
    "close_code": "",
    "correlation_display": "",
    "delivery_task": "",
    "work_start": "",
    "assignment_group": "",
    "additional_assignee_list": "",
    "business_stc": "",
    "description": "Description",
    "calendar_duration": "",
    "close_notes": "",
    "notify": "1",
    "sys_class_name": "incident",
    "closed_by": "",
    "follow_up": "",
    "parent_incident": "",
    "sys_id": "90b96ae20f310300f71f4c6be1050e6b",
    "contact_type": "",
    "incident_state": "1",
    "urgency": "3",
    "problem_id": "",
    "company": "",
    "reassignment_count": "0",
    "activity_due": "",
    "assigned_to": "",
    "severity": "3",
    "comments": "",
    "approval": "not requested",
    "sla_due": "",
    "comments_and_work_notes": "",
    "due_date": "",
    "sys_mod_count": "0",
    "reopen_count": "0",
    "sys_tags": "",
    "escalation": "0",
    "upon_approval": "proceed",
    "correlation_id": "",
    "location": "",
    "category": "inquiry"
}
