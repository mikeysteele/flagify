#!/usr/bin/env node

import debug from 'debug';
import app from '../src/application/app.mjs';

debug('my-application');

app.listen('3000');
