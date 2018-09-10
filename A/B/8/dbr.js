var dbr = require('./build/Release/dbr');
var readline = require('readline');
var fs = require('fs');
var barcodeTypes = 0x3FF | 0x2000000 | 0x8000000 | 0x4000000; // 1D, QRCODE, PDF417, DataMatrix

function decodeFileAsync(fileName) {
    dbr.decodeFileAsync(
        fileName, barcodeTypes,
        function(msg) {
            var result = null;
            for (index in msg) {
                result = msg[index]
                console.log("Format: " + result['format']);
                console.log("Value : " + result['value']);
                console.log("##################");
            }
        }
    );
}

function decodeFileStreamAsync(fileName) {
    var stats = fs.statSync(fileName);
    var fileSize = stats["size"];

    fs.open(fileName, 'r', function(status, fd) {
        if (status) {
            console.log(status.message);
            return;
        }
        var buffer = new Buffer(fileSize);
        fs.read(fd, buffer, 0, fileSize, 0, function(err, bytesRead, data) {
            dbr.decodeFileStreamAsync(buffer, fileSize, barcodeTypes,
                function(msg) {
                    var result = null;
                    for (index in msg) {
                        result = msg[index]
                        console.log("Format: " + result['format']);
                        console.log("Value : " + result['value']);
                        console.log("##################");
                    }
                });
        });
    });
}

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Please input a barcode image path: ", function(answer) {
    decodeFileStreamAsync(answer);
    decodeFileAsync(answer);
    rl.close();
});