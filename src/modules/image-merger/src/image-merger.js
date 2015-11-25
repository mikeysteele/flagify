/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Canvas = require('canvas');
var fs = require('fs');


function renderImage() {
}



function merger(mode) {
    this.mode = mode;
}

merger.prototype.merge = function (image1, image2, options, cb) {
    var mode = this.mode;
    console.log(options);
    fs.readFile(image1, function (err, file1) {
        if (err) {
            throw err;
        }
        fs.readFile(image2, function (err, file2) {
            if (err) {
                throw err;
            }
            var Image = Canvas.Image;
            var img = new Image;
            var img2 = new Image;
            var ratio = 1;
            

            var canvas = new Canvas(options.width, options.height);
            var canvas2 = new Canvas(200, (200 * ratio));
            var ctx = canvas.getContext('2d');
            var ctx2 = canvas2.getContext('2d');
            ctx2.globalCompositeOperation = mode;
            ctx.globalCompositeOperation = mode;
            img.onload = function () {
                ctx.drawImage(img, options.left, options.top, options.width, options.height, 0, 0, options.width, options.height);
                ctx2.drawImage(img, options.left, options.top, options.width, options.height, 0, 0, 200, (200 * ratio));
                img2.src = file2;
            }
            img2.onload = function () {
                ctx.drawImage(img2, 0, 0, options.width, options.height);

                ctx2.drawImage(img2, 0, 0, 200, (200 * ratio));
                cb(canvas, canvas2);
            }
            img.src = file1;


        });
    });

}

// Functions which will be available to external callers
module.exports = merger;
