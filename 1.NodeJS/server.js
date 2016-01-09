(function () {
    'use strict';

    var http = require('http'),
        formidable = require('formidable'),
        fs = require('fs-extra'),
        jade = require('jade'),
        url = require('url'),
        uuid = require('node-uuid'),
        port = 8080;

    http.createServer(function (req, res) {
            var splitUrl = req.url.split('/');

            if (req.url === '/') {
                fs.readFile(__dirname + "/views/home.html", function (error, response) {
                    if (error) {
                        res.writeHead(404);
                        res.write('Page not found!');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(response);
                    }

                    res.end();
                });
            }

            if (req.url === '/download') {
                fs.readFile(__dirname + '/views/downloads.jade', function (err, jadeTemplate) {
                    if (err) {
                        res.end(err);
                        return;
                    }
                    fs.readdir(__dirname + '/files/', function (error, files) {
                        if (error) {
                            res.end(error);
                            return;
                        }

                        files.sort(function (a, b) {
                            return fs.statSync(__dirname + '/files/' + b).mtime.getTime() -
                                fs.statSync(__dirname + '/files/' + a).mtime.getTime();
                        });

                        var output = jade.compile(jadeTemplate)({
                            files: files
                        });

                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(output);
                        res.end();
                    })
                });
            }

            if (req.url === '/upload' && req.method.toLowerCase() === 'get') {
                fs.readFile(__dirname + "/views/uploads.html", function (error, response) {
                    if (error) {
                        res.writeHead(404);
                        res.write('Page not found!');
                    } else {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(response);
                    }

                    res.end();
                });
            }

            if (req.url === '/upload' && req.method.toLowerCase() === 'post') {
                var form = new formidable.IncomingForm();

                form.parse(req, function (err, fields, files) {
                    if (err) {
                        res.write('Unsuccessful upload!');
                    }
                    res.writeHead(200, {'content-type': 'text/html'});
                    res.write('<h4>Upload finished successfully!</h4>');
                    res.write('<div>Go to <a href="/download">Downloads</a></div><br>');
                    res.end();
                });

                form.on('end', function (fields, files) {
                    var tempPath = this.openedFiles[0].path,
                        fileExtension = this.openedFiles[0].name.substring(this.openedFiles[0].name.lastIndexOf('.')),
                        guid = uuid.v1(),
                        newFileName = __dirname + '/files/' + guid + fileExtension;

                    console.log(fileExtension);
                    fs.copy(tempPath, newFileName, function (err) {
                        if (err) {
                            throw err;
                        }
                    });
                });
            }

            if ((splitUrl[1] === 'files') && (splitUrl.length === 3)) {
                fs.readdir(__dirname + '/files/', function (error, files) {
                    if (error) {
                        res.end(error);
                    }
                });

                var filename = req.url.substring(req.url.lastIndexOf('/') + 1),
                    filestream = fs.createReadStream(__dirname + '/files/' + filename);

                res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                res.setHeader('Content-type', 'text/html');

                filestream.pipe(res);
            }
        }
    ).listen(port);

    console.log('Server Started.. on port ' + port);
}());