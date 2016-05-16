var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();

router.get('/', function (req, res) {
    console.log(global.appRoot);
    res.render('upload', {title: 'Recruitment'});
});

router.post('/', function(req, res) {

    console.log(global.appRoot);
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){

        console.log(file.path);
        file.path = global.appRoot + '/uploads/' + file.name;
        console.log(file.path);

    });

    form.on('file', function (name, file){

        console.log('Uploaded ' + encodeURIComponent(file.name));
        var urlView = "/upload/view?filename="+ encodeURIComponent(file.name);
        console.log(urlView);
        res.writeHead(200, {'content-type': 'text/html'});
        res.write('Received upload: <a href='+urlView+'>View PDF</a>');
        res.end();
    });

    // form.parse(req, function(err, fields, files) {
    //     fs.rename(files.upload.path, global.appRoot + '/upload/temp.pdf');
    //     console.log(files.upload.path);
    //
    //     fs.rename(files.upload.path, global.appRoot + '/upload/temp.pdf', function (err) {
    //         console.log(err);
    //         if (err) throw err;
    //         fs.stat('/tmp/world', function (err, stats) {
    //             if (err) throw err;
    //
    //             console.log('stats: ' + JSON.stringify(stats));
    //             res.writeHead(200, {'content-type': 'text/html'});
    //             res.write('Received upload: <a href="/view">View PDF</a>');
    //             res.end();
    //
    //         });
    //
    //     });
    // });

});

router.get('/view', function(req, res) {
    var filename = req.query.filename;
    fs.readFile(global.appRoot + '/uploads/'+ filename, function(err, file) {
        res.writeHead(200, {"Content-Type" : "application/pdf" });
        res.write(file, "binary");
        res.end();
    });
});

module.exports = router;