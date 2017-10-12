var request = require('request');

module.exports ={

    createSnowTicket:(data,session, builder, onSuccess, onError) => {
        var urlString = 'https://dev15505.service-now.com/api/now/v1/table/incident';
            var options = {
                url: urlString,
                method: 'POST',
                json: true,
                body: data,
                Accept: 'application/json',
                Type: 'application/json',
                auth: {
                    'user': 'admin',
                    'pass': 'F6N6bCdSKv3V'
                }
            };

            function callback(error, response, body) {
                if (!error && response.statusCode === 201) {
                    onSuccess(session, body.result.number);
                }else {
                    onError(session);
                }
            }

            request(options, callback);
    }

};