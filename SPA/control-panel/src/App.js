import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';


import CameraFeed from './Components/CameraFeed.js';
import OutputTable from './Components/OutputTable.js';
import ControlButtons from './Components/ControlButtons.js';
import ControlSlider from './Components/ControlSlider.js';

const DEG_TO_RAD = Math.PI / 180;
const USER_DISTANCE = 40; // cm

function App() {
	const [leftAngle, setLeftAngle] = useState(90.0);
	const [rightAngle, setRightAngle] = useState(90.0);
	const [moveRight, setMoveRight] = useState(false);
	const [distanceSin, setDistanceSin] = useState(0.0);
	const [distanceCos, setDistanceCos] = useState(0.0);
	const [hostKey, setHostKey] = useState(0);
	const [userDistance, setUserDistance] = useState(50);
	
	function CalcDistance() {
		const thirdAngle = 180.0 - leftAngle - rightAngle;
		if (thirdAngle <= 0.0) { return; }
		let factor = USER_DISTANCE / Math.sin(thirdAngle * DEG_TO_RAD);
		const leftSide = factor * Math.sin(rightAngle * DEG_TO_RAD);
		const userDist = USER_DISTANCE * userDistance / 100;
		console.log(userDist);
		// Law of Sines 
		factor = userDist / Math.sin(thirdAngle * userDistance / 100 * DEG_TO_RAD);
		setDistanceSin(factor * Math.sin(leftAngle * DEG_TO_RAD));
		// Law of Cosines
		let output = Math.pow(leftSide, 2) + Math.pow(userDist, 2);
		output = output - (2 * leftSide * userDist * Math.cos(leftAngle * DEG_TO_RAD));
		setDistanceCos(Math.sqrt(output));
	}
	
	const freeHostKey = async () => {
		if (hostKey >= 2137) {
			const requestOpt = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: hostKey
			};
			const response = await fetch("/api/host/free", requestOpt);
			if (response.ok){
				const data = await response.text();
				console.log(data);
				setHostKey(Number(data));
				console.log(hostKey);
			}
		}
	};
	
	useEffect(() => {
		const resetServo = async (key) => {
			if (hostKey < 2137) {
				const requestOpt = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: key
				};
				const response = await fetch("/api/servo/reset", requestOpt);
				if (response.ok){
					const data = await response.text();
					console.log(data);
				}
			}
		}
		
		const getHostKey = async () => {
			if (hostKey < 2137) {
				const requestOpt = {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' }
				};
				const response = await fetch("/api/host/obtain", requestOpt);
				if (response.ok){
					const data = await response.text();
					console.log(data);
					setHostKey(Number(data));
					console.log(hostKey);
					await resetServo(Number(data));
				}
			}
		}


		const checkConnection = async () => {
			const response = await fetch("/api/");
			if (response.ok){
				const data = await response.text();
				console.log(data);
			}
		}
		// checkConnection();
		getHostKey();

		window.addEventListener('beforeunload', (event) => {
			event.preventDefault();
		
			freeHostKey();
		
			event.returnValue = 'If you had taken HOST KEY, it will be dropped.';
		});
	});
	
	function NoHostKey() {
		console.log(hostKey);
		if (hostKey < 2137) {
			return (<div>
				<h3 className="NoHostLabel"> Host taken, refresh site after last host disconnects </h3>
			</div>);
		}
		return null;
			
	}
	
	return (
	<div className="App">
		<div className="App-body App-head">
			Control Panel <br />
			Distance Triangulation
		</div>
		<div className="App-body">
			<NoHostKey />
			<CameraFeed isRight={moveRight} />
			<ControlButtons keyHost={hostKey} isRight={moveRight} updateCam={setMoveRight}
				leftAngle={leftAngle} updateLeft={setLeftAngle}
				rightAngle={rightAngle} updateRight={setRightAngle} calcFunc={CalcDistance}/>
			<ControlSlider disabled={hostKey < 2137} distance={USER_DISTANCE} userPosition={userDistance} setUserPosition={setUserDistance} />
			<OutputTable leftAngle={leftAngle} rightAngle={rightAngle} sin={distanceSin} cos={distanceCos}/>
		</div>
	</div>
	);
}

export default App;
