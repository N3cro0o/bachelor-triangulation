import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import {useState, useEffect} from 'react';

function OutputTable({leftAngle, rightAngle, sin, cos}) {
	const [sineDist, setSineDist] = useState(21);
	const [cosineDist, setCosineDist] = useState(37);
	
	useEffect(() =>{
		setSineDist(leftAngle * 2.1);
		setCosineDist(rightAngle / 3);
    })
	
	return (
		<Table aria-label="output">
			<TableBody>
				<TableRow>
					<TableCell sx={{color:"#ffffff"}} align="Left"> Left Angle </TableCell>
					<TableCell sx={{color:"#ffffff"}} align="center"> {leftAngle} </TableCell>
					<TableCell sx={{color:"#ffffff"}} align="Left"> Right Angle </TableCell>
					<TableCell sx={{color:"#ffffff"}} align="center"> {rightAngle} </TableCell>
				</TableRow>
				<TableRow>
					<TableCell sx={{color:"#ffffff"}} align="Left"> Distance Sine </TableCell>
					<TableCell sx={{color:"#ffffff"}} align="center"> 
						{sin} 
					</TableCell>
					<TableCell sx={{color:"#ffffff"}} align="Left"> Distance Cosine </TableCell>
					<TableCell sx={{color:"#ffffff"}} align="center"> 
						{cos} 
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	)
}

export default OutputTable;