var request = require('request');

module.exports ={

    createSnowTicket:(data,session, builder, onSuccess, onError) => {
        var urlString = 'https://dev56221.service-now.com/api/now/v1/table/incident';
            var options = {
                url: urlString,
                method: 'POST',
                json: true,
                body: data,
                Accept: 'application/json',
                Type: 'application/json',
                auth: {
                    'user': 'admin',
                    'pass': 'iM9EzJ3QSiwg'
                }
            };

            function callback(error, response, body) {
                if (!error && response.statusCode === 201) {
                    onSuccess(session, body.result);
                    //console.log(JSON.stringify(body.result));
                    
                }else {
                    onError(session);
                    //console.log(response);
                }
            }

            request(options, callback);
    },
    getSnowTicket : (session, number, onSucess, onError) => {
        var urlString = 'https://dev56221.service-now.com/api/now/v2/table/incident?sysparm_limit=1&number='+number;
        var options = {
            url: urlString,
            method: 'GET',
            json: true,
            Accept: 'application/json',
            Type: 'application/json',
            auth: {
                'user': 'admin',
                'pass': 'iM9EzJ3QSiwg'
            }
        };

        function callback(error, response, body) {
            if (!error && response.statusCode === 200 && body.result.length) {
                onSuccess(session, body.result[0]);
                //console.log(JSON.stringify(body.result));
                
            }else {
                onError(session);
                //console.log(response);
            }
        }

        request(options, callback);

    }

};
