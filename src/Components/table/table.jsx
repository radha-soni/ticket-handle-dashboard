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
	},
	th: {
		fontSize: '20px'
	},
	table_header: {
		background: 'blue'
	}
});

function Ticketstable({ ticket, setTicket, search, setSearch }) {
	const classes = useStyles();
	const [dataStatus, setDataStatus] = useState('all');
	const [open, setOpen] = useState(false);
	const [filter, setFilter] = useState(false);

	function handlePendingStatus(e) {
		const statusId = Number(e.target.value);
		fetch('http://localhost:3000/status', {
			method: 'POST',
			body: JSON.stringify({
				id: statusId
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((res) => res.json())
			.then((response) => {
				setTicket((prevTicket) => {
					return prevTicket.map((obj) => {
						if (obj.id === statusId) {
							obj.status = 2;
							obj.updated_at = response.updated_at;
							console.log(response.updated_at);
						}
						return obj;
					});
				});
			})
			.catch((error) => console.error('Error:', error));
	}

	function handleSortLowToHigh() {
		setOpen((prevState) => {
			return !prevState;
		});
		setTicket((prevTicket) => {
			let updatedTicket = [...prevTicket];
			updatedTicket.sort(function(a, b) {
				if (a.id > b.id) {
					return 1;
				} else if (a.id < b.id) {
					return -1;
				} else {
					return 0;
				}
			});
			return updatedTicket;
		});
	}
	function handleSortHighToLow() {
		setOpen((prevState) => {
			return !prevState;
		});
		setTicket((prevTicket) => {
			let updatedTicket = [...prevTicket];
			updatedTicket.sort(function(b, a) {
				if (a.id > b.id) {
					return 1;
				} else if (a.id < b.id) {
					return -1;
				} else {
					return 0;
				}
			});
			return updatedTicket;
		});
	}
	function handleSortCompleted() {
		setFilter((prevState) => {
			return !prevState;
		});
		setDataStatus('completed');
	}
	function handleSortPending() {
		setFilter((prevState) => {
			return !prevState;
		});
		setDataStatus('pending');
	}
	function handleSortBtn() {
		setOpen((prevState) => {
			return !prevState;
		});
	}
	function handleFilterBtn() {
		setFilter((prevState) => {
			return !prevState;
		});
	}

	function checkData(ticket) {
		let filteredTicket;
		filteredTicket = ticket.filter((obj) => {
			return String(obj.id).includes(search);
		});
		if (dataStatus === 'completed') {
			filteredTicket = filteredTicket.filter((obj) => obj.status === 2);
		} else if (dataStatus === 'pending') {
			filteredTicket = filteredTicket.filter((obj) => obj.status !== 2);
		}
		return filteredTicket.map((ticketDetails) => {
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
					<TableCell>
						{created_at && created_at.slice(0, 10)}
					</TableCell>
					<TableCell>
						{updated_at && updated_at.slice(0, 10)}
					</TableCell>
					<TableCell>{subject}</TableCell>

					<TableCell>
						{status !== 2 ? (
							<button
								className='btn-design'
								value={id}
								onClick={handlePendingStatus}
							>
								Pending
							</button>
						) : (
							<button className='btn-design' value={id}>
								Completed
							</button>
						)}
					</TableCell>

					<TableCell>{is_escalated ? 'Yes' : 'No'}</TableCell>
				</TableRow>
			);
		});
	}

	return (
		<div>
			<div className='sort-list'>
				<div className='dropdown'>
					<button onClick={handleSortBtn} className='dropbtn'>
						Sort
					</button>
					{open && (
						<div className='dropdown-content'>
							<button onClick={handleSortLowToHigh}>
								low to high
							</button>
							<button onClick={handleSortHighToLow}>
								high to low
							</button>
						</div>
					)}

					<div className='dropdown'>
						<button onClick={handleFilterBtn} className='dropbtn'>
							Filter
						</button>
						{filter && (
							<div className='dropdown-content'>
								<button onClick={handleSortCompleted}>
									completed
								</button>
								<button onClick={handleSortPending}>
									pending
								</button>
							</div>
						)}
					</div>
				</div>
			</div>

			<Paper className={classes.root}>
				<Table className={classes.table} aria-label='simple table'>
					<TableHead className={classes.table_header}>
						<TableRow>
							<TableCell className={classes.th}>
								Ticket No.
							</TableCell>
							<TableCell className={classes.th}>
								Created date
							</TableCell>
							<TableCell className={classes.th}>
								Updated date
							</TableCell>
							<TableCell className={classes.th}>
								Description
							</TableCell>
							<TableCell className={classes.th}>Status</TableCell>
							<TableCell className={classes.th}>
								Escalated
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>{checkData(ticket)}</TableBody>
				</Table>
			</Paper>
		</div>
	);
}
export default Ticketstable;
