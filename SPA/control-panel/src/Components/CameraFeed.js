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
	useEffect(() =>{
		setCamName(CameraName(isRight));
    })
	
	return (
		<div>
			<div>
				{CameraName(isRight)}
			</div>
			<div>
				sram
			</div>
		</div>
	)
}

export default CameraFeed;