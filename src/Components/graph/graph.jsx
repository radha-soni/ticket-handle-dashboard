import React from 'react';
import { Line } from 'react-chartjs-2';
function Graph({ ticket }) {
	const groups = ticket.data.map((obj) => {
		return {
			id: obj.id,
			created_at: obj.created_at,
			updated_at: obj.updated_at,
			status: obj.status,
			is_escalated: obj.is_escalated
		};
	});
	const data = [];
	const created_at = [];
	for (let i = 0; i < 15; i++) {
		data.push(groups[i].id);
		let slicedTime = groups[i].created_at.slice(0, 10);
		created_at.push(slicedTime);
	}

	const graphdata = {
		data: {
			datasets: [
				{
					label: 'tickets unique id',
					data: data,
					borderColor: 'red'
				}
			],
			labels: created_at
		},

		options: {
			backgroundColor: {
				type: 'Color',
				backgroundColor: 'red'
			},

			layout: {
				padding: {
					left: 20,
					right: 20,
					top: 0,
					bottom: 0
				}
			},

			scales: {
				xAxes: [
					{
						type: 'time',
						time: {
							unit: 'day',
							unitStepSize: 1,
							displayFormats: {
								day: 'MMM DD'
							},
							ticks: {
								beginAtZero: true
							},

							distribution: 'linear'
						}
					}
				]
			}
		}
	};
	return (
		<div>
			<Line data={graphdata.data} width={100} height={30} />
		</div>
	);
}

export default Graph;
