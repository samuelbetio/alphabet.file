# Node.js Barcode Reader for Windows, Linux & Mac

The sample demonstrates how to use [Dynamsoft Barcode Reader SDK][1] and [Node.js][2] to create Web barcode reader on Windows, Linux and Mac.

## Node.js Version
[v5.5.0][0]

## Install node-gyp

```
npm install -g node-gyp
```

## Windows
Install [DBR for Windows][3], Visual Studio and Python v2.7.

## Linux
Install [DBR for Linux][4].

## Mac
Install [DBR for Mac][3] and [Xcode][6].

Probably you will get the following error when running **node-gyp configure**:

```
error: xcode-select: error: tool 'xcodebuild' requires Xcode, but active developer directory '/Library/Developer/CommandLineTools' is a command line tools instance
solution: 
```
Here is the solution from [StackOverflow][7]:

```
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
```

## Getting Started
1. Edit **binding.gyp**. Replace **< DBR Installation Directory >** with yours. 
2. Configure building environment:

    ```
    node-gyp configure
    ```
3. Build project:

    ```
    node-gyp build
    ```
4. Run server:
    
    ```
    node server.js
    ```
5. Visit **http://localhost:2016/index.htm**

    ![online barcode reader with nodejs](http://www.codepool.biz/wp-content/uploads/2016/01/node-online-barcode-reader.png)

## Reference
* [node-gyp][5]

## Blog
* [How to Build Node.js Barcode Reader on Windows, Linux and Mac][8]
* [Making Node.js Async Function with Libuv Thread Pool][9]

[0]:https://nodejs.org/en/download/stable/
[1]:http://www.dynamsoft.com/Products/Dynamic-Barcode-Reader.aspx
[2]:https://nodejs.org
[3]:http://www.dynamsoft.com/Downloads/Dynamic-Barcode-Reader-Download.aspx
[4]:https://www.dynamsoft.com/Downloads/DownloadLog.aspx?server=1&product=support/dbr-4.0.0-pre-alpha.tar.gz
[5]:https://github.com/nodejs/node-gyp
[6]:https://developer.apple.com/xcode/download/
[7]:http://stackoverflow.com/questions/19605862/unable-to-use-xcodebuild-on-mavericks-with-command-line-tools-installed
[8]:http://www.codepool.biz/nodejs-barcode-windows-linux-mac.html
[9]:http://www.codepool.biz/nodejs-async-addon-libuv-thread-pool.html