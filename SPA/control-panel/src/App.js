import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Button from '@mui/material/Button';

import CameraFeed from './Components/CameraFeed.js';
import OutputTable from './Components/OutputTable.js';
import ControlButtons from './Components/ControlButtons.js';

const DISTANCE = 20; // Distance between camera points [cm]
const DEG_TO_RAD = Math.PI / 180;

function App() {
	const [leftAngle, setLeftAngle] = useState(90.0);
	const [rightAngle, setRightAngle] = useState(90.0);
	const [moveRight, setMoveRight] = useState(false);
	const [distanceSin, setDistanceSin] = useState(0.0);
	const [distanceCos, setDistanceCos] = useState(0.0);
	
	function CalcDistance() {
		const thirdAngle = 180.0 - leftAngle - rightAngle;
		if (thirdAngle <= 0.0) { return; }
		let factor = DISTANCE / Math.sin(thirdAngle * DEG_TO_RAD);
		const leftSide = factor * Math.sin(rightAngle * DEG_TO_RAD);
		// Law of Sines
		factor = DISTANCE / 2.0 / Math.sin(thirdAngle / 2.0 * DEG_TO_RAD);
		setDistanceSin(factor * Math.sin(leftAngle * DEG_TO_RAD));
		// Law of Cosines
		let output = Math.pow(leftSide, 2) + Math.pow(DISTANCE / 2, 2);
		output = output - (leftSide * DISTANCE * Math.cos(leftAngle * DEG_TO_RAD));
		setDistanceCos(Math.sqrt(output));
	}
	
	return (
	<div className="App">
		<div className="App-body App-head">
			Control Panel <br />
			Distance Triangulation
		</div>
		<div className="App-body">
			<CameraFeed isRight={moveRight} />
			<ControlButtons isRight={moveRight} updateCam={setMoveRight}
				leftAngle={leftAngle} updateLeft={setLeftAngle}
				rightAngle={rightAngle} updateRight={setRightAngle} calcFunc={CalcDistance}/>
			<OutputTable leftAngle={leftAngle} rightAngle={rightAngle} sin={distanceSin} cos={distanceCos}/>
		</div>
	</div>
	);
}

export default App;
