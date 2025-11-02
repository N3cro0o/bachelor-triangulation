import './Extra.css';

import Button from '@mui/material/Button';

function ControlButtons({keyHost, isRight, updateCam, leftAngle, updateLeft, rightAngle, updateRight, calcFunc}) {
	return (
		<div className="Wide">
			<div className="ButtonPanel Center">
				<Button variant="contained" className="ControlButton"
					onClick={(e) => {
						let value;
						if (e.shiftKey){
							value = 5
						}
						else if (e.ctrlKey){
							value = 20;
						}
						else {
							value = 1;
						}
						if (isRight) {
							if (rightAngle - value < 0){
								value = rightAngle;
							}
							updateRight(rightAngle - value);
							fetch('/api/servo/right/set-angle/' + (rightAngle - value), {
								method: 'POST', 
								body: keyHost
							})
								.then(result => result.text()
								.then(body => console.log(body)));
						}
						else {
							if (leftAngle + value > 180){
								value = 180 - leftAngle;
							}
							updateLeft(leftAngle + value);
							fetch('/api/servo/left/set-angle/' + (leftAngle + value), {
								method: 'POST', 
								body: keyHost
							})
								.then(result => result.text()
								.then(body => console.log(body)));
						}}}
				>
					Rotate left
				</Button>
				<Button variant="contained" className="ControlButton"
					onClick={() => {
						updateCam(!isRight);
					}}
				>
					Next camera
				</Button>
				<Button variant="contained" className="ControlButton"
					onClick={(e) => {
						let value;
						if (e.shiftKey){
							value = 5
						}
						else if (e.ctrlKey){
							value = 20;
						}
						else {
							value = 1;
						}
						if (isRight) {
							if (rightAngle + value > 180){
								value = 180 - rightAngle;
							}
							updateRight(rightAngle + value);
							fetch('/api/servo/right/set-angle/' + (rightAngle + value), {
								method: 'POST', 
								body: keyHost
							})
								.then(result => result.text()
								.then(body => console.log(body)));
						}
						else {
							if (leftAngle - value < 0){
								value = leftAngle;
							}
							updateLeft(leftAngle - value);
							fetch('/api/servo/left/set-angle/' + (leftAngle - value), {
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
			<div className="ButtonPanel Center">
				<Button variant="contained" className="ControlButton"
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
