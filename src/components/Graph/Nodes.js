import React, { Component } from 'react'

export default class Nodes extends Component {
	constructor(props){
		super(props);

		this.state = {
			nodes: []
		}
	}
	UNSAFE_componentWillReceiveProps(nextProps) {
		if (nextProps.data && nextProps.data.length !== 0) {
			this.setState({nodes: nextProps.data})
		}
	}
	render() {
		return (
			<g className="nodes"></g>
		);
		// return (
		// 	<g className="nodes">
		// 	{
		// 	this.state.nodes.map(node=>{
		// 		console.log(node)
		// 		return (
		// 			<g key={node.index}>
		// 			<circle className="node" 
		// 				r={node.radius} 
		// 				fill={node.fill} 
		// 				stroke={node.stroke}>
		// 			</circle>
		// 			<text className="nodetext" 
		// 				x={node.textX} 
		// 				y={node.textY} 
		// 				text-achor="middle" 
		// 				stroke={'#000'} 
		// 				strokeWidth={.5}>
		// 					{node.text}
		// 			</text>
		// 			</g>
		// 		);
		// 	})
		// 	}
		// 	</g>
		// )
	}
}

