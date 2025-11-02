import cross from './cross.png';
import {useState, useEffect} from 'react';

import './Extra.css';

function CameraName(isRight) {
	if (isRight == true) {
		return 'Right Cam';
	} else {
		return 'Left Cam';
	}
}

function CameraFeed({isRight}) {
	const [camName, setCamName] = useState(CameraName(isRight));
	useEffect(() => {
		setCamName(CameraName(isRight));
    })
	
	if (isRight) {
		return (
			<div>
				<div>
					{CameraName(isRight)}
				</div>
				<div className="CamPanel">
					<iframe className="CamFrame CamRight" height="640" width="480" style={{zIndex:3}} src="http://192.168.137.88:8889/cam0/">
					</iframe>
					<img src={cross} className="CamCrosshair" />
				</div>
			</div>
		)
	}
	else {
		return (
			<div>
				<div>
					{CameraName(isRight)}
				</div>
				<div className="CamPanel">
					<iframe className="CamFrame CamLeft" height="640" width="480" style={{zIndex:3}} src="http://192.168.137.88:8889/cam1/">
					</iframe>
					<img src={cross} className="CamCrosshair" />
				</div>
			</div>
		)
	}
}

export default CameraFeed

// // // // <iframe height="480" width="640" src="http://192.168.137.88:8889/cam1/">
					// // // // </iframe>