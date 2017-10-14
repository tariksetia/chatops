var builder = require('botbuilder');
var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/061cfb89-c4af-471e-80bb-662d5d096d38?subscription-key=62ea92a6dad241628c1489c0333d166f&timezoneOffset=0&verbose=true&q=';

module.exports = {
    recognize : (text,onSuccess, onError) => {
         builder.LuisRecognizer.recognize(text, model,
            function (err, intents, entities) {
                if (err) {
                   onError();
                }else {

                    onSuccess({intents:intents,entities:entities});
                }
            });
    } 
};