/*
 * example generate pwm on gpio output 
 *
 * run:
 * > node pwm_gpio.js
 *
 */

"use strict";

const gpiox = require("../SPA/control-panel/node_modules/@iiot2k/gpiox/");

const PIN_OUTPUT = 14;

const FREQUENCY = 50; // Hz, 20 ms
const DUTY_CYCLE1 = 2.5; // %
const DUTY_CYCLE2 = 7.5; // %
const DUTY_CYCLE3 = 12.5; // %

console.log("*** pwm gpio node.js example ***");
console.log("stop program with Ctrl+C");

// init gpio
gpiox.init_gpio(PIN_OUTPUT, gpiox.GPIO_MODE_OUTPUT, 0);

// set pwm
gpiox.pwm_gpio(PIN_OUTPUT, FREQUENCY, DUTY_CYCLE1);
console.log("frequency", gpiox.get_pwm_frequency(PIN_OUTPUT), "duty cycle", gpiox.get_pwm_dutycycle(PIN_OUTPUT));

// after 5 sec change duty cycle
var id_tout = setTimeout(function() {
    gpiox.pwm_gpio(PIN_OUTPUT, FREQUENCY, DUTY_CYCLE2);
    console.log("frequency", gpiox.get_pwm_frequency(PIN_OUTPUT), "duty cycle", gpiox.get_pwm_dutycycle(PIN_OUTPUT));
}, 5000);

// after 5 sec change duty cycle and frequency
var id_tout = setTimeout(function() {
    gpiox.pwm_gpio(PIN_OUTPUT, FREQUENCY, DUTY_CYCLE3);
    console.log("frequency", gpiox.get_pwm_frequency(PIN_OUTPUT), "duty cycle", gpiox.get_pwm_dutycycle(PIN_OUTPUT));
}, 10000);

// prevent stop program
var id_intv = setInterval(function() {}, 100);

process.on('SIGINT', () => {
    clearTimeout(id_tout);
    clearInterval(id_intv);
    console.log(" -> program stopped");
    process.exit();
});
