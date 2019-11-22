import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
function Graph({ ticket }) {
	const [chartCreatedData, setChartCreatedData] = useState([]);

	useEffect(() => {
		function remove(allDates) {
			let chartCreatedDataArr = [];
			let updatedCreateDate = [...new Set(allDates)];
			let filterUpdatedData, filterCreatedData;

			for (let i = 0; i < updatedCreateDate.length; i++) {
				filterCreatedData = ticket.filter((obj) => {
					if (obj.created_at.slice(0, 10) === updatedCreateDate[i]) {
						return true;
					}
					return false;
				});
				filterUpdatedData = ticket.filter((obj) => {
					if (obj.updated_at.slice(0, 10) === updatedCreateDate[i]) {
						return true;
					}
					return false;
				});
				chartCreatedDataArr.push({
					ticketsCreated: filterCreatedData.length,
					ticketsUpdated: filterUpdatedData.length,
					date: updatedCreateDate[i].slice(0, 10)
				});
			}
			chartCreatedDataArr.sort((a, b) => {
				a = new Date(a.date);
				b = new Date(b.date);
				return a.getTime() - b.getTime();
			});
			setChartCreatedData(chartCreatedDataArr);
		}

		let allDates = [];
		for (let i = 0; i < ticket.length; i++) {
			allDates.push(ticket[i].created_at.slice(0, 10));
			allDates.push(ticket[i].updated_at.slice(0, 10));
		}

		remove(allDates);
	}, []);

	const graphdata = {
		dataFirst: {
			label: 'ticket created',
			data: chartCreatedData.map((obj) => obj.ticketsCreated),
			lineTension: 0,
			fill: false,
			borderColor: '#5f5f5f'
		},

		dataSecond: {
			label: 'ticket updated',
			data: chartCreatedData.map((obj) => obj.ticketsUpdated),
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
							stepSize: 10
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
		labels: chartCreatedData.map((obj) => obj.date),
		datasets: [graphdata.dataFirst, graphdata.dataSecond]
	};

	return (
		<div>
			<Line
				data={speedData}
				options={graphdata.options}
				width={100}
				height={35}
			/>
		</div>
	);
}

export default Graph;
