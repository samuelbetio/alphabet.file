#Usage
Your process will respond with status 200 and 'OK' body in order to be able to monitor it with automatic tools.

##1. Config:
By default it starts on port 7828 (STAT)
For other config add in your .env file STATUS_PORT=<port_number>


##2. Install

npm install ha-status

##3. Usage

###3.1 No http library

require('ha-status').load();

###3.2 Hapi or Express

require('ha-status').load(yourServerObject);

For some examples you can look in test/default.js