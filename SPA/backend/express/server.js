"use strict";

const express = require('express');
const gpiox = require('@iiot2k/gpiox');

const app = express();
const port = 9900;

const PIN_OUTPUT = 14;

const FREQUENCY = 50; // Hz
const DEG_0 = 2.5; // %
const DEG_90 = 7.5; // %
const DEG_180 = 12.5; // %

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
	return angle * one + DEG_0;
}

app.get('/', (req, res) => {
	res.send('Hullo!');
});

app.get('/servo/:which/set-angle/:angle/', (req, res) => {
	var angle = transform_angle(req.params.angle);
	console.log(angle);
	gpiox.pwm_gpio(PIN_OUTPUT, FREQUENCY, angle);
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
