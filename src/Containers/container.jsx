import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar/navbar';
import Search from '../Components/search/search';
// import Toggle from '../Components/search/toggle';
import Ticketstable from '../Components/table/table';
import Graph from '../Components/graph/graph';

import '../Components/navbar/navbar.css';
import '../Components/table/table.css';

function Container() {
	const [ticket, setTicket] = useState(null);
	useEffect(() => {
		console.log('running');
		fetch('http://localhost:3000/getTickets')
			.then((response) => response.json())
			.then((ticket) => {
				renderData(ticket);
			});
	}, []);
	function renderData(ticket) {
		setTicket(ticket);
	}

	return (
		<div>
			<Navbar />
			<Search />
			{/* <Toggle /> */}
			{ticket && ticket.data.length ? (
				<Ticketstable ticket={ticket} />
			) : (
				'loading'
			)}
			<Ticketstable />

			{ticket && ticket.data.length ? (
				<Graph ticket={ticket} />
			) : (
				'loading'
			)}
		</div>
	);
}

export default Container;
