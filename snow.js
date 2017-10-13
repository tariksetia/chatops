var request = require('request');

module.exports ={

    createSnowTicket:(data,session, builder, onSuccess, onError) => {
        var urlString = 'https://dev10994.service-now.com/api/now/v1/table/incident';
            var options = {
                url: urlString,
                method: 'POST',
                json: true,
                body: data,
                Accept: 'application/json',
                Type: 'application/json',
                auth: {
                    'user': 'admin',
                    'pass': 'Athos1234!@#$'
                }
            };

            function callback(error, response, body) {
                if (!error && response.statusCode === 201) {
                    onSuccess(session, body.result);
                    console.log(JSON.stringify(body.result));
                    
                }else {
                    onError(session);
                    console.log(response);
                }
            }

            request(options, callback);
    }

};