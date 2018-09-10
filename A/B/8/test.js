var dbr = require("./build/Release/dbr");
var readline = require('readline');
var fs = require('fs');
var path = require('path');
var templateFile = path.join(process.cwd(), 'templates', 'default.settings.json');

var barcodeTypes = 0x3FF | 0x2000000 | 0x8000000 |
                   0x4000000;  // 1D, QRCODE, PDF417, DataMatrix

function decodeFileAsync(fileName) {
  dbr.decodeFileAsync(fileName, barcodeTypes, function(err, msg) {
    let result = null;
    for (index in msg) {
      result = msg[index];
      console.log("Format: " + result['format']);
      console.log("Value : " + result['value']);
      console.log("##################");
    }
  }, "CUSTOM");
}

function decodeFileStreamAsync(fileName) {
  let stats = fs.statSync(fileName);
  let fileSize = stats["size"];

  fs.open(fileName, 'r', function(status, fd) {
    if (status) {
      console.log(status.message);
      return;
    }
    let buffer = new Buffer(fileSize);
    fs.read(fd, buffer, 0, fileSize, 0, function(err, bytesRead, data) {
      dbr.decodeFileStreamAsync(buffer, fileSize, barcodeTypes, function(err, msg) {
        console.log(fileName);
        let result = null;
        for (index in msg) {
          result = msg[index];
          console.log("Format: " + result['format']);
          console.log("Value : " + result['value']);
        }
        console.log("Done............................................................\n");
      }, "CUSTOM");
    });
  });
}

function decodeYUYVAsync(fileName, width, height) {
  let stats = fs.statSync(fileName);
  let fileSize = stats["size"];

  fs.open(fileName, 'r', function(status, fd) {
    if (status) {
      console.log(status.message);
      return;
    }
    let buffer = new Buffer(fileSize);
    fs.read(fd, buffer, 0, fileSize, 0, function(err, bytesRead, data) {
      dbr.decodeYUYVAsync(buffer, width, height, barcodeTypes, function(err, msg) {
        let result = null;
        for (index in msg) {
          result = msg[index];
          console.log("Format: " + result['format']);
          console.log("Value : " + result['value']);
          console.log("##################");
        }
      }, "CUSTOM");
    });
  });
}

// Initialize DBR license.
// Please contact support@dynamsoft.com to get a valid trial or full license.
dbr.initLicense(
    "t0068NQAAAEs+ghaNBs8etatL8cXvHiEmiu6vsWvJaDrgNCRLFRTWSYiJBx2WykfpBiExBgwGYx2iuk2721Rzo2GQhXAYr8Y=");
dbr.loadTemplates(templateFile);

// https://stackoverflow.com/questions/2727167/how-do-you-get-a-list-of-the-names-of-all-files-present-in-a-directory-in-node-j
function getFiles(dir, files_) {
  files_ = files_ || [];
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let name = dir + '/' + files[i];
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_);
    } else {
      files_.push(name);
    }
  }
  return files_;
}

let args = process.argv;
/**
 * Read a file: node test.js -f xxx.jpg
 * Read a folder: node test.js -d /mnt/folder
 */
if (args[2] === '-f') {
  // Read a file
  decodeFileStreamAsync(args[3]);
} else if (args[2] === '-d') {
  // Read a folder
  let files = getFiles(args[3]);
  files.forEach(file => {
    if (file.endsWith('.jpg')) {
      decodeFileStreamAsync(file);
    }
  });
} else {
  let rl =
      readline.createInterface({input: process.stdin, output: process.stdout});

  rl.question("Please input a barcode image path: ", function(answer) {
    decodeFileStreamAsync(answer);
    // decodeFileAsync(answer);
    // decodeYUYVAsync(answer, 640, 480);
    rl.close();
  });
}
