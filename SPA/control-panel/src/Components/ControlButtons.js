import './Extra.css';

import Button from '@mui/material/Button';

function ControlButtons({isRight, updateCam, leftAngle, updateLeft, rightAngle, updateRight}) {
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
			<div>
				<Button variant="contained"
					onClick={() => {
						updateCam(!isRight);
					}}
				>
					Next camera
				</Button>
			</div>
		</div>
	)
}

export default ControlButtons;