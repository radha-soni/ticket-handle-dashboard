import React from 'react';
import Switch from '@material-ui/core/Switch';
// import Ticketstable from '../table/table';
// import Graph from '../graph/graph';

function Toggle({ toggle, setToggle }) {
	const handleChange = () => {
		setToggle((toggle) => {
			return !toggle;
		});
	};

	return (
		<div className='toggle-btn'>
			<Switch
				checked={toggle}
				onChange={handleChange}
				value='checkedA'
				inputProps={{ 'aria-label': 'secondary checkbox' }}
			/>
			{/* <div>{!state.checkedA && <Graph ticket={ticket} />}</div> */}
		</div>
	);
}
export default Toggle;
