"use strict";

const express = require('express');
const gpiox = require('@iiot2k/gpiox');

const app = express();
const port = 9900;

const PIN_OUTPUT = 20;

const FREQUENCY = 50; // Hz
const DEG_0 = 5; // %
const DEG_90 = 7.5; // %
const DEG_180 = 10; // %

gpiox.init_gpio(PIN_OUTPUT, gpiox.GPIO_MODE_OUTPUT, 0);

app.get('/', (req, res) => {
	res.send('Hullo!');
});

app.get('/servo/:which/set-angle/:angle/', (req, res) => {
	res.send(req.params);
});

app.get('/servo/reset', (req, res) => {
	res.send('Servos reset');
	gpiox.pwm_gpio(PIN_OUTPUT, FREQUENCY, DEG_90);
});

app.get('/servo/:which/set-angle/:angle/', (req, res) => {
	res.send(req.params);
});

app.get('/servo/:which/set-angle/:angle/', (req, res) => {
	res.send(req.params);
});

// Start the server
app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});