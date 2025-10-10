import './Extra.css';

import Button from '@mui/material/Button';

function ControlButtons({isRight, updateCam, leftAngle, updateLeft, rightAngle, updateRight, calcFunc}) {
	return (
		<div>
			<div className="ButtonPanel">
				<Button variant="contained"
					onClick={() => {
						if (isRight) {
							updateRight(rightAngle - 1);
						}
						else {
							updateLeft(leftAngle + 1);
						}}}
				>
					Rotate left
				</Button>
				<Button variant="contained"
					onClick={() => {
						if (isRight) {
							updateRight(rightAngle + 1);
						}
						else {
							updateLeft(leftAngle - 1);
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