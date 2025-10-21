use rppal::gpio::Gpio;

use std::time;
use std::sync::Mutex;

pub static SERVO0_VALUE: Mutex<u64> = Mutex::new(PULSE_90);
pub static SERVO1_VALUE: Mutex<u64> = Mutex::new(PULSE_90);

pub const SERVO_PORT_0: u8 = 14;
pub const SERVO_PORT_1: u8 = 15;
pub const PERIOD_MS: u64 = 20; // ms
pub const PULSE_0: u64 = 500; // μs
pub const PULSE_90: u64 = 1450; // μs
pub const PULSE_180: u64 = 2400; // μs

pub fn test(){
	println!("Test");
}

pub fn servo_thread() {
	let mut servo_pin = Gpio::new().unwrap().get(SERVO_PORT_0).unwrap().into_output();
	let mut pulse = PULSE_0;
	loop {
        {
		    let data = SERVO0_VALUE.lock().unwrap();
		    if pulse != *data {
			    pulse = *data;
			    println!("New pulse: {pulse}");
			    servo_pin.set_pwm(time::Duration::from_millis(PERIOD_MS), time::Duration::from_micros(pulse));
                std::thread::sleep(time::Duration::from_millis(300));
		    }
        }
	}
}
