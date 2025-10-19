use tide::Request;
use tide::prelude::*;

use std::time;
use std::sync::Mutex;

use rppal::pwm::{Channel, Polarity, Pwm, Result};
use rppal::gpio::Gpio;

const PORT: u32 = 8800;
const SERVO_PORT_0: u8 = 14;
const PERIOD_MS: u64 = 20; // ms
const PULSE_0: u64 = 500; // μs
const PULSE_90: u64 = 1450; // μs
const PULSE_180: u64 = 2400; // μs

static servo0_value: Mutex<u64> = Mutex::new(PULSE_90);

fn translate_angle(angle: isize) -> u64 {
	let one: f32 = (PULSE_180 - PULSE_0) as f32 / 180.0;
	if angle < 0 {
		println!("Angle smaller than 0");
		return PULSE_0;
	}
	if angle > 180{
		println!("Angle larger than 180");
		return PULSE_180;
	}
	return (angle as f32 * one) as u64 + PULSE_0;
}

fn servo_thread() {
	let mut servo_pin = Gpio::new().unwrap().get(SERVO_PORT_0).unwrap().into_output();
	let mut pulse = PULSE_0;
	loop {
        {
		    let data = servo0_value.lock().unwrap();
		    if pulse != *data {
			    pulse = *data;
			    println!("New pulse: {pulse}");
			    servo_pin.set_pwm(time::Duration::from_millis(PERIOD_MS), time::Duration::from_micros(pulse));
                std::thread::sleep(time::Duration::from_millis(10));
		    }
        }
	}
}

#[async_std::main]
async fn main() -> tide::Result<()> {
	let thread_handle = std::thread::spawn(servo_thread);	
	let mut app = tide::new();
	app.at("/").get(check_connection);
	app.at("/servo/:which/set-angle/:angle").get(move_servo);
	app.at("/servo/reset").get(reset_servo);
	println!("Listening on localhost:{PORT}");
	app.listen(format!("127.0.0.1:{PORT}")).await?;
	Ok(())
}

async fn check_connection (req: Request<()>) -> tide::Result {
	Ok(String::from("Connection check: works").into())
}

async fn move_servo (req: Request<()>) -> tide::Result {
	let angle_req: isize = req.param("angle")?.parse().unwrap_or_default();
	let servo_req: String = String::from(req.param("which")?);
	let angle = translate_angle(angle_req);
	
	let mut data = servo0_value.lock().unwrap();
	*data = angle;
	
	Ok(format!("Moved servo to angle: {angle}").into())
}

async fn reset_servo (req: Request<()>) -> tide::Result {
	println!("Reset both servo angles");
    let mut data = servo0_value.lock().unwrap();
    *data = PULSE_90;
	Ok(String::from("Operation done!").into())
}
