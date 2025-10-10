import {useState, useEffect} from 'react';

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
				<div>
					<iframe height="480" width="640" src="http://192.168.137.88:8889/cam0/">
					</iframe>
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
				<div>
					<iframe height="480" width="640" src="http://192.168.137.88:8889/cam1/">
					</iframe>
				</div>
			</div>
		)
	}
}

export default CameraFeed;