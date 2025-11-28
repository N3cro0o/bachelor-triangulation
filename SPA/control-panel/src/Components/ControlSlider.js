import * as React from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';

const ERROR = 10;

function ControlSlider ({disabled, distance, userPosition, setUserPosition}) {
	
	const handleChange = (event: Event, newValue: number) => {
		setUserPosition(newValue);
	};
	
	function calcDistance(pos, fract) {
		const p = pos * fract / 100;
		return Math.round((p - (pos / 2)) * ERROR) / ERROR;
	}
	
	return (
		<div className="ButtonPanel Wide">
			<div className="SliderValue" id="ControlSliderValue">
				{calcDistance(distance, userPosition)}cm
			</div>
			<Slider aria-label="Position" 
				value={userPosition} 
				onChange={handleChange} 
				valueLabelDisplay="auto"
				disabled = {disabled}
				/>
		</div>
	);
}

export default ControlSlider;