var express = require('express');
var fs = require('fs');
var axios = require('axios');
var jsonMakeHTML = require('json-make-html');
var router = express.Router();

router.get('/', function (req, res) {

    var redirectUrl = "http://localhost:3000/linkedin/oauth-signin";
    //var redirectUrl = "https://peaceful-dawn-46188.herokuapp.com/linkedin/oauth-signin";
    var apiKey = "75cchuhnrv28oo";
    var apiSecret = "6v4653oYdgp5phb4";
    var scope = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];
    //var scope = ['r_basicprofile', 'r_fullprofile', 'r_emailaddress', 'r_network', 'r_contactinfo', 'rw_nus', 'rw_groups', 'w_messages'];

    var url = "https://www.linkedin.com/uas/oauth2/authorization?response_type=code&client_id="+apiKey+ "&state=DCEEFWF45453sdffef424&redirect_uri=" + encodeURIComponent(redirectUrl);
    if (scope && scope.length > 0) {
        url += '&scope=' + scope.join('%20');
    }

    res.redirect(url);


});

router.get('/oauth-signin', function (req, res) {

    var redirectUrl = "http://localhost:3000/linkedin/oauth-signin";
    //var redirectUrl = "https://peaceful-dawn-46188.herokuapp.com/linkedin/oauth-signin";
    var apiKey = "75cchuhnrv28oo";
    var apiSecret = "6v4653oYdgp5phb4";
    var authUrl = "https://www.linkedin.com/uas/oauth2/accessToken";
    var code = req.query.code;

    var sign = "grant_type=authorization_code&code=" + encodeURIComponent(code) + "&redirect_uri=" + encodeURIComponent(redirectUrl) + "&client_id=" + apiKey + "&client_secret=" + apiSecret;
    var config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    axios.post(authUrl + "?" + sign, req.body, config)
        .then(function(response){

            // console.log("***********");
            // console.log(response.data);

            var oauthObject = response.data;
            var linkedin_profile_url = "https://api.linkedin.com/v1/people/~:(id,first-name,email-address,last-name,headline,picture-url,industry,summary,specialties,positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),associations,interests,num-recommenders,date-of-birth,publications:(id,title,publisher:(name),authors:(id,name),date,url,summary),patents:(id,title,summary,number,status:(id,name),office:(name),inventors:(id,name),date,url),languages:(id,language:(name),proficiency:(level,name)),skills:(id,skill:(name)),certifications:(id,name,authority:(name),number,start-date,end-date),courses:(id,name,number),recommendations-received:(id,recommendation-type,recommendation-text,recommender),honors-awards,three-current-positions,three-past-positions,volunteer)?oauth2_access_token=" + oauthObject.access_token + "&format=json";

            console.log("******************************************************************");
            console.log("******************************************************************");
            console.log("                     ");
            console.log("linkedin_profile_url");
            console.log("                     ");
            console.log("******************************************************************");
            console.log("******************************************************************");
            console.log(linkedin_profile_url);

            return axios.get(linkedin_profile_url, config)
                .then(function(response_linkedin_profile){
                    console.log("******************************************************************");
                    console.log("******************************************************************");
                    console.log("                     ");
                    console.log("linkedin_profile_data");
                    console.log("                     ");
                    console.log("******************************************************************");
                    console.log("******************************************************************");
                    console.log(response_linkedin_profile.data);
                    return response_linkedin_profile;
                });

            //res.send(response.data);
            //return response_linkedin_profile.data;
        })
        .then(function(response2){

            // console.log("$$$$$$$$$$$$");
            // console.log(response2.data);
            var json = response2.data;
            var args = {
                separator : ': ',
                iterator : 1,
                wrapper : {
                    before : '',
                    class : 'jsonhtml',
                    elem : 'ul',
                    after : ''
                },
                child : {
                    before : '',
                    class : 'jsonhtml__singlechild',
                    elem : 'li',
                    titleClass : 'jsonhtml__parent',
                    titleElem : 'h3',
                    after : ''
                },
                css :{
                    title : 'margin: 9px 0 0;color:#BA584C;',
                    wrapperElem : '',
                    childElem : 'list-style-type:none;',
                    childElemNested : 'margin-left: 18px;'
                }

            };

            var html = jsonMakeHTML.make(json,args, function(html){});

            //res.send(response2.data);

            // res.writeHead(200,{"Content-Type" : "text/html"});
            // res.write(html);
            // res.end();

            res.render('linkedin', {
                title: 'LinkedIn Profile',
                name: json.firstName +', '+ json.lastName,
                headline: json.headline,
                industry: json.industry,
                pictureUrl: json.pictureUrl,
                aVarContainingHTML: html
            });
        });


});

module.exports = router;