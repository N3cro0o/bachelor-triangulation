import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import Button from '@mui/material/Button';

import CameraFeed from './Components/CameraFeed.js';
import OutputTable from './Components/OutputTable.js';
import ControlButtons from './Components/ControlButtons.js';

function App() {
	const [leftAngle, setLeftAngle] = useState(90.0);
	const [rightAngle, setRightAngle] = useState(90.0);
	const [moveRight, setMoveRight] = useState(false);
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
				rightAngle={rightAngle} updateRight={setRightAngle}/>
			<OutputTable leftAngle={leftAngle} rightAngle={rightAngle} />
		</div>
	</div>
	);
}

export default App;
