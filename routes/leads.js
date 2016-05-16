var express = require('express');
var request = require('request');
var axios = require('axios');
var router = express.Router();


/!* GET home page. *!/
router.get('/', function (req, res) {
    res.render('leads', {title: 'ProsperWork'});
});

// leads
router.get('/leadlist', function (req, res) {

    var config = {
        baseURL: 'https://api.prosperworks.com/developer_api/v1',
        headers: {
            'X-PW-AccessToken': '5267976195bbba9d0e0e14189b99870f',
            'X-PW-Application': 'developer_api',
            'X-PW-UserEmail': 'prosperwork01@gmail.com',
            'Content-Type':'application/json'
        }
    };

    axios.post('/leads/search', null, config)
        .then(function(response){
            res.send(response.data);
        });

});

router.post('/addlead', function(req, res) {
    console.log("START ---- Body send by ajax call to server");
    console.log(req.body);
    console.log("END ---- Body send by ajax call to server");

    var config = {
        baseURL: 'https://api.prosperworks.com/developer_api/v1',
        headers: {
            'X-PW-AccessToken': '5267976195bbba9d0e0e14189b99870f',
            'X-PW-Application': 'developer_api',
            'X-PW-UserEmail': 'prosperwork01@gmail.com',
            'Content-Type':'application/json'
        }
    };

    axios.post('/leads', req.body, config)
        .then(function(response){
            console.log("START ---- Response Body from ProsperWork API");
            console.log(response.data);
            console.log(response.status);
            console.log(response.statusText);
            console.log(response.headers);
            console.log(response.config);
            console.log("END ---- Response Body from ProsperWork API");
            res.send(response.data);
        });

});


module.exports = router;