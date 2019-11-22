import React, { useEffect, useState } from 'react';
import Navbar from '../Components/navbar/navbar';
import Search from '../Components/search/search';
import Toggle from '../Components/search/toggle';
import Ticketstable from '../Components/table/table';
import Graph from '../Components/graph/graph';
import Pagination from '../Components/table/Pagination';
import '../Components/search/toggle.css';
import '../Components/navbar/navbar.css';
import '../Components/table/table.css';
import '../Components/table/pagination.css';

function Container() {
	const [toggle, setToggle] = useState(false);
	const [ticket, setTicket] = useState(null);
	const [search, setSearch] = useState('');
	const [currentPage, setCurrentpage] = useState(1);
	const [postPerPage, setPostPerPage] = useState(10);
	const [changeColor, setChangeColor] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3000/getTickets')
			.then((response) => response.json())
			.then((ticket) => {
				setTicket(ticket);
			});
	}, []);

	const indexOfLastPost = currentPage * postPerPage;
	const indexOfFirstPost = indexOfLastPost - postPerPage;

	//change page
	const paginate = (pageNumber) => {
		setChangeColor(!changeColor);
		setCurrentpage(pageNumber);
	};

	return (
		<div>
			<Navbar />
			{ticket ? (
				<div>
					<Search setSearch={setSearch} />
					<Toggle toggle={toggle} setToggle={setToggle} />
					{toggle ? (
						<Graph ticket={ticket} search={search} />
					) : (
						<div>
							<Ticketstable
								ticket={ticket}
								setTicket={setTicket}
								search={search}
								setSearch={setSearch}
								indexOfLastPost={indexOfLastPost}
								indexOfFirstPost={indexOfFirstPost}
							/>
							<Pagination
								currentPage={currentPage}
								postPerPage={postPerPage}
								paginate={paginate}
								changeColor={changeColor}
								setChangeColor={setChangeColor}
							/>
						</div>
					)}
				</div>
			) : (
				<div className='loader-container'>
					<div className='loader'></div>
					<h2>Loading...</h2>
				</div>
			)}
		</div>
	);
}

export default Container;
