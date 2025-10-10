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
				<iframe height="480" width="640" src='https://www.youtube.com/embed/P3ynj6w2tII'>
				</iframe>
			</div>
		</div>
	)
}

export default CameraFeed;