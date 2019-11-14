import React from 'react';
import Switch from '@material-ui/core/Switch';
import Ticketstable from '../table/table';
import Graph from '../graph/graph';

function Toggle() {
	const [state, setState] = React.useState({
		checkedA: true
	});

	const handleChange = (name) => (event) => {
		setState({ ...state, [name]: event.target.checked });
		console.log(state.checkedA);
	};

	return (
		<div className='toggle-btn'>
			<Switch
				checked={state.checkedA}
				onChange={handleChange('checkedA')}
				value='checkedA'
				inputProps={{ 'aria-label': 'secondary checkbox' }}
			/>
			{/* <div>{state.checkedA ? <Ticketstable /> : <Graph />}</div> */}
		</div>
	);
}
export default Toggle;
