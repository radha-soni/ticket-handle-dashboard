import React, { useEffect, useState } from 'react';
import { style } from '@material-ui/system';

function Pagination({ postPerPage, paginate, currentPage }) {
	const pageNumber = [];
	for (let i = 1; i <= 100 / postPerPage; i++) {
		pageNumber.push(i);
	}
	return (
		<div className='center-pagination'>
			<div className='pagination'>
				{/* <a href='!#'>&laquo;</a> */}
				{pageNumber.map((number) => {
					return (
						<a
							className={
								currentPage === number
									? 'colorTrue'
									: 'colorFalse'
							}
							key={number}
							href='!#'
							onClick={() => paginate(number)}
						>
							{number}
						</a>
					);
				})}

				{/* <a href='!#'>&raquo;</a> */}
			</div>
		</div>
	);
}
export default Pagination;
