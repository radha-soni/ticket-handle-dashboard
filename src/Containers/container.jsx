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
	const [example, setExample] = useState('example');
	const [search, setSearch] = useState('');

	useEffect(() => {
		fetch('http://localhost:3000/getTickets')
			.then((response) => response.json())
			.then((ticket) => {
				setTicket(ticket);
			});
	}, []);

	return (
		<div>
			<Navbar />
			{ticket && <Search setSearch={setSearch} />}

			{/* <Toggle /> */}
			{ticket ? (
				<Ticketstable
					ticket={ticket}
					setTicket={setTicket}
					search={search}
					setSearch={setSearch}
				/>
			) : (
				<h1>please wait while Loading</h1>
			)}

			{/* {ticket && <Graph ticket={ticket} />} */}
		</div>
	);
}

export default Container;
