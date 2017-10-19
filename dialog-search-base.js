var builder = require('botbuilder');
var search = require('azure-search');
var luis = require('./luis');
var cards = require('./helperCard');

module.exports = (bot) => {
    bot.dialog('dialog-search-base',[
        (session,args,next) => {
            builder.Prompts.text(session, "Please describe the issue.");
        },
        (session,results,next) =>{
            session.dialogData.description = results.response;
            var client = search({
                url: "https://euckb.search.windows.net",
                key:"A49D2F82121D00DDEFED78490061DAEB"
            });
            
            client.search('kbase1', {search: results.response, top: 10}, function(err, results, raw){
                
                if (err) {
                    session.send("Something went worng while searching knowledgebase. :(");
                    next({kbresult:false});
                }
                if (raw.value.length == 0){
                    session.send("I couldn't find anything in the knowledge base");
                    next({kbresult:false});
                }else{
                    var kbCards = raw.value.map((doc)=>{
                        return new builder.HeroCard(session)
                        .title(doc.title)
                        .text(doc.description)
                        .buttons([
                            builder.CardAction.openUrl(session, 'https://wordforge3.ps.net/knowledgebase/manage/article/article_id/' + doc.id, 'View')
                        ]);
                    });
                    
                    var cardList = cards.cardList(session,kbCards);
                    session.send(cardList);
                    next({kbresult:true});
                }

            });

        },
        (session,args,next) => {
            if(!args.kbresult) {
                builder.Prompts.confirm(session,"Do you want me to create an Incident instead?");
            }else{
                builder.Prompts.confirm(session,"In case the articles are not helpful, Would you like me to raise an Incident?");
            }
        },
        (session,args) =>{
            if(args.response){
                session.beginDialog('dialog-create-incident',{description:session.dialogData.description});
            }
            session.endDialog();
        }
    ])
}


