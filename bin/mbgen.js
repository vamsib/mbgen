#!/usr/bin/env node
process.argv.push("--dest=.");
const args = process.argv.slice(2);
const {Plop, run} = require('plop');
const argv = require('minimist')(args);
const path = require('path');


Plop.launch({
	cwd: argv.cwd,
	configPath: path.join(__dirname, '..', 'plopfile.js'),
	require: argv.require,
	completion: argv.completion
}, run);
