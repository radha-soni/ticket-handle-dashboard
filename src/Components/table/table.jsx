import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
	root: {
		width: '80%',
		overflowX: 'auto',
		margin: '40px auto'
	},
	table: {
		minWidth: 650
	}
});

function Ticketstable() {
	const classes = useStyles();
	const [ticket, setTicket] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log('running');
		fetch('http://localhost:3000/getTickets')
			.then((response) => response.json())
			.then((ticket) => {
				setLoading(false);
				renderData(ticket);
			});
	}, []);
	function handleTicketStatus() {}

	function renderData(ticket) {
		setTicket(ticket);
		checkDataAgain(ticket);
	}
	function checkDataAgain(ticket) {
		if (ticket) {
			return checkData(ticket);
		}
	}
	function checkData(ticket) {
		return ticket.data.map((ticketDetails) => {
			const {
				id,
				created_at,
				updated_at,
				subject,
				status,
				is_escalated
			} = ticketDetails;

			return (
				<TableRow key={id}>
					<TableCell>{id}</TableCell>
					<TableCell>{created_at}</TableCell>
					<TableCell>{updated_at}</TableCell>
					<TableCell>{subject}</TableCell>
					<TableCell>{status}</TableCell>
					<TableCell>{is_escalated}</TableCell>
					<TableCell>
						<input
							type='button'
							value='done'
							className='btn-design'
							onClick={handleTicketStatus}
						></input>
					</TableCell>
				</TableRow>
			);
		});
	}

	return (
		<div>
			{loading ? (
				<h1 className='loader-text'>Please wait while loading....</h1>
			) : (
				<Paper className={classes.root}>
					<Table className={classes.table} aria-label='simple table'>
						<TableHead>
							<TableRow className='table-header'>
								<TableCell>id</TableCell>
								<TableCell>created_at</TableCell>
								<TableCell>updated_at</TableCell>
								<TableCell>subject</TableCell>
								<TableCell>status</TableCell>
								<TableCell>is_escalated</TableCell>
								<TableCell>mark_done</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>{checkDataAgain(ticket)}</TableBody>
					</Table>
				</Paper>
			)}
		</div>
	);
}
export default Ticketstable;
