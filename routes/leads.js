var express = require('express');
var request = require('request');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('leads', {title: 'ProsperWork'});
});
// leads
router.get('/leadlist', function (req, res) {

    request.post({
        headers: {
            'X-PW-AccessToken': '4d44d5af5ea61b5167b8e577a717f634',
            'X-PW-Application': 'developer_api',
            'X-PW-UserEmail': 'burhan.farooq.ws@gmail.com',
            'Content-Type':'application/json'
        },
        url:     'https://api.prosperworks.com/developer_api/v1/leads/search'
    }, function(error, response, body){
        //console.log(body);
        //res.json(body);
        res.send(body);
    });

});

router.post('/addlead', function(req, res) {
    console.log(req.body);
    request.post({
        json: true,
        headers: {
            'X-PW-AccessToken': '4d44d5af5ea61b5167b8e577a717f634',
            'X-PW-Application': 'developer_api',
            'X-PW-UserEmail': 'burhan.farooq.ws@gmail.com',
            'Content-Type':'application/json'
        },
        json: req.body,
        url:     'https://api.prosperworks.com/developer_api/v1/leads'
    }, function(error, response, body){
        console.log(body);
        //res.json(body);
        res.send(body);
    });

});


module.exports = router;