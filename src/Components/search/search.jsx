import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	// menuButton: {
	// 	marginRight: theme.spacing(2)
	// },
	title: {
		flexGrow: 1,

		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: '30%'
		}
	},
	searchIcon: {
		width: theme.spacing(7),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 7),
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: 120,
			'&:focus': {
				width: 200
			}
		}
	}
}));

function Search() {
	const classes = useStyles();
	// let checkData = null;
	// useEffect(() => {
	// 	console.log('running');
	// 	fetch('http://localhost:3000/getTickets')
	// 		.then((response) => response.json())
	// 		.then((ticket) => {
	// 			checkData = ticket;
	// 		});
	// }, []);
	// console.log(checkData);

	// function handleSearchChange(e) {
	// 	console.log('in');
	// 	let inputVal = e.target.value;
	// 	let filteredData = checkData.filter((el) => {
	// 		return el.id === inputVal;
	// 	});
	// 	// console.log(filteredData);
	// 	// this.setState({ data: filteredData });
	// 	// console.log(data);
	// }

	return (
		<div className={classes.root}>
			<AppBar position='static'>
				<Toolbar>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							// onClick={handleSearchChange}
							placeholder='Search…'
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
export default Search;
