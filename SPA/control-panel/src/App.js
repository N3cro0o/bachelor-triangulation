import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

import CameraFeed from './Components/CameraFeed.js';
import OutputTable from './Components/OutputTable.js';
import ControlButtons from './Components/ControlButtons.js';

function App() {
	const [leftAngle, setLeftAngle] = useState(90.0);
	const [rightAngle, setRightAngle] = useState(90.0);
	return (
	<div className="App">
		<div className="App-body App-head">
			Control Panel <br />
			Distance Triangulation
		</div>
		<div className="App-body">
			<CameraFeed />
			<ControlButtons />
			<OutputTable leftAngle={leftAngle} rightAngle={rightAngle} />
		</div>
	</div>
	);
}

export default App;
