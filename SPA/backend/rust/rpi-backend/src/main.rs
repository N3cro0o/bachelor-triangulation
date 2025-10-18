use tide::Request;
use tide::prelude::*;

use std::time;
use rppal::pwm::{Channel, Polarity, Pwm};

const PERIOD_MS: u64 = 20; // ms
const PULSE_0: u64 = 500; // μs
const PULSE_90: u64 = 1450; // μs
const PULSE_180: u64 = 2400; // μs

static mut servo0;

fn translate_angle(angle: isize) -> u64 {
	
}

#[async_std::main]
async fn main() -> tide::Result<()> {
	servo0 = Pwm::with_period(Channel::Pwm0, time::Duration::from_millis(PERIOD_MS),
			time::Duration::from_millis(PULSE_180), Polarity::Normal, true)?;
	
    let mut app = tide::new();
	app.at("/").get(check_connection);
	app.listen("127.0.0.1:8800").await?;
	Ok(())
}

async fn check_connection (mut req: Request<()>) -> tide::Result {
	Ok(String::from("Connection check: works").into())
}

async fn move_servo (mut req: Request<()>) -> tide::Result {
	let angle = 
	Ok(format!("Moved servo to angle: {angle}").into())
}
