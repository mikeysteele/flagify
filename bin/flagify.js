#!/usr/bin/env node

var debug = require('debug')('my-application');
var app = require('../src/application/app.js');



app.listen('3000');
