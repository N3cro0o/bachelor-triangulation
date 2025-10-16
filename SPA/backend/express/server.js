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

function transform_angle(angle) {
	const one = (DEG_180 - DEG_0) / 180.0;
	if (angle < 0){
		console.log('Angle smaller than 0');
		return DEG_0;
	}
	if (angle > 180){
		console.log('Angle larger than 180');
		return DEG_180;
	}
	return angle * one;
}

app.get('/', (req, res) => {
	res.send('Hullo!');
});

app.get('/servo/:which/set-angle/:angle/', (req, res) => {
	console.log(req.params.angle);
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