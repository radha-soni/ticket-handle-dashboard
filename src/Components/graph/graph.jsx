import React from 'react';
import { Line } from 'react-chartjs-2';
function Graph({ ticket }) {
	const groups = ticket.map((obj) => {
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
	const updated_at = [];
	for (let i = 0; i < 50; i++) {
		data.push(i);
		let slicedTime = groups[i].created_at.slice(0, 10);
		created_at.push(slicedTime);
		let dicedTime = groups[i].updated_at.slice(0, 10);
		updated_at.push(dicedTime);
	}

	const graphdata = {
		dataFirst: {
			label: 'ticket created',
			data: data,
			lineTension: 0,
			fill: false,
			borderColor: 'red'
		},

		dataSecond: {
			label: 'ticket updated',
			data: data,
			lineTension: 0,
			fill: false,
			borderColor: 'blue'
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
							scaleLabel: {
								display: true,
								labelString: 'Date',
								fontSize: 20
							},

							distribution: 'linear'
						}
					}
				],
				yAxes: [
					{
						ticks: {
							stepSize: 1
						},
						scaleLabel: {
							display: true,
							labelString: 'No. of tickets',
							fontSize: 20
						}
					}
				]
			}
		}
	};
	var speedData = {
		labels: updated_at,
		datasets: [graphdata.dataFirst, graphdata.dataSecond]
	};
	return (
		<div>
			<Line
				data={speedData}
				options={graphdata.options}
				width={100}
				height={100}
			/>
		</div>
	);
}

export default Graph;
