import React, { Component } from 'react'
import * as d3 from 'd3'
import { scaleOrdinal } from 'd3-scale';
export default class Graph extends Component {

	state = {
		width: window.innerWidth,
		height: window.innerHeight
	}

	UNSAFE_componentWillMount() {

		window.addEventListener('resize', this.resizeCanvas, false);
	}

	componentDidMount() {
		this.setContext();
	}

	componentDidUpdate() {
		this.setContext();
	}

	resizeCanvas = () => {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}

	setContext = () => {
		let canvas = d3.select("canvas"),
			context = canvas.node().getContext("2d"),
			width = this.state.width,
			height = this.state.height,
			radius = 10;

		let color = scaleOrdinal()
			.range(['green', 'blue', 'pink', 'red', 'black', 'yellow', 'orange', 'purple','cyan']);

		let simulation = d3.forceSimulation()
			.force("link", d3.forceLink().id(function (d) { return d.id; }))
			.force("charge", d3.forceManyBody().strength(-500))
			.force("center", d3.forceCenter(width / 2, height / 2));

		let drag = d3.drag()
		.subject(dragsubject)
		.on("start", dragstarted)
		.on("drag", dragged)
		.on("end", dragended);

		d3.json("flare.json").then(graph => {
			simulation
				.nodes(graph.nodes)
				.on("tick", render);

			simulation.force("link")
				.links(graph.links);

			
			// canvas.call(d3.zoom()
			// .scaleExtent([1,8])
			// .on("zoom", zoomed))
			canvas.call(drag)
			.call(render);

			// function zoomed() {
			// 	let transform = d3.event.transform;
			// 	context.save();
			// 	context.clearRect(0, 0, width, height);
			// 	context.translate(transform.x, transform.y);
			// 	context.scale(transform.k, transform.k);
			// 	render();
			// 	context.restore();
			// }

			function render() {
				context.clearRect(0, 0, width, height);
				context.beginPath();
				graph.links.forEach(drawLink);
				context.strokeStyle = "#aaa";
				context.stroke();
				for (let i = 0, n = graph.nodes.length, circle; i < n; ++i) {
					circle = graph.nodes[i];
					context.beginPath();
					drawNode(circle);
					context.fill();
					if (circle.active) {
						context.lineWidth = 2;
						context.stroke();
					}
				}
			}

		});



		function dragsubject() {
			return simulation.find(d3.event.x, d3.event.y);
		}

		function dragstarted() {
			if (!d3.event.active) simulation.alphaTarget(0.3).restart();
			d3.event.subject.fx = d3.event.subject.x;
			d3.event.subject.fy = d3.event.subject.y;
		}

		function dragged() {
			d3.event.subject.fx = d3.event.x;
			d3.event.subject.fy = d3.event.y;
		}

		function dragended() {
			d3.event.subject.active = false;
		}

		function drawLink(circle) {
			context.moveTo(circle.source.x, circle.source.y);
			context.lineTo(circle.target.x, circle.target.y);
		}

		function drawNode(circle) {
			context.moveTo(circle.x + radius, circle.y);
			context.arc(circle.x, circle.y, radius, 0, 2 * Math.PI);
			context.fillStyle = color(circle.index);
		}
	}

	render() {
		return (
			<canvas width={this.state.width} height={this.state.height} />
		)
	}
}
