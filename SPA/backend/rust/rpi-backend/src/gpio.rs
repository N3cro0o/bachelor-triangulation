use rppal::gpio::Gpio;
use rppal::pwm::*;

use std::time;
use std::sync::Mutex;

pub static SERVO0_VALUE: Mutex<u64> = Mutex::new(PULSE_90);
pub static SERVO1_VALUE: Mutex<u64> = Mutex::new(PULSE_90);

pub const CHIP_SERVO_0: u8 = 0;
pub const CHIP_SERVO_1: u8 = 1;
pub const PERIOD_MS: u64 = 20; // ms
pub const PULSE_0: u64 = 500; // μs
pub const PULSE_90: u64 = 1450; // μs
pub const PULSE_180: u64 = 2400; // μs

pub fn test(){
	println!("Test");
}

pub fn servo_thread() {
	let mut servo_pwm = Pwm::with_pwmchip(CHIP_SERVO_0, 0).unwrap();
    servo_pwm.set_period(time::Duration::from_millis(PERIOD_MS));
    servo_pwm.set_pulse_width(time::Duration::from_micros(PULSE_90));
    servo_pwm.set_polarity(Polarity::Normal);
    servo_pwm.enable();
    let mut pulse = PULSE_90;
	loop {
        {
		    let data = SERVO0_VALUE.lock().unwrap();
		    if pulse != *data {
			    pulse = *data;
			    println!("New pulse: {pulse}");
                servo_pwm.set_pulse_width(time::Duration::from_micros(pulse));
		    }
        }
	}
}
