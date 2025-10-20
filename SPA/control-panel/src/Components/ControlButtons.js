import './Extra.css';

import Button from '@mui/material/Button';

function ControlButtons({keyHost, isRight, updateCam, leftAngle, updateLeft, rightAngle, updateRight, calcFunc}) {
	return (
		<div>
			<div className="ButtonPanel">
				<Button variant="contained"
					onClick={() => {
						if (isRight) {
							updateRight(rightAngle - 1);
							fetch('http://localhost:8800/servo/right/set-angle/' + rightAngle, {
								method: 'POST', 
								body: keyHost
							})
								.then(result => result.text()
								.then(body => console.log(body)));
						}
						else {
							updateLeft(leftAngle + 1);
							fetch('http://localhost:8800/servo/left/set-angle/' + leftAngle, {
								method: 'POST', 
								body: keyHost
							})
								.then(result => result.text()
								.then(body => console.log(body)));
						}}}
				>
					Rotate left
				</Button>
				<Button variant="contained"
					onClick={() => {
						if (isRight) {
							updateRight(rightAngle + 1);
							fetch('http://localhost:8800/servo/right/set-angle/' + rightAngle, {
								method: 'POST', 
								body: keyHost
							})
								.then(result => result.text()
								.then(body => console.log(body)));
						}
						else {
							updateLeft(leftAngle - 1);
							fetch('http://localhost:8800/servo/left/set-angle/' + leftAngle, {
								method: 'POST', 
								body: keyHost
							})
								.then(result => result.text()
								.then(body => console.log(body)));
						}}}
				>
					Rotate right
				</Button>
			</div>
			<div className="ButtonPanel">
				<Button variant="contained"
					onClick={() => {
						updateCam(!isRight);
					}}
				>
					Next camera
				</Button>
				<Button variant="contained"
					onClick={() => {
						calcFunc();
					}}
				>
					Find distance
				</Button>
			</div>
		</div>
	)
}

export default ControlButtons;