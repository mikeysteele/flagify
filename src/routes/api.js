var express = require('express');
var router = express.Router();
var gm = require('gm')
var multer = require('multer')
var upload = multer({dest: 'tmp/'})
var ImageMerger = require('../modules/image-merger/');
var redisClient = require('../application/services/redisClient.js');
var io = require('../application/services/socketio.js');
var fs = require('fs');
console.log(ImageMerger);
var imageMerger = new ImageMerger('overlay');
/* GET home page. */
router.get('/last-five-images', function (req, res) {
    redisClient.getClient().lrange('images', 0, -1, function (err, data) {
        res.json(data);
    })

});


/* POST to Add User Service */
router.post('/process', upload.single('userImage'), function (req, res, next) {

    var prefix = __dirname + '/../..';
    var options = {
        left: parseInt(req.body.cropX),
        top: parseInt(req.body.cropY),
        width: parseInt(req.body.sizeX),
        height: parseInt(req.body.sizeY)
    };
    imageMerger.merge(prefix + '/' + req.file.path, prefix + '/public/' + req.body.country, options, function (canvas, canvas2) {
        if (!req.xhr) {
            res.writeHead(200, {
                'Content-Type': 'image/jpeg',
                'Access-Control-Allow-Origin': '*',
                'Content-Disposition': 'attachment; filename=flagify.jpg'
            });

            var stream = canvas.jpegStream({
                bufsize: 4096 // output buffer size in bytes, default: 4096
                , quality: 75 // JPEG quality (0-100) default: 75
                , progressive: false // true for progressive compression, default: false
            });

            stream.pipe(res);
        }
        else {
            canvas.toDataURL(function (err, data) {
                res.json({data: data})
            })

        }
        canvas2.toDataURL(function (err, data) {
            redisClient.add(data);
            io.getClient().emit('new-image', data);
        });
        fs.unlink(prefix + '/' + req.file.path);

    });

});


module.exports = router;