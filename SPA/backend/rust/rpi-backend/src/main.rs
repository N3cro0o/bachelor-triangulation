use rpi_backend::gpio::{SERVO0_VALUE, SERVO1_VALUE};
use rpi_backend::gpio::{PULSE_0, PULSE_180, PULSE_90, servo_thread};

use tide::{Request, Response, StatusCode};
use tide::security::{CorsMiddleware, Origin};
use http_types::headers::HeaderValue;

use rand::prelude::*;

use std::time;
use std::sync::Arc;
use std::sync::atomic::{AtomicBool, AtomicU64, Ordering};
use std::sync::Mutex;

const PORT: u32 = 8800;

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

#[derive(Clone)]
struct ServerState {
	host: Arc<AtomicBool>,
	key: Arc<AtomicU64>,
}

impl ServerState {
	pub fn default() -> Self {
		ServerState {
			host: Arc::new(AtomicBool::new(false)),
			key: Arc::new(AtomicU64::new(0)),
		}
	}
}

#[async_std::main]
async fn main() -> tide::Result<()> {
    let cors = CorsMiddleware::new()
        .allow_methods("GET, POST, PATCH".parse::<HeaderValue>().unwrap())
        .allow_origin(Origin::from("*"));
    
    dbg!(&cors);

	let thread_handle = std::thread::spawn(servo_thread);	
	let mut app = tide::with_state(ServerState::default());
    app.with(cors);
	app.at("/").get(check_connection);
	app.at("/servo/:which/set-angle/:angle").post(move_servo);
	app.at("/servo/reset").post(reset_servo);
	app.at("/host/check").get(host_check);
	app.at("/host/obtain").post(host_get);
	app.at("/host/free").patch(host_free);
	println!("Listening on localhost:{PORT}");
	app.listen(format!("127.0.0.1:{PORT}")).await?;
	Ok(())
}

async fn check_connection (req: Request<(ServerState)>) -> tide::Result {
	Ok(String::from("Connection check: works").into())
}

async fn move_servo (mut req: Request<(ServerState)>) -> tide::Result {
	let key_string = req.body_string().await?;
	let key: u64 = key_string.parse()?;
	if key == req.state().key.load(Ordering::SeqCst) {
		let angle_req: isize = req.param("angle")?.parse().unwrap_or_default();
		let servo_req: String = String::from(req.param("which")?);
		let angle = translate_angle(angle_req);
		let which_servo = req.param("which")?.to_lowercase();
		if which_servo == "left" {
			let mut data = SERVO0_VALUE.lock().unwrap();
			*data = angle;
		}
		else if which_servo == "right" {
			let mut data = SERVO1_VALUE.lock().unwrap();
			*data = angle;
		}
		else {
			let mut response = Response::new(418);
			response.set_body("Wrong WHICH servo parameter.");
			return (response)
		}
		
		return Ok(format!("Moved {which_servo} servo to angle: {angle}").into());
	}
	let mut response = Response::new(418);
	response.set_body("Wrong HOST KEY.");
	Ok(response)
}

async fn reset_servo (mut req: Request<(ServerState)>) -> tide::Result {
	let key_string = req.body_string().await?;
	let key: u64 = key_string.parse()?;
	if key == req.state().key.load(Ordering::SeqCst) {
		println!("Reset both servo angles");
		{
			let mut data = SERVO0_VALUE.lock().unwrap();
			*data = PULSE_90;
		}
		std::thread::sleep(time::Duration::from_millis(100));
		{
			let mut data = SERVO1_VALUE.lock().unwrap();
			*data = PULSE_90;
		}
		std::thread::sleep(time::Duration::from_millis(100));
		return Ok(String::from("Operation done!").into());
	}
	let mut response = Response::new(418);
	response.set_body("Wrong HOST KEY.");
	Ok(response)
}

async fn host_check(req: Request<(ServerState)>) -> tide::Result {
	let mut response = Response::new(202);
	if req.state().host.load(Ordering::SeqCst) {
		response.set_status(418);
		response.set_body("Host already exists.");
		return Ok(response);
	}
	response.set_body("Host slot is empty!");
	Ok(response)
}

async fn host_get(req: Request<(ServerState)>) -> tide::Result {
	let mut response = Response::new(202);
	if req.state().host.load(Ordering::SeqCst) {
		response.set_status(403);
		response.set_body("Host already exists.");
		return Ok(response);
	}
	let mut rng = rand::rng();
	req.state().host.store(true, Ordering::SeqCst);
	let key: u64 = rand::thread_rng().gen_range(2137..=69420);
	req.state().key.store(key, Ordering::SeqCst);
	println!("Key: {key}");
	response.set_body(format!("{key}"));
	Ok(response)
}

async fn host_free(mut req: Request<(ServerState)>) -> tide::Result {
	println!("Reset request");
	let mut response = Response::new(200);
	let key_string = req.body_string().await?;
	let key: u64 = key_string.parse()?;
	if key == req.state().key.load(Ordering::SeqCst) {
		req.state().host.store(false, Ordering::SeqCst);
		response.set_body("Host slot reset.");
		return Ok(response);
	}
	response.set_status(403);
	response.set_body("Wrong host key");
	Ok(response)
}
